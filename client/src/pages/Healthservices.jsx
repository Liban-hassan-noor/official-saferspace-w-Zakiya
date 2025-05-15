import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Healthservices() {
  const [county, setCounty] = useState("Mandera");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const counties = ["Mandera", "Garissa", "Wajir"];

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try direct API first
        let response;
        try {
          response = await axios.get(
            `https://api.kmhfl.health.go.ke/api/facilities/facilities/?county=${county}&facility_type_name=Hospital`
          );
        } catch (directError) {
          // If direct fails, try with CORS proxy
          console.log("Trying with CORS proxy...");
          response = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://api.kmhfl.health.go.ke/api/facilities/facilities/?county=${county}&facility_type_name=Hospital`
          );
        }

        if (response.data && response.data.results) {
          setHospitals(response.data.results);
        } else {
          setError("No data received");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to load data: ${err.message}`);
        // Fallback mock data if API is completely down
        setHospitals(getMockHospitals(county));
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [county]);

  // Mock data function for fallback
  const getMockHospitals = (county) => {
    const mockData = {
      Mandera: [
        {
          code: "M001",
          name: "Mandera County Referral Hospital",
          county: { name: "Mandera" },
          facility_type: { name: "Hospital" },
          owner_type: { name: "Government" },
          operational_status: { name: "Operational" },
        },
      ],
      Garissa: [
        {
          code: "G001",
          name: "Garissa County Hospital",
          county: { name: "Garissa" },
          facility_type: { name: "Hospital" },
          owner_type: { name: "Government" },
          operational_status: { name: "Operational" },
        },
      ],
      Wajir: [
        {
          code: "W001",
          name: "Wajir County Hospital",
          county: { name: "Wajir" },
          facility_type: { name: "Hospital" },
          owner_type: { name: "Government" },
          operational_status: { name: "Operational" },
        },
      ],
    };
    return mockData[county] || [];
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
        Hospitals in {county} County
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        {counties.map((c) => (
          <button
            key={c}
            onClick={() => setCounty(c)}
            className={`px-4 py-2 rounded ${
              county === c ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
          {hospitals.length > 0 && (
            <p className="text-yellow-600">Showing cached/mock data</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.length > 0
          ? hospitals.map((hospital) => (
              <div
                key={hospital.code}
                className="bg-white shadow p-4 rounded-lg"
              >
                <h2 className="text-lg font-semibold text-green-600">
                  {hospital.name}
                </h2>
                <p className="text-gray-600">County: {hospital.county?.name}</p>
                <p className="text-gray-600">
                  Facility Type: {hospital.facility_type?.name}
                </p>
                <p className="text-gray-600">
                  Owner: {hospital.owner_type?.name}
                </p>
                <p className="text-gray-600">
                  Status: {hospital.operational_status?.name}
                </p>
              </div>
            ))
          : !loading && (
              <p className="col-span-2 text-center">No hospitals found</p>
            )}
      </div>
    </div>
  );
}
