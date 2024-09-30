import img4 from "../assets/mic-01.png";
import img3 from "../assets/sent.png";
import { useState } from "react";

const TwinHome2 = () => {
  const [userQuery, setUserQuery] = useState(""); // State to track the user query
  const [aiResponse, setAiResponse] = useState(""); // State to store the AI response
  const [loading, setLoading] = useState(false); // State to track loading state

  // Function to handle the API request
  const handleSubmit = async () => {
    if (!userQuery) return; // Do nothing if query is empty
    setLoading(true);

    try {
      const response = await fetch(
        "https://llama.us.gaianet.network/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: userQuery, // Ensure this matches the expected format of the API
          }),
        }
      );

      // Log the raw response for debugging purposes
      const rawResponse = await response.text();
      console.log("Raw response from server:", rawResponse);

      // Attempt to parse JSON only if the response is valid
      const data = JSON.parse(rawResponse); // This might throw the error
      setAiResponse(data.choices[0].message.content); // Assuming this is the correct path to the AI response
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(241, 241, 241, 1)",
          paddingBottom: "2rem",
        }}
      >
        <section
          className="pt-4"
          style={{
            paddingLeft: "5rem",
            paddingRight: "5rem",
            borderBottom: "1px solid rgba(217, 217, 217, 1)",
            paddingBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "15px" }}>
              <a
                href="#"
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  textDecoration: "none",
                  color: "rgba(1,1,1,1)",
                }}
              >
                Your Rights
              </a>
              <a
                href="#"
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  textDecoration: "none",
                  color: "rgba(1,1,1,1)",
                }}
              >
                Matchmake Me
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
                color: "rgba(74, 144,226,1)",
              }}
            >
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  fontWeight: "400",
                  fontSize: "18px",
                }}
              >
                Emergency Help line
              </a>
              <i
                className="bi bi-question-circle"
                style={{ fontWeight: "400", fontSize: "18px" }}
              ></i>
            </div>
          </div>
        </section>

        <section
          style={{
            width: "1240px",
            height: "682px",
            background: "rgba(238, 238, 238, 1)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px auto",
            padding: "20px",
          }}
        >
          {/* Upper part for AI response */}
          <div
            style={{
              width: "100%",
              height: "80%",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#333",
                textAlign: "center",
              }}
            >
              {loading
                ? "Loading..." // No need for nested <p> here
                : aiResponse && (
                    <div
                      style={{
                        marginTop: "20px",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      <p>AI Response: {aiResponse}</p>
                    </div>
                  )}
            </p>
          </div>

          {/* Bottom part for the search bar */}
          <div style={{ position: "relative", width: "800px", height: "64px" }}>
            <img
              src={img4}
              alt="Mic"
              style={{
                border: "1px solid rgba(156, 156, 156, 1)",
                borderRadius: "32px",
                padding: "10px",
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "40px",
                width: "40px",
              }}
            />
            <textarea
              className="form-control"
              placeholder="Ask me anything..."
              aria-label="Search"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              rows="2"
              style={{
                width: "100%",
                borderRadius: "48px",
                minHeight: "64px",
                textAlign: "start",
                fontSize: "16px",
                fontWeight: "400",
                backgroundColor: "rgba(241, 241, 241, 1)",
                paddingTop: "1rem",
                paddingLeft: "70px",
                paddingRight: "70px",
                resize: "none",
                overflowWrap: "break-word",
              }}
            />
            <button
              className="btn"
              onClick={handleSubmit} // Move onClick to the button
              disabled={loading}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(74, 144, 226, 1)",
                border: "1px solid rgba(74, 144, 226, 1)",
                borderRadius: "32px",
                padding: "10px",
                height: "40px",
                width: "40px",
              }}
            >
              <img
                src={img3}
                alt="Send"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default TwinHome2;