import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import LiveTimestamp from "../components/LiveTimestamp";
import { useTranslation } from "react-i18next";

const emojiMap = {
  heart: "❤️",
  thumbsUp: "👍",
  clapping: "👏",
};

const Community = () => {
  const { t } = useTranslation("community");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!msg.trim() || !currentUser) return;

    const newMsg = {
      text: msg.trim(),
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
      userName: currentUser.displayName || "Anonymous",
      userPhoto: currentUser.photoURL || null,
      reactions: {
        heart: 0,
        thumbsUp: 0,
        clapping: 0,
      },
      reactedBy: {},
      replies: [],
    };

    try {
      await addDoc(collection(db, "messages"), newMsg);
      setMsg(""); // Clear input after send
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleReaction = async (messageId, msg, emoji) => {
    if (!currentUser) return;

    const userId = currentUser.uid;
    const prevEmoji = msg.reactedBy?.[userId];
    if (prevEmoji === emoji) return;

    const updatedReactions = { ...msg.reactions };
    const updatedReactedBy = { ...msg.reactedBy };

    if (prevEmoji) updatedReactions[prevEmoji]--;
    updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
    updatedReactedBy[userId] = emoji;

    try {
      await updateDoc(doc(db, "messages", messageId), {
        reactions: updatedReactions,
        reactedBy: updatedReactedBy,
      });
    } catch (err) {
      console.error("Error updating reaction:", err);
    }
  };

  const handleReply = async (messageId) => {
    if (!replyText.trim() || !currentUser) return;

    const reply = {
      id: crypto.randomUUID(),
      text: replyText.trim(),
      userId: currentUser.uid,
      userName: currentUser.displayName || "Anonymous",
      timestamp: new Date(),
    };

    try {
      await updateDoc(doc(db, "messages", messageId), {
        replies: arrayUnion(reply),
      });
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

  const handleDeleteReply = async (msgId, reply) => {
    const msgDoc = doc(db, "messages", msgId);
    try {
      await updateDoc(msgDoc, {
        replies: arrayRemove(reply),
      });
    } catch (err) {
      console.error("Error deleting reply:", err);
    }
  };

  const handleEditReply = async (msgId, originalReply, updatedText) => {
    if (!updatedText.trim()) return;

    const msgDoc = doc(db, "messages", msgId);
    const updatedReply = {
      ...originalReply,
      text: updatedText,
      timestamp: new Date(),
    };

    try {
      await updateDoc(msgDoc, {
        replies: arrayRemove(originalReply),
      });
      await updateDoc(msgDoc, {
        replies: arrayUnion(updatedReply),
      });
      setEditingReplyId(null);
    } catch (err) {
      console.error("Error editing reply:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-gray-900 dark:text-white">
      <div className="bg-gradient-to-br from-pink-50 to-green-50 dark:from-green-950 dark:to-pink-900 p-6 rounded-2xl shadow-lg border border-pink-200 dark:border-green-400 mb-6">
        <h2 className="text-2xl font-extrabold text-green-900 dark:text-pink-200 mb-3 flex items-center gap-2">
          {t("community.title")}
        </h2>
        <p className="text-green-800 dark:text-pink-100 text-base leading-relaxed">
          {t("community.intro1")}
        </p>
        <p className="mt-3 text-green-800 dark:text-pink-100 text-base leading-relaxed">
          {t("community.intro2")}
        </p>
        <p className="mt-3 text-green-800 dark:text-pink-100 text-base leading-relaxed italic">
          {t("community.intro3")}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-[60vh] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = currentUser?.uid === msg.userId;
          const timestamp = msg.timestamp?.toDate?.()
            ? dayjs(msg.timestamp.toDate()).fromNow()
            : "Sending...";

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${
                isCurrentUser ? "ml-auto text-right" : "mr-auto text-left"
              }`}
            >
              <div className="flex items-center space-x-2">
                {!isCurrentUser && msg.userPhoto && (
                  <img
                    src={msg.userPhoto}
                    alt="Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-sm font-semibold">
                  {msg.userName || "Anonymous"}
                </span>
              </div>

              <div
                className={`p-3 rounded-lg shadow mt-1 ${
                  isCurrentUser
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white"
                }`}
              >
                <p className="mb-1">{msg.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  {timestamp}
                </p>

                <div className="flex gap-3 mt-2 text-sm">
                  {Object.keys(emojiMap).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleReaction(msg.id, msg, key)}
                      className={`hover:scale-105 transition-transform ${
                        msg.reactedBy?.[currentUser?.uid] === key
                          ? "font-bold text-pink-600"
                          : ""
                      }`}
                    >
                      {emojiMap[key]}{" "}
                      {msg.reactions?.[key] > 0 ? msg.reactions[key] : ""}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === msg.id ? null : msg.id)
                    }
                    className="text-blue-600 dark:text-blue-300"
                  >
                    {t("community.reply")}
                  </button>
                </div>

                {msg.replies?.length > 0 && (
                  <div className="mt-2 space-y-1 text-sm text-left">
                    {msg.replies.map((rep) => {
                      const isOwner = rep.userId === currentUser?.uid;
                      return (
                        <div
                          key={rep.id}
                          className="bg-gray-200 dark:bg-gray-600 rounded p-2 text-gray-800 dark:text-gray-100"
                        >
                          <p>
                            <strong>{rep.userName}:</strong>{" "}
                            {editingReplyId === rep.id ? (
                              <>
                                <input
                                  type="text"
                                  className="border px-2 py-1 rounded w-full mt-1"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                />
                                <div className="flex space-x-2 mt-1">
                                  <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() =>
                                      handleEditReply(msg.id, rep, replyText)
                                    }
                                  >
                                    {t("community.send")}
                                  </button>
                                  <button
                                    className="bg-gray-400 text-white px-2 py-1 rounded"
                                    onClick={() => setEditingReplyId(null)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </>
                            ) : (
                              <span>{rep.text}</span>
                            )}
                          </p>
                          <LiveTimestamp timestamp={rep.timestamp} />
                          {isOwner && editingReplyId !== rep.id && (
                            <div className="flex space-x-2 mt-1">
                              <button
                                onClick={() => {
                                  setEditingReplyId(rep.id);
                                  setReplyText(rep.text);
                                }}
                                className="text-yellow-600 text-xs"
                              >
                                {t("community.edit")}
                              </button>
                              <button
                                onClick={() => handleDeleteReply(msg.id, rep)}
                                className="text-red-600 text-xs"
                              >
                                {t("community.delete")}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {replyingTo === msg.id && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={t("community.replyPlaceholder")}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => handleReply(msg.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      {t("community.send")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={endOfMessagesRef}></div>
      </div>

      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
          placeholder={t("community.messagePlaceholder")}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t("community.send")}
        </button>
      </div>
    </div>
  );
};

export default Community;
