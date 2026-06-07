import { useState } from "react";
import MagicRings from "./MagicRings";

function App() {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "features": {\n    "F3912": 8.0,\n    "F2230": 1,\n    "F1922": 44.2,\n    "F3799": 5\n  }\n}',
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPreset = (type) => {
    if (type === "SAFE") {
      setJsonInput(
        '{\n  "features": {\n    "F3912": 0,\n    "F2230": 1,\n    "F1922": 5595.74,\n    "F3799": 593331\n  }\n}',
      );
    } else if (type === "FRAUD") {
      setJsonInput(
        '{\n  "features": {\n    "F3912": 1,\n    "F2230": 99999,\n    "F1922": -88888,\n    "F3799": 9999999\n  }\n}',
      );
    }
  };

  const runDiagnostics = async () => {
    setLoading(true);
    setError("");
    const startTime = Date.now();

    try {
      const parsedData = JSON.parse(jsonInput);

      const response = await fetch(
        "https://aegis-ai-backend-pdgj.onrender.com/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        },
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      data.latency = Date.now() - startTime;
      setResult(data);
    } catch (err) {
      setError("Connection Failed. Is the FastAPI server running?");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Ring Colors based on AI Action
  const getRingConfig = (action) => {
    if (action === "FREEZE")
      return { color: "#ef4444", colorTwo: "#7f1d1d", speed: 3.0 }; // Fast Red
    if (action === "REVIEW")
      return { color: "#f59e0b", colorTwo: "#78350f", speed: 2.0 }; // Medium Yellow
    if (action === "APPROVE")
      return { color: "#10b981", colorTwo: "#064e3b", speed: 1.5 }; // Calm Green
    return { color: "#3b82f6", colorTwo: "#1e3a8a", speed: 1.0 }; // Standby
  };

  const ringConfig = getRingConfig(result ? result.action : null);

  return (
    <div className="min-h-screen p-8 flex justify-center items-center bg-[#0b1121] font-sans">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl">
        {/* HEADER */}
        <header className="mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold text-blue-400 tracking-wider">
            AEGIS <span className="text-white">AI CORE</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Live Transaction Interception Array
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT PANEL: INPUT & BUTTONS */}
          <div className="flex flex-col">
            {/* NEW: QUICK DEMO BUTTONS */}
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Target Payload
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => loadPreset("SAFE")}
                  className="text-xs font-mono bg-emerald-900/40 text-emerald-400 px-3 py-1 rounded border border-emerald-700/50 hover:bg-emerald-800/60 transition-colors"
                >
                  🟢 Safe Demo
                </button>
                <button
                  onClick={() => loadPreset("FRAUD")}
                  className="text-xs font-mono bg-red-900/40 text-red-400 px-3 py-1 rounded border border-red-700/50 hover:bg-red-800/60 transition-colors"
                >
                  🔴 Threat Demo
                </button>
              </div>
            </div>

            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 bg-black text-emerald-400 font-mono text-sm p-4 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 resize-none transition-colors relative z-20"
            />
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className={`mt-4 w-full font-bold py-3 px-4 rounded uppercase tracking-widest transition-all duration-200 relative z-20
                ${loading ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30"}`}
            >
              {loading ? "Processing..." : "Run Diagnostics"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-3 font-mono">{error}</p>
            )}
          </div>

          {/* RIGHT PANEL: MAGIC RINGS DASHBOARD */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex flex-col relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {/* Top Section: WebGL Background + Text Overlay */}
            <div className="relative w-full h-64 mb-6 flex items-center justify-center rounded-lg">
              {/* 3D WebGL Rings */}
              <div className="absolute inset-0 z-0">
                <MagicRings
                  color={ringConfig.color}
                  colorTwo={ringConfig.colorTwo}
                  speed={ringConfig.speed}
                  ringCount={6}
                  lineThickness={1.8}
                  opacity={0.8}
                  followMouse={true}
                  mouseInfluence={0.3}
                />
              </div>

              {/* Floating Risk Score Text */}
              <div className="relative z-10 text-center pointer-events-none">
                <h2 className="text-6xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
                  {result ? `${result.risk_score}%` : "--%"}
                </h2>
                <h3
                  className={`text-2xl font-black uppercase tracking-widest mt-2 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] 
                   ${
                     result?.action === "FREEZE"
                       ? "text-red-400"
                       : result?.action === "REVIEW"
                         ? "text-yellow-400"
                         : result?.action === "APPROVE"
                           ? "text-emerald-400"
                           : "text-slate-400"
                   }`}
                >
                  {result ? result.action : "STANDBY"}
                </h3>
              </div>
            </div>

            {/* Bottom Section: Layer Stats */}
            <div className="w-full border-t border-slate-700 pt-4 text-sm text-slate-400 space-y-3 font-mono relative z-10 bg-slate-800/80 p-2 rounded">
              <div className="flex justify-between items-center">
                <span>Layer 2 (XGBoost):</span>
                <span className="text-white">
                  {result ? `${result.layer_2_supervised}%` : "--"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Layer 1 (Anomaly):</span>
                <span className="text-white">
                  {result
                    ? result.layer_1_anomaly === 1.0
                      ? "FLAGGED (1.0)"
                      : "NORMAL (0.0)"
                    : "--"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                <span>Network Latency:</span>
                <span className="text-blue-400">
                  {result ? `${result.latency} ms` : "-- ms"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
