import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { huggingClient } from "../config/huggingClient";
import { keywordClassification } from "../utils.ts/keywordsClassification";
import { getPromptForCategory } from "../utils.ts/getPromptForCategory";
import { ChatSession } from "../model/chatSession";
import { promptMap } from "../utils.ts/promptMap";


// @desc     Handle a single AI chatbot message exchange
// @route    POST /api/chat/message
// @access   Public
export const chatWithAI = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email,message } = req.body;

  //get userid from jwt token
  

  //  Validate that message is a non-empty string
  if (!message || typeof message !== "string") {
     res.status(400).json({ error: "Message is required." });
  }

  // Validate that userId is provided and is a string
  if (!email || typeof email !== "string") {
     res.status(400).json({ error: "User ID is required." });
  }

  //Try to find an existing chat session for the given user
  let session = await ChatSession.findOne({ email });

  // Declare variables to track classification and system prompt
  let classification: string | null;
  let systemPrompt: string | undefined;

  if (!session) {
    // No existing session — start a new conversation

    // Automatically classify the user message based on keyword detection
    classification = keywordClassification(message);

    // Get a condition-specific system prompt (e.g., if it's diabetes, asthma, etc.)
    const conditionPrompt = getPromptForCategory(classification);

    //Combine with a clarification prompt to initiate conversation properly
    systemPrompt = `${conditionPrompt}\n\n${promptMap.clarificationPrompt}`;

    //Create a new chat session document
    session = new ChatSession({
      email,
      classification,
      step: "clarify", // initial step is always "clarify"
      message: [
        { role: "system", content: systemPrompt }, // system instructs the assistant
        { role: "user", content: message },        // first user message
      ],
      updatedAt: new Date(), // initialize update timestamp
    });
  } else {
    //Existing session — continue the conversation
    classification = session.classification;
    session.message.push({ role: "user", content: message }); // Add new user message
  }

  //Convert the session messages into the format expected by Hugging Face API
  const hfMessages = session.message.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // Send the message history to Hugging Face for response generation
  const result = await huggingClient.chatCompletion({
    model: "meta-llama/Llama-3.1-8B-Instruct", // selected LLM model
    messages: hfMessages,                      // entire conversation history
    max_tokens: 512,                           // limit on output length
  });

  //Extract the assistant’s reply from the result, fallback if missing
  const reply = result.choices?.[0]?.message?.content || "No reply generated.";

  //Add the assistant’s reply to the session message history
  session.message.push({ role: "assistant", content: reply });

  //Update timestamp to refresh TTL expiration
  session.updatedAt = new Date();

  // Save the updated or new session to the database
  await session.save();

  //Send final response back to the client
  res.status(200).json({
    classification, // e.g., "diabetes", "headache", etc.
    response: reply, // assistant’s reply
  });
});
