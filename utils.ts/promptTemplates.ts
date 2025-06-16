
export const promptTemplates = {

  //classification  keywords for automatic detection

  classificationKeywords:{
    acuteSymptom: [
      'sudden', 'severe', 'emergency', 'urgent', 'can\'t', 'unable', 'sharp', 'intense',
      'chest pain', 'difficulty breathing', 'shortness of breath', 'dizzy', 'fainted',
      'high fever', 'vomiting', 'severe headache', 'allergic reaction', 'bleeding'
    ],
    followUpChronic: [
      'follow up', 'check in', 'regular visit', 'routine', 'monitoring', 'tracking',
      'since last time', 'previous visit', 'ongoing', 'continuing', 'update'
    ],
    diabetes: [
      'diabetes', 'diabetic', 'blood sugar', 'glucose', 'insulin', 'a1c', 'metformin',
      'hypoglycemia', 'hyperglycemia', 'blood glucose', 'sugar levels'
    ],
    hypertension: [
      'blood pressure', 'hypertension', 'bp', 'high pressure', 'systolic', 'diastolic',
      'lisinopril', 'amlodipine', 'headaches from pressure'
    ],
    copd: [
      'copd', 'chronic obstructive', 'emphysema', 'chronic bronchitis', 'inhaler',
      'oxygen', 'breathing problems', 'wheezing', 'chronic cough'
    ],
    asthma: [
      'asthma', 'asthmatic', 'inhaler', 'albuterol', 'wheeze', 'triggers',
      'asthma attack', 'rescue inhaler', 'peak flow'
    ],
    heartDisease: [
      'heart disease', 'cardiac', 'heart attack', 'coronary', 'angina', 'stent',
      'bypass', 'heart failure', 'palpitations', 'chest tightness'
    ],
    chronicKidneyDisease: [
      'kidney disease', 'chronic kidney', 'dialysis', 'creatinine', 'kidney function',
      'nephrology', 'kidney failure', 'proteinuria'
    ],
    arthritis: [
      'arthritis', 'joint pain', 'rheumatoid', 'osteoarthritis', 'joint stiffness',
      'swollen joints', 'inflammation', 'joint swelling'
    ],
    depressionAnxiety: [
      'depression', 'anxiety', 'depressed', 'anxious', 'mental health', 'mood',
      'panic', 'stress', 'sad', 'worried', 'antidepressant', 'therapy'
    ],
    obesity: [
      'weight loss', 'obesity', 'overweight', 'diet', 'exercise', 'weight management',
      'metabolic syndrome', 'bariatric', 'bmi'
    ],
    hypothyroidism: [
      'thyroid', 'hypothyroid', 'levothyroxine', 'synthroid', 'tsh', 'thyroid hormone',
      'underactive thyroid', 'thyroid medication'
    ],
    drugsTherapies: [
      'medication', 'side effects', 'drug', 'prescription', 'pill', 'therapy',
      'treatment', 'adherence', 'compliance', 'dosage', 'interaction'
    ]

  },

  // Type 1: For Acute Symptom Cases
  acuteSymptom: `The patient is experiencing a sudden onset of symptoms. Ask clear, empathetic, and relevant questions to identify the nature, severity, duration, and impact of the symptoms. Use the SOCRATES method if applicable (Site, Onset, Character, Radiation, Associations, Time course, Exacerbating/Relieving factors, Severity). Avoid giving diagnostic advice.`,

  // Type 2: Follow-Up for Chronic Pathology
  followUpChronic: `This is a follow-up consultation for a known chronic condition. Ask about changes in symptoms, medication or therapy adherence, side effects, lifestyle habits, and the patient’s overall well-being since the last visit.`,

  // Type 3–12: Specific Prompts for Chronic Conditions
  chronicConditions: {
    diabetes: `The patient has diabetes. Ask about blood glucose monitoring, diet, physical activity, symptoms of hypo/hyperglycemia, insulin or medication adherence, and recent health changes.`,

    hypertension: `The patient has hypertension. Ask about regular BP monitoring, medication adherence, headaches, dizziness, vision issues, and lifestyle factors such as salt intake or physical activity.`,

    copd: `The patient has COPD. Inquire about shortness of breath, cough, sputum production, recent exacerbations, inhaler usage, and limitations in daily activity.`,

    asthma: `The patient has asthma. Ask about frequency and severity of symptoms, known triggers, medication or inhaler use, nighttime attacks, and overall control.`,

    heartDisease: `The patient has a history of heart disease. Ask about chest discomfort, shortness of breath, edema, palpitations, medication use, and exercise tolerance.`,

    chronicKidneyDisease: `The patient has chronic kidney disease. Ask about swelling, changes in urination, fatigue, blood pressure control, diet restrictions, and medications.`,

    arthritis: `The patient has arthritis. Ask about joint pain, stiffness, swelling, range of motion, physical limitations, flare-up patterns, and adherence to medications or therapies.`,

    depressionAnxiety: `The patient has a mental health condition such as depression or anxiety. Ask about mood, energy, sleep, motivation, appetite, social interaction, medication adherence, and any negative thoughts. Be empathetic and non-judgmental.`,

    obesity: `The patient is managing obesity/metabolic syndrome. Ask about current weight, eating habits, physical activity, weight management goals, emotional triggers, and support systems.`,

    hypothyroidism: `The patient has hypothyroidism. Ask about fatigue, cold intolerance, weight changes, skin/hair changes, mood, and thyroid medication adherence.`,
  },

  // Type 13: Prompt for Drug & Therapy Monitoring
  drugsTherapies: `The patient is undergoing drug or therapeutic treatment. Ask about their adherence to prescribed medications or therapies, side effects, perceived improvements, obstacles to compliance, and any concerns. Avoid suggesting changes but be supportive and curious.`,
};
