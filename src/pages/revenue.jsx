import { useState } from "react";
import { useRevenueContract } from "../smartContract/revenueContract";
import eth from "../assets/ethereumorg_logo.png.png";

const Revenue = () => {
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false); // State to toggle between deposit and withdraw

  // Get the revenue contract functions from the hook
  const { depositRevenue, withdrawRevenue } = useRevenueContract();

  return (
    <>
      <section className="container mt-5">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontWeight: "600", fontSize: "20px" }}>
              TwinGenie AI
            </h3>
          </div>
          <div>
            <p style={{ fontWeight: "500", fontSize: "16px" }}>Revenue</p>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(238,238,238,1)",
          paddingTop: "2rem",
        }}
      >
        <div>
          <p style={{ fontWeight: "500", fontSize: "25px" }}>
            {isWithdraw ? "Withdraw Revenue" : "Deposit Revenue"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn"
            onClick={() => setIsWithdraw(false)}
            style={{
              width: "183px",
              height: "40px",
              borderRadius: "40px",
              backgroundColor: isWithdraw ? "rgba(217, 217, 217, 1)" : "rgba(29,35,64,1)",
              color: "white",
            }}
          >
            Deposit Revenue
          </button>

          <button
            className="btn"
            onClick={() => setIsWithdraw(true)}
            style={{
              width: "183px",
              height: "40px",
              borderRadius: "40px",
              backgroundColor: isWithdraw ? "rgba(29,35,64,1)" : "rgba(217, 217, 217, 1)",
              color: "white",
            }}
          >
            Withdraw Revenue
          </button>
        </div>
      </section>

      <section
        className="container"
        style={{
          backgroundColor: "rgba(238,238,238,1)",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <div>
          <p style={{ fontWeight: "500", fontSize: "16px", paddingLeft: "29rem" }}>
            Amount
          </p>
        </div>
        <div style={{ display: "flex", gap: "10rem", justifyContent: "center" }}>
          <input
            type="number"
            value={isWithdraw ? withdrawAmount : amount}
            onChange={(e) => isWithdraw ? setWithdrawAmount(e.target.value) : setAmount(e.target.value)}
            placeholder="Enter Amount" // Placeholder text
            style={{
              fontWeight: "500",
              fontSize: "40px",
              width: "120px",
              textAlign: "center",
              border: "none",
              outline: "none",
              backgroundColor: "rgba(238,238,238,1)",
            }}
          />
          <style>{`
            input::placeholder {
              color: rgba(0, 0, 0, 0.5); // Slightly darker for better visibility
              font-size: 20px; // Smaller size
              text-align: center; // Centered alignment
            }
          `}</style>

          <button
            className="btn"
            style={{
              width: "121px",
              height: "50px",
              borderRadius: "60px",
              backgroundColor: "rgba(29,35,64,1)",
              color: "white",
            }}
          >
            <img
              src={eth}
              alt="Eth logo"
              style={{ width: "40px", height: "40px" }}
            />
            ETH
          </button>
        </div>

        {/* Centered borderBottom */}
        <div
          style={{
            borderBottom: "2px solid black",
            width: "50%",
            margin: "2rem auto",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>

        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => {
            if (isWithdraw) {
              withdrawRevenue(withdrawAmount); // Call withdrawRevenue with the amount
            } else {
              depositRevenue(amount); // Call depositRevenue with the amount
            }
          }}
          style={{
            display: "block",
            margin: "0 auto",
            borderRadius: "40px",
            fontWeight: "bold",
            width: "141px",
            height: "40px",
          }}
        >
          {isWithdraw ? "Withdraw" : "Deposit"}
        </button>
      </section>
    </>
  );
};

export default Revenue;
