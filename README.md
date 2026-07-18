# MotorMitra 🌾🚜

**AI-Powered Motor Repair for Farmers**

Built by **Mailari Chatragaddi**

---

## What is MotorMitra?

MotorMitra helps farmers get their broken irrigation pump motors repaired on the same day — right there in the field.

Right now in India, when a motor breaks down, the farmer has to:
1. Call a mechanic
2. Wait for mechanic to come and look at the problem
3. Wait again while mechanic goes back to shop to get parts
4. Wait again while mechanic comes back to repair

This takes **1 to 3 days**. During this time, crops don't get water and can die.

MotorMitra fixes this by using AI to diagnose the problem first, tell the mechanic exactly what parts and tools to bring, and send the mechanic directly to the farmer's field — **prepared, in one visit**.

---

## Key Features 🚀

- **Bilingual Support (English & Kannada):** Fully localized for farmers in Karnataka. Includes native spoken Kannada dialects (Koppal/Gangavathi style) rather than bookish translation, making it completely accessible to local farmers.
- **Multimodal AI Diagnosis:** Farmers can optionally upload a photo of the motor or starter panel along with a description. The AI analyzes both text and image to predict exactly what's wrong.
- **Auto-GPS Location:** No need to type long addresses. The farmer clicks "Auto", and the app grabs their precise borewell coordinates so the mechanic navigates straight to the farm.
- **5-Star Mechanic Rating:** Ensures accountability and high-quality repairs. 

---

## The Story

My father is a motor winding mechanic. I grew up watching him work. I have seen farmers panic when their motor fails during crop season. Every hour without water means real money lost.

I built MotorMitra because I know this problem personally — not from reading about it, but from living it.

---

## How It Works

### Step 1 — Farmer Reports the Problem
The farmer opens MotorMitra and fills a simple form:
- Their name and phone number
- GPS location (One-tap auto-detection from browser)
- Type of motor (Submersible, Open Well, etc.)
- Description of the problem in their own words
- **Optional photo** of the starter panel or motor

### Step 2 — AI Diagnoses the Fault
The AI reads the description and photo together. It classifies the fault into one of **12 specific fault categories** based on real agricultural motor repair knowledge.

The AI also decides: **Does this motor need to be physically pulled out of the borewell?** If yes, the mechanic must bring a vehicle/crane. MotorMitra handles this automatically.

### Step 3 — Smart Mechanic Matching
The system scores all available mechanics using 5 factors:
- **Skill match** (40 points) — Does this mechanic specialize in this motor type?
- **Success rate** — Has this mechanic fixed this exact fault before?
- **Rating** — What do other farmers say about this mechanic?
- **Experience** — How many years of work?
- **Distance** — How far from the farm?

Top 3 mechanics are shown to the farmer.

### Step 4 — Mechanic Gets Full Brief
The mechanic opens his dashboard and sees:
- Fault type identified by AI
- Farmer name, phone, and exact GPS location on Maps
- A mandatory packing checklist (every part and tool he needs)
- Vehicle warning if motor needs to be pulled

The mechanic **cannot accept the job** until he ticks every item on the checklist. This guarantees he arrives prepared.

### Step 5 — Repair on Field, Crop Saved
The mechanic navigates directly to the borewell, repairs the motor in one visit, and the farmer pays on the spot. After the repair is marked complete, the farmer gives a 5-star rating for the service. No city trip. No hidden cost.

---

## Pages in the App

| Page | What it does |
|------|-------------|
| Home | Landing page with problem and solution |
| Request Repair | Farmer fills form, gets AI diagnosis, selects mechanic |
| Track Request | Farmer tracks mechanic status, arrival countdown, and leaves rating |
| Mechanic Dashboard | Mechanic sees jobs, packing checklist, navigation |

---

## Tech Stack

### Frontend
- **React** + **Vite** — fast web app
- **React Router** — page navigation
- **Lucide React** — icons
- **Vanilla CSS** — simple, custom UI styling

### AI
- **OpenRouter API** with **Gemini Flash 1.5** — supports both text and image input for diagnosis

### Backend
- **Node.js** + **Express** — REST API

---

## Setup and Run

### 1. Clone the repo
```bash
git clone <repo-url>
cd motorMitra
```

### 2. Frontend setup
```bash
cd motorMitra
npm install
```

Create a `.env` file in the `motorMitra` folder:
```
VITE_OPENROUTER_KEY=your_openrouter_api_key_here
VITE_BACKEND_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

### 3. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
PORT=3000
```

Run the backend:
```bash
nodemon server.js
```

---

## AI Fault Categories

The AI classifies motor problems into exactly 12 fault categories:

1. Winding Burnout
2. Capacitor Failure
3. Bearing Seizure
4. Impeller Damage
5. Shaft Breakage
6. Seal Failure
7. Water Logging
8. Suction Pipe Blockage
9. Starter Panel Fault
10. Voltage Fluctuation Damage
11. Overheating Shutdown
12. Cable Fault

For each fault, the AI knows which parts are needed, which tools to bring, and whether the motor must be pulled out.

---

## What Makes This Different

Every other repair app sends whoever is available and nearest.

MotorMitra sends whoever is **most qualified for this exact fault, prepared with the exact parts, with a vehicle if needed, navigating directly to the borewell.**

That difference is the crop. That difference is the farmer's income.

---

## Built With Heart

> "I know what a burnt winding smells like. I know how a farmer's face looks when his motor fails during summer."
> 
> — Mailari Chatragaddi, Founder
