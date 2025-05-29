import React, { useEffect, useState } from "react";
import "./clipboard.css";
import { clearClips, deleteClip, getClips, postClip } from "../actions/clips";

const Clipboard = () => {
  const [clips, setClips] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClips();
  }, []);

  const fetchClips = async () => {
    setIsLoading(true);
    try {
      const data = await getClips();
      setClips(data);
    } catch (error) {
      console.error("Error fetching clips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    const data = await postClip(text);
    if (data) {
      setText("");
      fetchClips();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClip(id);
      fetchClips();
    } catch (error) {
      console.error("Error deleting clip:", error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  const handleClearClips = async () => {
    try {
      setClips([]);
      await clearClips();
    } catch (error) {
      console.error("Error clearing clip:", error);
    }
  };

  return (
    <div>
      <div className="clipboard-input">
        <textarea
          className="text-area"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="button" onClick={handlePost}>
          Post
        </button>
      </div>

      <div className="extra-actions-container">
        <button className="extra-actions" onClick={fetchClips}>
          Refresh Clips
        </button>
        <button className="extra-actions" onClick={handleClearClips}>
          Clear Clips
        </button>
      </div>

      <div className="clipboard-output-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : clips.length > 0 ? (
          clips.map((item) => (
            <div key={item.id} className="clipboard-output">
              <div className="clipboard-item">
                <span className="clipboard-text">{item.text}</span>
                <div>
                  <button
                    className="clipboard-button"
                    onClick={() => handleCopy(item.text)}
                  >
                    Copy
                  </button>
                  <button
                    className="clipboard-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>No clips available!</h4>
        )}
      </div>
    </div>
  );
};

export default Clipboard;
