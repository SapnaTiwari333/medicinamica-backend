import { InferenceClient } from "@huggingface/inference";

const HF_Token=process.env.HUGGINGFACE_API_KEY;

if(!HF_Token){
    throw new Error("Missing HF_TOKEN");

}

export const huggingClient=new InferenceClient(HF_Token);