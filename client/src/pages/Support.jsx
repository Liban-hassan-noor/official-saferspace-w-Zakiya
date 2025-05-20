import React from "react";
import "../App.css";

const quotes = [
  "You are not alone; your voice matters.",
  "Every woman deserves to live free from fear.",
  "Healing begins with sharing your story.",
  "Support is strength, not weakness.",
  "Your mental health is just as important as your physical health.",
  "Empowerment starts with education.",
  "Safe spaces are built through love and action.",
  "Break the silence, break the cycle.",
  "Together, we rise above the pain.",
  "Let hope be louder than fear.",
  "Your pain is valid. So is your healing.",
  "Speak up – your courage can inspire change.",
  "You are stronger than you think.",
  "Change begins with you, and support helps it grow.",
  "No woman should suffer in silence.",
  "Support is the foundation of safer communities.",
  "Your voice can break generations of silence.",
  "Even small acts of kindness can change lives.",
  "Real change starts with listening.",
  "Freedom from fear is a basic human right.",
  "Your story may be someone else's survival guide.",
  "Stand up for one, stand up for all.",
  "A future without FGM starts with us.",
  "You are seen. You are heard. You are loved.",
  "Hope is a powerful force. Keep holding on.",
  "Let your scars tell a story of survival.",
  "Compassion is the heartbeat of support.",
  "We believe in safer spaces for every girl.",
  "From pain comes power – your journey matters.",
  "Together, we protect, support, and uplift women.",
];

// Get a different quote on every page refresh
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const Support = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1532634896-26909d0d4b6a?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Support Page</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to the support center of SaferSpace. Here you’ll find
          resources, helplines, and guidance tailored to help girls and women
          affected by early marriages, FGM, and gender-based violence.
        </p>

        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded-md">
          <p className="italic font-medium">“{randomQuote}”</p>
        </div>

        <div className="text-left text-gray-800">
          <h2 className="text-xl font-semibold mb-2">
            📞 Emergency & Support Contacts
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Gender-Based Violence Hotline: <strong>1195</strong>
            </li>
            <li>
              Child Helpline Kenya: <strong>116</strong>
            </li>
            <li>
              AMREF Health Africa: <strong>+254 20 6994000</strong>
            </li>
            <li>
              Wajir, Mandera & Garissa Mental Health Clinics (see Health
              Services)
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">🌱 Get Involved</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Join local women-led initiatives in Northern Kenya</li>
            <li>Attend awareness and empowerment workshops</li>
            <li>Spread awareness on early marriages and FGM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Support;
