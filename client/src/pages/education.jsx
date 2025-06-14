import React from "react";
import { useTranslation } from "react-i18next";
import { Heart, ShieldCheck, AlertCircle } from "lucide-react";

const Education = () => {
  const { t } = useTranslation("education");

  const rapeSteps = t("rape_steps", { returnObjects: true });
  const marriageSteps = t("marriage_steps", { returnObjects: true });
  const hivSteps = t("hiv_steps", { returnObjects: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-green-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t("intro")}
          </p>
        </div>

        {/* Rape Section */}
        <div className="bg-pink-50 rounded-2xl border border-pink-200 p-6">
          <div className="flex items-center mb-3">
            <AlertCircle className="text-pink-600 w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold text-pink-600">{t("rape_title")}</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            {Array.isArray(rapeSteps) ? (
              rapeSteps.map((step, index) => <li key={index}>{step}</li>)
            ) : (
              <li className="text-red-500">⚠️ Steps failed to load.</li>
            )}
          </ul>
        </div>

        {/* Early Marriage Section */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <div className="flex items-center mb-3">
            <ShieldCheck className="text-green-600 w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold text-green-600">{t("marriage_title")}</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            {Array.isArray(marriageSteps) ? (
              marriageSteps.map((step, index) => <li key={index}>{step}</li>)
            ) : (
              <li className="text-red-500">⚠️ Steps failed to load.</li>
            )}
          </ul>
        </div>

        {/* HIV/AIDS Section */}
        <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
          <div className="flex items-center mb-3">
            <Heart className="text-purple-600 w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold text-purple-600">{t("hiv_title")}</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            {Array.isArray(hivSteps) ? (
              hivSteps.map((step, index) => <li key={index}>{step}</li>)
            ) : (
              <li className="text-red-500">⚠️ Steps failed to load.</li>
            )}
          </ul>
        </div>

        {/* Closing Message */}
        <div className="text-center mt-10">
          <p className="text-lg font-semibold text-gray-700">
            {t("closing")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
