import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import storiesData from "../data/stories";
import StoryCard from "../components/StoryCard";

dayjs.extend(relativeTime);

const Community = () => {
  const [stories, setStories] = useState([]);

  const [newStory, setNewStory] = useState("");
  const [messageInputs, setMessageInputs] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);
    });

    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const unsubscribeStories = onSnapshot(q, (snapshot) => {
      const storiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStories(storiesData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeStories();
    };
  }, []);

  const handleStorySubmit = async () => {
    if (!newStory.trim()) return;
    try {
      await addDoc(collection(db, "stories"), {
        text: newStory,
        messages: [],
        createdAt: new Date(),
      });
      setNewStory("");
    } catch (error) {
      console.error("Error posting story:", error);
    }
  };

  const handleSendMessage = async (storyId) => {
    const msg = messageInputs[storyId]?.trim();
    if (!msg || !currentUser) return;

    const storyRef = doc(db, "stories", storyId);
    const newMsg = {
      text: msg,
      timestamp: new Date().toISOString(),
      userId: currentUser.uid,
      reactions: {
        heart: 0,
        thumbsUp: 0,
        clapping: 0,
        reactedBy: {}, // userId: 'reactionType'
      },
    };

    try {
      await updateDoc(storyRef, {
        messages: arrayUnion(newMsg),
      });
      setMessageInputs((prev) => ({ ...prev, [storyId]: "" }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReaction = async (storyId, msgIndex, reactionType) => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    const story = stories.find((s) => s.id === storyId);
    const message = story?.messages[msgIndex];
    if (!message || message.reactions?.reactedBy?.[userId]) return;

    const updatedReactions = {
      ...message.reactions,
      [reactionType]: message.reactions[reactionType] + 1,
      reactedBy: {
        ...message.reactions.reactedBy,
        [userId]: reactionType,
      },
    };

    const updatedMessage = { ...message, reactions: updatedReactions };
    const updatedMessages = [...story.messages];
    updatedMessages[msgIndex] = updatedMessage;

    try {
      await updateDoc(doc(db, "stories", storyId), {
        messages: updatedMessages,
      });
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  const getTotalReactions = (messages) => {
    return messages?.reduce((sum, msg) => {
      return (
        sum +
        (msg.reactions?.heart || 0) +
        (msg.reactions?.thumbsUp || 0) +
        (msg.reactions?.clapping || 0)
      );
    }, 0);
  };

  const sortMessagesByReactions = (messages) => {
    return [...messages].sort((a, b) => {
      const aTotal =
        (a.reactions?.heart || 0) +
        (a.reactions?.thumbsUp || 0) +
        (a.reactions?.clapping || 0);
      const bTotal =
        (b.reactions?.heart || 0) +
        (b.reactions?.thumbsUp || 0) +
        (b.reactions?.clapping || 0);
      return bTotal - aTotal;
    });
  };

  const formatRelativeTime = (timestamp) => {
    return dayjs(timestamp).fromNow();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Community Stories</h1>
      <p className="text-gray-600 mb-4">
        Share your experience. Your voice might be the one that helps someone heal 💚
      </p>

      <div className="mb-4">
        <textarea
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          placeholder="Share your story..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleStorySubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Post Story
        </button>
      </div>

      {stories.map((story) => (
        <div
          key={story.id}
          className="border border-gray-300 p-4 mb-6 rounded-xl shadow-sm"
        >
          <div>
            <p className="text-gray-900">{story.text}</p>
            <p className="text-sm text-gray-500 mt-1">
              Total Reactions: {getTotalReactions(story.messages)}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {sortMessagesByReactions(story.messages || []).map((msg, idx) => {
              const isOwn = msg.userId === currentUser?.uid;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-3 max-w-sm ${
                    isOwn
                      ? "bg-green-100 ml-auto text-right"
                      : "bg-gray-100 text-left"
                  } shadow`}
                >
                  <p>{msg.text}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(msg.timestamp)}
                  </div>
                  <div className="flex gap-2 mt-2 justify-end">
                    <button
                      onClick={() =>
                        handleReaction(story.id, idx, "heart")
                      }
                      className="text-red-500"
                    >
                      ❤️ {msg.reactions.heart}
                    </button>
                    <button
                      onClick={() =>
                        handleReaction(story.id, idx, "thumbsUp")
                      }
                      className="text-blue-500"
                    >
                      👍 {msg.reactions.thumbsUp}
                    </button>
                    <button
                      onClick={() =>
                        handleReaction(story.id, idx, "clapping")
                      }
                      className="text-yellow-500"
                    >
                      👏 {msg.reactions.clapping}
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Reply to this message..."
                value={messageInputs[story.id] || ""}
                onChange={(e) =>
                  setMessageInputs((prev) => ({
                    ...prev,
                    [story.id]: e.target.value,
                  }))
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={() => handleSendMessage(story.id)}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ))}
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
