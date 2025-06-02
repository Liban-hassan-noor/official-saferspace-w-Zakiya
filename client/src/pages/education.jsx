import React from "react";

const Education = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 via-pink-50 to-green-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6">
          What To Do Next
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          If you or someone you know has experienced rape, early marriage, or is dealing with HIV/AIDS, know that you're not alone. This page offers practical steps and support resources to help you move forward with strength and care.
        </p>

        {/* Section: After Rape */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            If You Have Been Raped
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Go to a safe place and be with someone you trust.</li>
            <li>Seek medical help immediately (within 72 hours for PEP & emergency contraception).</li>
            <li>Preserve evidence (avoid bathing or changing clothes until you get medical attention).</li>
            <li>Report to the police or a local support center if you're ready.</li>
            <li>Talk to a mental health counselor for emotional support.</li>
          </ul>
        </div>

        {/* Section: Early Marriage */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            If You Are in an Early Marriage
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Understand your rights — child marriage is illegal in Kenya and many other countries.</li>
            <li>Seek help from women's rights groups, community leaders, or trusted adults.</li>
            <li>Contact child protection services or helplines in your area.</li>
            <li>Consider safe shelter options offered by NGOs and rescue centers.</li>
          </ul>
        </div>

        {/* Section: HIV/AIDS */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600 mb-3">
            Living with or Concerned About HIV/AIDS
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Get tested at a certified clinic to know your status.</li>
            <li>If positive, begin antiretroviral treatment (ART) immediately — it's free in public hospitals.</li>
            <li>Join a support group to talk to others with similar experiences.</li>
            <li>Eat well, stay informed, and remember that HIV is manageable with proper care.</li>
          </ul>
        </div>

        {/* Closing Message */}
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold text-gray-600">
            💚 You are not alone. SaferSpace is here to support, guide, and walk with you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
