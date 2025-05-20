import React from "react";
import "../App.css";

const hospitalsData = [
  {
    county: "Wajir",
    hospitals: [
      {
        name: "Wajir County Referral Hospital",
        address: "Wajir Town, Wajir County",
        phone: "+254 722 123456",
      },
      {
        name: "Alimaow Medical Centre",
        address: "Alimaow Rd, Wajir",
        phone: "+254 722 654321",
      },
    ],
  },
  {
    county: "Mandera",
    hospitals: [
      {
        name: "Mandera County Hospital",
        address: "Mandera Town, Mandera County",
        phone: "+254 722 789012",
      },
      {
        name: "Red Cross Hospital Mandera",
        address: "Near Airstrip, Mandera",
        phone: "+254 733 456789",
      },
    ],
  },
  {
    county: "Garissa",
    hospitals: [
      {
        name: "Garissa County Referral Hospital",
        address: "Kismayo Rd, Garissa",
        phone: "+254 700 123123",
      },
      {
        name: "Madina Hospital Garissa",
        address: "Jamia Mosque St, Garissa",
        phone: "+254 701 456456",
      },
    ],
  },
];

const Healthservices = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-12 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1604200875071-9f4f7974c7c1?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-95 shadow-xl rounded-xl max-w-7xl w-full p-8">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          Health Services in Northern Kenya
        </h1>
        <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
          These health facilities offer essential services including physical
          and mental health support, especially for women and girls affected by
          early marriages, FGM, and gender-based violence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitalsData.map((county, index) => (
            <div
              key={index}
              className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-green-800 text-center mb-4 border-b border-green-300 pb-2">
                {county.county} County
              </h2>
              <ul className="space-y-4">
                {county.hospitals.map((hospital, idx) => (
                  <li key={idx} className="text-gray-700">
                    <p className="font-semibold text-lg">{hospital.name}</p>
                    <p className="text-sm">{hospital.address}</p>
                    <p className="text-sm text-green-600">{hospital.phone}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm italic text-gray-600">
            We believe access to safe and supportive healthcare is a right, not
            a privilege.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Healthservices;
