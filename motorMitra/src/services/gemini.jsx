
// Known faults with parts and tools info
// Built from real motor winding knowledge
const faultPartsMap = {
    
  // Faults that need motor to be pulled out of borewell
  "Winding burnout": {
    requiresPullingVehicle: true,
    parts: ["Copper winding wire spool", "Insulation paper", "Varnish"],
    tools: ["Motor pulling machine/Crane", "Winding machine", "Multimeter", "Heating lamp"],
    estimatedTime: "2 hours (On-field rewind)",
    cost: "₹2500-₹4000"
  },
  "Impeller damage": {
    requiresPullingVehicle: true,
    parts: ["Replacement Impeller (4/6 inch)", "Shaft seal", "O-ring set"],
    tools: ["Motor pulling machine/Crane", "Spanner set", "Bearing puller"],
    estimatedTime: "1.5 hours",
    cost: "₹800-₹2000"
  },
  "Bearing seizure": {
    requiresPullingVehicle: true,
    parts: ["Steel ball bearings", "Waterproof grease", "Shaft seal"],
    tools: ["Motor pulling machine/Crane", "Bearing puller", "Hammer & chisel"],
    estimatedTime: "1.5 hours",
    cost: "₹500-₹1200"
  },
  "Shaft breakage": {
    requiresPullingVehicle: true,
    parts: ["Steel rotor shaft", "Coupling joint"],
    tools: ["Motor pulling machine/Crane", "Portable welding kit", "Grinder"],
    estimatedTime: "2 hours",
    cost: "₹1500-₹3000"
  },
  "Seal failure": {
    requiresPullingVehicle: true,
    parts: ["Mechanical seal set", "Rubber gaskets"],
    tools: ["Motor pulling machine/Crane", "Allen keys", "Sealant"],
    estimatedTime: "1 hour",
    cost: "₹300-₹800"
  },
  "Water logging": {
    requiresPullingVehicle: true,
    parts: ["Waterproof resin", "New housing bolts"],
    tools: ["Motor pulling machine/Crane", "Air blower", "Insulation tester"],
    estimatedTime: "2 hours",
    cost: "₹1000-₹2000"
  },
  "Suction pipe blockage": {
    requiresPullingVehicle: true,
    parts: ["Replacement foot valve", "Filter mesh"],
    tools: ["Motor pulling machine/Crane", "Heavy pipe wrenches", "Plumbing tape"],
    estimatedTime: "1 hour",
    cost: "₹400-₹900"
  },

  // Faults that can be fixed at the surface without pulling motor
  "Capacitor failure": {
    requiresPullingVehicle: false,
    parts: ["25MFD / 50MFD start/run capacitor", "Terminal connectors"],
    tools: ["Multimeter", "Screwdriver set", "Wire strippers"],
    estimatedTime: "30 minutes",
    cost: "₹200-₹500"
  },
  "Starter panel fault": {
    requiresPullingVehicle: false,
    parts: ["Contactor coil", "Relay switch", "Push buttons"],
    tools: ["Multimeter", "Electrical toolkit"],
    estimatedTime: "45 minutes",
    cost: "₹500-₹1500"
  },
  "Voltage fluctuation damage": {
    requiresPullingVehicle: false,
    parts: ["MCB breaker", "Voltage stabilizer relay"],
    tools: ["Multimeter", "Phase tester"],
    estimatedTime: "45 minutes",
    cost: "₹600-₹1200"
  },
  "Overheating": {
    requiresPullingVehicle: false, 
    parts: ["Thermal overload relay", "Cooling fan (if monoblock)"],
    tools: ["Infrared thermometer", "Screwdriver set"],
    estimatedTime: "1 hour",
    cost: "₹400-₹1000"
  },
  "Cable fault": {
    requiresPullingVehicle: false, 
    parts: ["Waterproof joint kit", "3-core copper cable"],
    tools: ["Wire strippers", "Crimping tool", "Heat gun"],
    estimatedTime: "1 hour",
    cost: "₹300-₹800"
  }
};

// Helper function: converts an image file to base64 string
// We need this to send the photo to the AI
const imageFileToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result looks like: "data:image/jpeg;base64,/9j/4AAQ..."
      // We only need the part after the comma
      const base64Part = reader.result.split(',')[1];
      resolve(base64Part);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
};

// Main AI diagnosis function
// symptoms = what farmer described in words
// motorType = dropdown selection
// photoFile = optional image file (can be null)
const generateText = async (symptoms, motorType, photoFile = null) => {

  const systemPrompt = `You are an expert agricultural motor repair diagnostic AI for rural India.
Your job is to analyze farmer's motor problem description and classify it into EXACTLY ONE fault from this fixed list:

FAULT CATEGORIES:
1. Impeller Damage
2. Capacitor Failure
3. Winding Burnout
4. Bearing Seizure
5. Suction Pipe Blockage
6. Voltage Fluctuation Damage
7. Shaft Breakage
8. Seal Failure
9. Overheating Shutdown
10. Starter Panel Fault
11. Cable Fault
12. Water Logging 

Here is fault data with parts and tools: ${JSON.stringify(faultPartsMap)}

MOTOR PULLING RULE:
- motorPullRequired = true ONLY for: Winding Burnout, Bearing Seizure, Shaft Breakage, Seal Failure, Impeller Damage, Water Logging, Suction Pipe Blockage
- These faults require motor to be physically removed from borewell
- motorPullRequired = false for all other faults (field repair possible without removing motor)

If a photo is provided, use visual clues like burn marks, water stains, damaged wires to improve diagnosis.

Respond ONLY in this exact JSON format. No extra text. No explanation:

{
  "faultCategory": "exact fault name from list above",
  "confidence": "High or Medium or Low",
  "motorPullRequired": true or false,
  "vehicleRequired": true or false,
  "parts": ["part 1", "part 2", "part 3"],
  "tools": ["tool 1", "tool 2"],
  "estimatedCost": "₹XXX - ₹XXXX",
  "estimatedTime": "X hours",
  "urgency": "Immediate or Today or Within 2 days",
  "mechanicInstructions": "What mechanic must check first on arrival"
}`;

  const userMessage = `Motor Type: ${motorType}
Farmer's description: "${symptoms}"
Diagnose this fault and respond in the required JSON format.`;

  // Build the message content array
  // If photo exists, we add it as an image part
  let messageContent = [];

  if (photoFile) {
    try {
      // Convert photo to base64 so we can send it to AI
      const base64Image = await imageFileToBase64(photoFile);
      const mimeType = photoFile.type || 'image/jpeg';

      messageContent = [
        {
          type: "text",
          text: userMessage
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${base64Image}`
          }
        }
      ];
    } catch (err) {
      // If photo conversion fails, just use text only
      console.warn("Photo could not be processed, using text only:", err);
      messageContent = userMessage;
    }
  } else {
    // No photo — just text
    messageContent = userMessage;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "MotorMitra"
    },
    body: JSON.stringify({
      // Use qwen for text-only, or meta-llama vision model for images
      // meta-llama/llama-3.2-11b-vision-instruct supports both text and images for free
      model: "openrouter/free",

      messages: [
        { role: 'system', content: systemPrompt },
        { role: "user", content: messageContent }
      ]
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error("OpenRouter API Error:", data.error.message);
    return "Error: " + data.error.message;
  }

  const text = data.choices[0].message.content;
  console.log("AI raw response:", text);

  // Clean up any markdown code blocks the AI might have added
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

// Translates the English AI diagnosis JSON into native Kannada
// Used when farmer has selected Kannada language
// Same API setup as generateText — just a different prompt
const translateDiagnosis = async (englishDiagnosisObject) => {

  // The exact prompt the user specified
  const translationPrompt = `Translate these motor repair diagnosis values to native spoken Kannada used in Karnataka villages like Koppal, Gangavathi, Kushtagi.
Not formal Kannada. How a local mechanic actually speaks.
Keep technical part names and tool names in English but add Kannada explanation in brackets.
Translate only the values, never the JSON keys.
Keep all boolean values and number values exactly the same.
Return valid JSON only, no extra text.

JSON to translate:
${JSON.stringify(englishDiagnosisObject, null, 2)}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "MotorMitra"
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: translationPrompt
        }
      ]
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error("Translation API error:", data.error.message);
    // If translation fails, return the original English diagnosis
    return englishDiagnosisObject;
  }

  const text = data.choices[0].message.content;
  console.log("Translated diagnosis:", text);

  // Clean up any markdown the AI added
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch (err) {
    // If JSON parse fails, return English version as fallback
    console.warn("Could not parse translated JSON, using English:", err);
    return englishDiagnosisObject;
  }
};

export { translateDiagnosis };
export default generateText;