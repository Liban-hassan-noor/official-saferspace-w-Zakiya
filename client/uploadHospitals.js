// uploadHospitals.js
import { db } from "./src/firebase.js";
import { collection, setDoc, doc } from "firebase/firestore";

// Paste your JSON data here
import hosptalsData from "./hosptalsData.json"; // or paste JSON directly here

export const uploadData = async () => {
  try {
    for (const county of hosptalsData.health_services) {
      const countyRef = doc(collection(db, "hospitals"), county.county);
      await setDoc(countyRef, { hospitals: county.hospitals });
      console.log(`Uploaded data for ${county.county}`);
    }
    console.log("✅ All counties uploaded!");
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

uploadData();
// This script uploads health services data to Firestore.
