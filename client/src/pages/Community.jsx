import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Community = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      text: "I felt scared but I found a nurse who helped me heal. You're not alone.",
      messages: [
        {
          text: "Thank you for sharing ❤️",
          timestamp: new Date().toISOString(),
          reactions: { heart: 1, prayer: 0, star: 0 },
        },
      ],
    },
  ]);

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
      {stories.map((story) => (
        <div key={story.id} className="bg-white rounded-xl p-4 shadow-md mb-6">
          <p className="text-gray-800 mb-3">{story.text}</p>

          {/* Messages */}
          {story.messages.length > 0 && (
            <div className="mb-3 space-y-2 max-h-40 overflow-y-auto pr-2">
              {story.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 p-3 rounded-md shadow-sm border border-green-100"
                >
                  <p className="text-sm text-green-900">{msg.text}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>{dayjs(msg.timestamp).fromNow()}</span>
                    <div className="flex space-x-2 text-lg">
                      {["heart", "prayer", "star"].map((type) => {
                        const icons = {
                          heart: "❤️",
                          prayer: "🙏",
                          star: "🌟",
                        };
                        return (
                          <button
                            key={type}
                            onClick={() => handleReact(story.id, idx, type)}
                            className="hover:scale-110 transition-transform"
                          >
                            {icons[type]}{" "}
                            <span className="text-sm ml-0.5">
                              {msg.reactions?.[type] || 0}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Message Input */}
          <div className="mt-2 flex items-center gap-2">
            <textarea
              placeholder="Send a supportive message..."
              value={messageInputs[story.id] || ""}
              onChange={(e) =>
                setMessageInputs({
                  ...messageInputs,
                  [story.id]: e.target.value,
                })
              }
              rows={1}
              className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <button
              onClick={() => handleSendMessage(story.id)}
              className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 text-sm transition-transform active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Community;
// This code is a React component for a community page where users can share and read stories. It includes features like adding new stories, sending messages, and reacting to messages with emojis. The component uses local state to manage the stories and messages, and it formats timestamps using the dayjs library.