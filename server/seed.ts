import "dotenv/config";
import { db } from "./db";
import { candidates } from "@shared/schema";

const sampleCandidates = [
  { name: 'Jordan Miller', yearsExperience: 8, skills: ["Safety Compliance", "Lean Manufacturing", "Waste Management"] },
  { name: 'Alex Rivera', yearsExperience: 12, skills: ["Team Leadership", "ISO 14001", "Process Optimization"] },
  { name: 'Casey Smith', yearsExperience: 5, skills: ["Quality Control", "OSHA Standards", "Equipment Maintenance"] },
  { name: 'Morgan Chen', yearsExperience: 15, skills: ["Supply Chain Management", "Waste Management", "Lean Manufacturing"] },
  { name: 'Taylor Brooks', yearsExperience: 3, skills: ["Safety Compliance", "Data Analysis", "Waste Management"] },
  { name: 'Riley Quinn', yearsExperience: 10, skills: ["Team Leadership", "Hazardous Material Handling", "ISO 14001"] },
  { name: 'Peyton Vance', yearsExperience: 7, skills: ["Process Optimization", "Quality Control", "Lean Manufacturing"] },
  { name: 'Skyler Lane', yearsExperience: 9, skills: ["Waste Management", "Safety Compliance", "OSHA Standards"] },
  { name: 'Avery Reed', yearsExperience: 11, skills: ["Equipment Maintenance", "Team Leadership", "Data Analysis"] },
  { name: 'Parker Gray', yearsExperience: 6, skills: ["Hazardous Material Handling", "Safety Compliance", "Quality Control"] },
  { name: 'Dakota Hayes', yearsExperience: 14, skills: ["Lean Manufacturing", "ISO 14001", "Process Optimization"] },
  { name: 'Charlie Rose', yearsExperience: 4, skills: ["Waste Management", "Equipment Maintenance", "Safety Compliance"] },
  { name: 'Emerson Cole', yearsExperience: 13, skills: ["Team Leadership", "Supply Chain Management", "Waste Management"] },
  { name: 'Finley Blair', yearsExperience: 2, skills: ["Data Analysis", "Safety Compliance", "Quality Control"] },
  { name: 'Hayden Frost', yearsExperience: 12, skills: ["Lean Manufacturing", "OSHA Standards", "Process Optimization"] },
  { name: 'Justice Moon', yearsExperience: 8, skills: ["Waste Management", "Hazardous Material Handling", "Safety Compliance"] },
  { name: 'Kendall Star', yearsExperience: 5, skills: ["Team Leadership", "ISO 14001", "Quality Control"] },
  { name: 'Lennon Sky', yearsExperience: 10, skills: ["Equipment Maintenance", "Lean Manufacturing", "Waste Management"] },
  { name: 'Phoenix Sun', yearsExperience: 7, skills: ["Safety Compliance", "Process Optimization", "Data Analysis"] },
  { name: 'Reese Rain', yearsExperience: 9, skills: ["OSHA Standards", "Waste Management", "Team Leadership"] },
  { name: 'Sage Wind', yearsExperience: 11, skills: ["ISO 14001", "Hazardous Material Handling", "Quality Control"] },
  { name: 'Tatum Stone', yearsExperience: 6, skills: ["Lean Manufacturing", "Safety Compliance", "Process Optimization"] },
  { name: 'Zion Lake', yearsExperience: 14, skills: ["Waste Management", "Equipment Maintenance", "Team Leadership"] },
  { name: 'Amari Hill', yearsExperience: 3, skills: ["Data Analysis", "Safety Compliance", "OSHA Standards"] },
  { name: 'Bellamy Wood', yearsExperience: 13, skills: ["Lean Manufacturing", "ISO 14001", "Waste Management"] },
  { name: 'Campbell Field', yearsExperience: 4, skills: ["Quality Control", "Hazardous Material Handling", "Safety Compliance"] },
  { name: 'Denver Park', yearsExperience: 12, skills: ["Team Leadership", "Process Optimization", "Equipment Maintenance"] },
  { name: 'Ellis Glen', yearsExperience: 8, skills: ["Waste Management", "Lean Manufacturing", "Safety Compliance"] },
  { name: 'Frankie Dale', yearsExperience: 5, skills: ["OSHA Standards", "Quality Control", "Data Analysis"] },
  { name: 'Gentry Lane', yearsExperience: 10, skills: ["ISO 14001", "Team Leadership", "Waste Management"] },
  { name: 'Harlow West', yearsExperience: 7, skills: ["Safety Compliance", "Lean Manufacturing", "Process Optimization"] },
  { name: 'Indigo East', yearsExperience: 9, skills: ["Waste Management", "Hazardous Material Handling", "Quality Control"] },
  { name: 'Jules North', yearsExperience: 11, skills: ["Equipment Maintenance", "Safety Compliance", "Team Leadership"] },
  { name: 'Karsyn South', yearsExperience: 6, skills: ["Lean Manufacturing", "OSHA Standards", "Waste Management"] },
  { name: 'Legacy Port', yearsExperience: 14, skills: ["ISO 14001", "Process Optimization", "Safety Compliance"] },
  { name: 'Marlowe Bay', yearsExperience: 2, skills: ["Quality Control", "Waste Management", "Data Analysis"] },
  { name: 'Nova Cape', yearsExperience: 13, skills: ["Team Leadership", "Lean Manufacturing", "Hazardous Material Handling"] },
  { name: 'Oakley Shore', yearsExperience: 3, skills: ["Safety Compliance", "Equipment Maintenance", "Waste Management"] },
  { name: 'Pax Reef', yearsExperience: 12, skills: ["Process Optimization", "ISO 14001", "Quality Control"] },
  { name: 'Quinn Tide', yearsExperience: 8, skills: ["Waste Management", "Safety Compliance", "Lean Manufacturing"] }
];

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    // Insert all candidates
    await db.insert(candidates).values(sampleCandidates);
    
    console.log("✅ Database seeded successfully with", sampleCandidates.length, "candidates");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed();
