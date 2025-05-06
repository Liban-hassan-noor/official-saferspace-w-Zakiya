// src/pages/Community.jsx
import React from "react";
import stories from "../data/stories";
import StoryCard from "../components/StoryCard";

const Community = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Survivor Stories</h1>
      <p className="mb-6 text-gray-600">Read real stories from brave girls who overcame difficult challenges. You are not alone.</p>
      
      <div className="grid gap-4">
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Community;
