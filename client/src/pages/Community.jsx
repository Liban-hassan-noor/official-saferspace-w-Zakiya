import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import storiesData from "../data/stories";
import StoryCard from "../components/StoryCard";

dayjs.extend(relativeTime);

const Community = () => {
  const [stories, setStories] = useState(storiesData);

  const [newStory, setNewStory] = useState("");
  const [messageInputs, setMessageInputs] = useState({});

  const handleStorySubmit = () => {
    if (newStory.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      text: newStory,
      messages: [],
    };

    setStories([newEntry, ...stories]);
    setNewStory("");
  };

  const handleSendMessage = (storyId) => {
    const msg = messageInputs[storyId]?.trim();
    if (!msg) return;

    const newMsg = {
      text: msg,
      timestamp: new Date().toISOString(),
      reactions: { heart: 0, prayer: 0, star: 0 },
    };

    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? { ...story, messages: [...story.messages, newMsg] }
          : story
      )
    );

    setMessageInputs((prev) => ({ ...prev, [storyId]: "" }));
  };

  const handleReact = (storyId, msgIdx, type) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id !== storyId) return story;

        const updatedMessages = [...story.messages];
        const target = updatedMessages[msgIdx];

        const newReactions = {
          ...target.reactions,
          [type]: (target.reactions?.[type] || 0) + 1,
        };

        updatedMessages[msgIdx] = { ...target, reactions: newReactions };

        return { ...story, messages: updatedMessages };
      })
    );
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Survivor Stories 💬
      </h1>

      {/* New Story Input */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-8">
        <textarea
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          placeholder="Write your anonymous story here..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={4}
        />
        <button
          onClick={handleStorySubmit}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Share Story
        </button>
      </div>

      {/* Story List */}
      <div className="grid gap-4">
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Community;
// This code is a React component for a community page where users can share and read stories. It includes features like adding new stories, sending messages, and reacting to messages with emojis. The component uses local state to manage the stories and messages, and it formats timestamps using the dayjs library. The stories data is now imported from a separate file, and the StoryCard component is used to display each story.
