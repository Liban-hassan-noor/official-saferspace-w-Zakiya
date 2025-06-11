import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const Healthservices = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Group hospitals by county
  const groupByCounty = (data) => {
    const grouped = {};
    data.forEach((hospital) => {
      const county = hospital.county || "Unknown";
      if (!grouped[county]) grouped[county] = [];
      grouped[county].push(hospital);
    });
    return grouped;
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "hospitals"));
        const allHospitals = [];

        snapshot.forEach((doc) => {
          const countyDoc = doc.id;
          const data = doc.data();

          if (Array.isArray(data.hospitals)) {
            data.hospitals.forEach((hospital, index) => {
              const hospitalWithCounty = {
                ...hospital,
                county: hospital.county || countyDoc,
              };
              allHospitals.push(hospitalWithCounty);

              // Debug log
              //console.log(`✅ ${countyDoc} →`, hospitalWithCounty.name);
            });
          } else {
            console.warn(`⚠️ No hospitals array in doc ${countyDoc}`);
          }
        });

        setHospitals(allHospitals);
      } catch (err) {
        console.error("❌ Failed to fetch hospitals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const filteredGrouped = groupByCounty(hospitals);
  const filteredHospitals = Object.entries(filteredGrouped).filter(([county]) =>
    county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-12 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1604200875071-9f4f7974c7c1?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-95 shadow-xl rounded-xl max-w-7xl w-full p-8">
        <h1 className="text-4xl font-bold text-green-700 mb-4 text-center">
          Health Services in  Kenya
        </h1>

        <p className="text-center text-gray-700 text-lg mb-6 max-w-3xl mx-auto">
          These health facilities offer essential support for survivors of FGM,
          early marriages, and gender-based violence. Search by county to find
          nearby services.
        </p>

        {/* Search Input */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search by county (e.g. Garissa)"
            className="w-full max-w-md p-3 border border-pink-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center text-purple-600 text-xl">
            Loading hospitals...
          </div>
        ) : filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredHospitals.map(([county, hospitalsInCounty], index) => (
              <div
                key={index}
                className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-purple-700 text-center mb-4 border-b border-purple-300 pb-2">
                  {county} County
                </h2>
                <ul className="space-y-4">
                  {hospitalsInCounty.map((hospital, idx) => (
                    <li key={idx} className="text-gray-700">
                      <p className="font-semibold text-lg text-green-800">
                        {hospital.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {hospital.address}
                      </p>
                      <p className="text-sm text-pink-600">{hospital.phone}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-800 mt-10 text-lg">
            No hospitals found for that county.
          </p>
        )}

        <div className="mt-10 text-center">
          <p className="text-sm italic text-gray-600">
            Empowering communities with compassionate, accessible healthcare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Healthservices;
// This component fetches and displays health services data from Firestore.
// It allows users to search by county and view hospitals with their details.