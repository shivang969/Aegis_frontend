# 🛡️ Aegis AI Core: Real-Time Transaction Interception Array

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?logo=vercel&style=for-the-badge)](https://YOUR-VERCEL-URL.vercel.app)
[![API Status](https://img.shields.io/badge/Backend_API-Render-46E3B7?logo=render&style=for-the-badge)](https://YOUR-RENDER-URL.onrender.com/docs)
[![Python Engine](https://img.shields.io/badge/Python-3.10+-blue?logo=python&style=for-the-badge)]()
[![React Frontend](https://img.shields.io/badge/React-WebGL-61DAFB?logo=react&style=for-the-badge)]()

Aegis AI is an enterprise-grade, **Decoupled Machine Learning Pipeline** designed to intercept financial fraud in real-time. It moves beyond rigid, rule-based banking thresholds by utilizing a custom "Two-Brain" ensemble model architecture, capable of detecting both known historical threats and zero-day transactional anomalies in **<40ms**.

---

## 🧠 The "Two-Brain" Architecture

Financial criminals continuously evolve to bypass standard limits (e.g., micro-structuring and smurfing). To combat this, Aegis AI fuses Supervised and Unsupervised learning:

1. **Layer 1: The Detective (Isolation Forest)**
   * **Type:** Unsupervised Anomaly Detection.
   * **Purpose:** Analyzes the baseline transaction behavior and flags statistical impossibilities without requiring prior training labels. Outputs a binary anomaly state.

2. **Layer 2: The Enforcer (XGBoost)**
   * **Type:** Supervised Gradient Boosting.
   * **Purpose:** Trained on thousands of historical banking records to hunt down specific behavioral signatures (like high "Pass-Through Ratios" indicative of Money Mules). Outputs a precise fraud probability percentage.

### 🧮 The Ensemble Equation
The final threat assessment is calculated using a custom weighted ensemble equation. We cap the supervised model's authority to prevent false positives on single-feature triggers, requiring the anomaly layer to co-sign on extreme deviations.

`R_score = (0.7 * P_supervised) + (0.3 * S_anomaly)`

*Where `R_score` is the Final Risk Percentage, `P_supervised` is the XGBoost probability, and `S_anomaly` is the Isolation Forest trigger.*

---

## 💻 Tech Stack

### Frontend (Static Edge / Vercel)
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Visualization:** Custom 3D WebGL (MagicRings)
* **State:** React Hooks with Async API polling

### Backend (Dynamic Compute / Render)
* **Framework:** FastAPI (Python)
* **ML Engines:** XGBoost, Scikit-Learn (Isolation Forest)
* **Data Processing:** Pandas, NumPy
* **Serialization:** Joblib (Strict Version Pinning)

---

## 🚀 Live Demo & Usage

Judges and recruiters can test the live pipeline instantly without writing JSON payloads.

1. Navigate to the **[Live Dashboard](https://YOUR-VERCEL-URL.vercel.app)**.
2. Click **🟢 Safe Demo** to load an average baseline transaction.
3. Click **🔴 Threat Demo** to load a known money-mule payload.
4. Hit **Run Diagnostics** to watch the FastAPI server process the math and return a dynamic Action Directive (`APPROVE`, `REVIEW`, or `FREEZE`) alongside network latency stats.

---

## ⚙️ Local Development Setup

If you wish to run the decoupled architecture locally:

**1. Clone the repositories:**
```bash
git clone [https://github.com/YOUR-USERNAME/aegis-frontend.git](https://github.com/YOUR-USERNAME/aegis-frontend.git)
git clone [https://github.com/YOUR-USERNAME/aegis-backend.git](https://github.com/YOUR-USERNAME/aegis-backend.git)