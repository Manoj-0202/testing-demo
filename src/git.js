import React, { useState } from "react";
import { toast } from "react-toastify";

const Git = ({ testCasesJson }) => {
  const [pushing, setPushing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");

 const handleGitPush = async () => {
  if (!username || !token || !repo) {
    toast.error("Please enter all Git details.");
    return;
  }

  console.log("🔐 Git Credentials:");
  console.log("Username:", username);
  console.log("Token:", token);
  console.log("Repo:", repo);
  console.log("Branch:", branch);

  setPushing(true);
  try {
    const response = await fetch("http://localhost:8000/git/push-auto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        token,
        repo,
        branch,
        testCases: JSON.stringify(testCasesJson),
        srcPath: "C:\\Users\\rswap\\OneDrive\\Desktop\\react-practice\\reactautomation\\src",
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message || "✅ Pushed to Git successfully");
      setShowPopup(false);

      // ✅ Clear the input fields
      setUsername("");
      setToken("");
      setRepo("");
      setBranch("main");
    } else {
      toast.error(data.error || "❌ Git push failed");
    }
  } catch (error) {
    toast.error("❌ Failed to connect to backend");
    console.error("Git Push Error:", error);
  } finally {
    setPushing(false);
  }
};



  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
        Push to Git
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "450px",
              position: "relative",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                border: "none",
                background: "none",
                fontSize: "35px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>

            <h4 className="text-center mb-4">Push to GitHub</h4>
            <input
              type="text"
              placeholder="GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="GitHub Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Repository Name (e.g., my-repo)"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Branch (default: main)"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="form-control mb-4"
            />

            <button
              onClick={handleGitPush}
              disabled={pushing}
              className="btn btn-success w-100"
            >
              {pushing ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                />
              ) : (
                "Push to Git"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Git;
