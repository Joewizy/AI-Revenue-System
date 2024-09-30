import React, { useState } from 'react';
import img1 from "../assets/message-multiple-02.png";
import img2 from "../assets/market-analysis.png";
import img3 from "../assets/sent.png";
import img4 from "../assets/pencil-edit-02.png";
import { Link } from "react-router-dom";

const TwinHome = () => {
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([
    { role: "assistant", content: "Hello! I'm Elun Gates, your hybrid AI assistant ready to give distribution advice." }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUserMessage = { role: "user", content: userInput };
    const newConversationHistory = [...conversationHistory, newUserMessage];
    setConversationHistory(newConversationHistory);

    try {
      const body = {
        messages: [
          { role: "system", content: "." },
          ...newConversationHistory
        ]
      };

      const res = await fetch('https://phi.us.gaianet.network/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const aiMessage = data.choices[0].message.content;

      const newAIMessage = { role: "Financial Advisor", content: aiMessage };
      setConversationHistory([...newConversationHistory, newAIMessage]);
      setUserInput('');
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = { role: "system", content: 'Error fetching data. Please try again later.' };
      setConversationHistory([...newConversationHistory, errorMessage]);
    }
  };

  return (
    <div style={{ backgroundColor: "rgba(241, 241, 241, 1)", paddingBottom: "2rem" }}>
      <section className="pt-4" style={{ padding: "0 5rem", borderBottom: "1px solid rgba(217, 217, 217, 1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/co-authoring" style={{ fontWeight: "400", fontSize: "14px", textDecoration: "none", color: "rgba(1,1,1,1)" }}>Co-Authoring</Link>
            <Link to="/insights" style={{ fontWeight: "400", fontSize: "14px", textDecoration: "none", color: "rgba(1,1,1,1)" }}>Insights</Link>
            <div style={{ padding: "10px 20px", border: "1px solid white", borderRadius: "30px", backgroundColor: "white", transform: "translateY(-10px)" }}>
              <Link to="/twinHome2" style={{ fontWeight: "400", fontSize: "14px", textDecoration: "none" }}>Ask AI</Link>
            </div>
          </div>
          <div style={{ display: "flex", gap: "5px", color: "blue", fontWeight: "400", fontSize: "18px" }}>
            <Link to="/help" style={{ textDecoration: "none", fontWeight: "400", fontSize: "18px" }}>Emergency Help line</Link>
            <i className="bi bi-question-circle"></i>
          </div>
        </div>
      </section>

      <section>
        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <h1 style={{ fontWeight: "600", fontSize: "36px", color: "rgba(1,1,1,1)" }}>Hello, There!</h1>
          <h2 style={{ fontWeight: "500", fontSize: "24px", color: "rgba(139, 139, 139, 1)" }}>How Can I Help You Today?</h2>
          <p style={{ fontWeight: "400", fontSize: "14px", color: "rgba(98,98,98,1)" }}>
            Kariya uses the latest AI models & insights from our AI research database to produce evidence-based answers about human rights related to Gender Based Violence.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", padding: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "332px", height: "245px", padding: "24px", border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "24px", backgroundColor: "rgba(217, 217, 217, 1)" }}>
            <img src={img1} alt="Information Retrieval" style={{ borderRadius: "48px", padding: "10px", backgroundColor: "rgba(233, 233, 233, 1)" }} />
            <h3 style={{ fontWeight: "600", fontSize: "16px" }}>Information Retrieval</h3>
            <hr />
            <ul>
              <li style={{ fontWeight: "600", fontSize: "12px" }}><strong>Answer Questions:</strong> Provide factual information based on a vast knowledge base.</li>
              <li style={{ fontWeight: "600", fontSize: "12px" }}><strong>Summarise Text:</strong> Condense long documents or articles into shorter summaries.</li>
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "332px", height: "245px", padding: "20px", border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "24px", backgroundColor: "rgba(217, 217, 217, 1)" }}>
            <img src={img2} alt="Data Analysis" style={{ borderRadius: "48px", padding: "10px", backgroundColor: "rgba(233, 233, 233, 1)" }} />
            <h3 style={{ fontWeight: "600", fontSize: "16px" }}>Data Analysis</h3>
            <hr />
            <ul>
              <li style={{ fontWeight: "600", fontSize: "12px" }}><strong>Analyze Data:</strong> Interpret and provide insights from datasets.</li>
              <li style={{ fontWeight: "600", fontSize: "12px" }}><strong>Generate Reports:</strong> Create detailed reports based on data analysis.</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
        <p style={{ color: "rgba(156, 156, 156, 1)", fontWeight: "400", fontSize: "12px" }}>AI can make mistakes. Check for important information.</p>

        <div style={{ position: "relative", width: "800px" }}>
          <img src={img4} alt="Ask" style={{ borderRadius: "32px", padding: "10px", position: "absolute", left: "15px", top: "15%", height: "40px", width: "40px" }} />
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type your question here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ width: "100%", height: "40px", border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "16px", paddingLeft: "50px" }}
            />
            <button
              type="submit"
              style={{ width: "100px", height: "40px", border: "none", borderRadius: "16px", backgroundColor: "blue", color: "white" }}
            >
              Ask
            </button>
          </form>
          <div style={{ marginTop: "20px", maxHeight: "300px", overflowY: "auto", border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "16px", padding: "10px", backgroundColor: "white" }}>
            {conversationHistory.map((message, index) => (
              <div key={index} style={{ marginBottom: "10px", textAlign: message.role === "user" ? "right" : "left" }}>
                <strong style={{ color: message.role === "user" ? "blue" : "green" }}>{message.role === "user" ? "You:" : "Elun Gates:"}</strong>
                <p style={{ display: "inline-block", padding: "5px", borderRadius: "12px", backgroundColor: message.role === "user" ? "rgba(230, 230, 255, 1)" : "rgba(210, 255, 210, 1)" }}>
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TwinHome;
