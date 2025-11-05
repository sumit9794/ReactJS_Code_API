import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const GenAIImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setImage("");

    try {
      const res = await axios.post(
        "https://node-api-products-erq0.onrender.com/genai/image",
        { prompt },
        { withCredentials: true } // ✅ Session-based auth
      );
      setImage(res.data.imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      alert("❌ Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>🎨 AI Image Generator</h2>

        <form onSubmit={handleGenerate} style={styles.form}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a property, room, or design idea..."
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {image && (
          <div style={styles.imageBox}>
            <img
              src={image}
              alt="Generated"
              style={styles.image}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    background: "#f9fafb",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    width: "100%",
    maxWidth: "500px",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  imageBox: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "15px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
};

export default GenAIImage;
