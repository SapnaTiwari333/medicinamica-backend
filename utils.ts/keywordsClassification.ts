//Return the first matching classification category from the keywords

import { promptTemplates } from "./promptTemplates";

//this function takes a patient message and tries to classify it

export function keywordClassification(message:string):string{

    //convert the input message to lowercase to ensure case-insensitive matching
    const lowerMessage=message.toLowerCase();

    //get the keyword mapping from the promptTemplates configuration
    const keywordsMap=promptTemplates.classificationKeywords;

    //loop through each classification category in the keyword map
    for(const category in keywordsMap){

        //get the list of keywords for this particular category
        const keywords=keywordsMap[ category as keyof typeof keywordsMap];
        
        //loop through each keyword in this category
        for(const keyword of keywords){

            //check if the message contains the current keyword
            if(lowerMessage.includes(keyword)){

                //if match is found ,return the category name 
                //(e.g),"diabeties",'asthma' etc.)
                return category;
            }
        }
    }

    //if no matching keyword is found ,return "UNKNOWN" as a fallback
    return "UNKNOWN";
}