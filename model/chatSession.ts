import mongoose, { Schema, Document } from "mongoose";

// Step 1: Define a TypeScript interface for the message
export interface IChatMessage {
  role: "user" | "assistant" | "system"; // Role of the message sender
  content: string; // Actual message content
}

// Step 2: Define the full session document interface
export interface IChatSession extends Document {
  email: string | null; // Optional email for both logged-in and anonymous users
  classification: string | null;
  step: "clarify" | "advise";
  message: IChatMessage[];
  updatedAt: Date;
}

// Step 3: Define the schema
const chatSessionSchema = new Schema<IChatSession>({
  email: {
    type: String,
    required: false,
    default: null,
  },
  classification: {
    type: String,
    default: null,
  },
  step: {
    type: String,
    enum: ["clarify", "advise"],
    default: "clarify",
  },
  message: [
    {
      role: {
        type: String,
        enum: ["user", "assistant", "system"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Step 4: Auto-delete session after 1 hour (TTL index)
chatSessionSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 3600 });

// Step 5: Export the model
export const ChatSession = mongoose.model<IChatSession>("ChatSession", chatSessionSchema);
