
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { huggingClient } from "../config/huggingClient";
import { keywordClassification } from "../utils.ts/keywordsClassification";
import { getPromptForCategory } from "../utils.ts/getPromptForCategory";


// @desc     Handle a single AI chatbot message exchange
// @route    POST /api/chat/message
// @access   Public
export const chatWithAI = expressAsyncHandler(async (req: Request, res: Response) => {
  const { message } = req.body;


  // Validate the input
  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Message is required." });
  }

  //Detect category from keywords
  let classification=keywordClassification(message);

  //Get system prompt based on classification
  const systemPrompt=getPromptForCategory(classification);

  //construct a prompt to make the AI response as a helful assistant 
  const prompt=`You are a helpful, non-diagnostic medical assistant. 
     Your goal is to suggest possible over-the-counter treatments, lifestyle recommendations, or symptoms management advice based on the user's message. 
      DO NOT provide a medical diagnosis or prescription-only drugs.`;

   // Send the message to Hugging Face chatCompletion endpoint
  const result = await huggingClient.chatCompletion({
    model: "meta-llama/Llama-3.1-8B-Instruct",
    messages: [
      {
         role: "system", 
        
        content: `${systemPrompt}\n\n${prompt}`,
      },

      {role:"user",content:message}
    ],
    max_tokens: 512,
  });


  // Extract the assistant’s reply
  const reply = result.choices?.[0]?.message?.content || "No reply generated.";
  
  // Send reply back to the client
  res.status(200).json({ 
    classification,
    systemPromptUsed:systemPrompt,
     response:reply ,
  });

});


// @desc     Generate a structured report from a conversation string
// @route    POST /api/chat/report
// @access   Public
export const generateReport= expressAsyncHandler(async(req:Request,res:Response)=>{
    const{conversation}=req.body;


    // Validate that the conversation is a non-empty string
    if(!conversation || typeof conversation!=="string"){
        res.status(400).json({error:"Conveartion is requires"});
    }


    // Format the prompt for generating a medical report
    const prompt=`Summarize the following patient-doctor conversation as a structure medical report in editable form:\n\n${conversation}\n\nReport:`;



    // Call Hugging Face textGeneration API with a summarization model
    const result=await huggingClient.textGeneration({
        model:"tiiuae/falcon-7b-instruct",
        inputs:prompt,
        parameters:{
            max_new_tokens:512,
            return_full_text:false,
        },
    });


    // Extract the generated report or provide fallback
    const report=result.generated_text || "No report generated.";
    
    // Respond with the structured report
    res.status(200).json({report});
});

