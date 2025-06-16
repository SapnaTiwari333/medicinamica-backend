// This function returns an appropriate AI prompt based on the detected classification

import { promptTemplates } from "./promptTemplates";

export function getPromptForCategory(classification:string):string{


    // Access the full prompt template object (contains keywords and all prompt types)
    const base=promptTemplates;

    // If classification is 'acuteSymptom', return the acute symptoms prompt
    if(classification==="acuteSymptom") return base.acuteSymptom;

    // If classification is 'followUpChronic', return the follow-up prompt for chronic conditions
    if(classification==="followUpChronic") return base.followUpChronic;

    // If classification is related to medication/therapy, return the corresponding prompt
    if(classification==="drugsTherapies") return base.drugsTherapies;

    // If the classification is one of the chronic conditions (e.g., diabetes, hypertension, etc.)
    // return the prompt specifically defined for that condition
    if(classification in base.chronicConditions){
        return base.chronicConditions[classification as keyof typeof base.chronicConditions];

    }


    // Default fallback prompt: used when no classification matches or is 'UNKNOWN'
     return `You are a helpful AI assistant for healthcare conversations. Ask clear, empathetic questions to understand the patient's concerns and symptoms better. Avoid diagnostic conclusions.`;

}