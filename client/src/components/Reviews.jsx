// src/components/StoryCard.jsx
import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white border border-pink-100 shadow-md rounded-xl p-4">
      <h2 className="text-xl font-semibold text-green-800">{story.title}</h2>
      <p className="text-gray-700 mt-2">{story.content.slice(0, 120)}...</p>
      <div className="mt-3 text-sm text-green-600 underline cursor-pointer"></div>
      <div className="mt-3 flex gap-2 flex-wrap">
        {story.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-pink-100 text-pink-700 px-2 py-1 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
