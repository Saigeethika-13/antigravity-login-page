# Modern & Aesthetic Login Page (React.js)

A modern, responsive, glassmorphic login and sign-up web application built with **React.js** and **Vite**, converted directly from the original HTML/CSS/JavaScript implementation with 100% design and functional fidelity.

---

## 🚀 Features

- **Modern Glassmorphism UI**: Dark theme with ambient glowing background orbs (`orb-1`, `orb-2`, `orb-3`) and frosted glass card with subtle border glow.
- **Interactive Sign In & Sign Up Modes**: Smooth toggle between Sign In and Sign Up views using React state.
- **Show / Hide Password**: Toggle password visibility with SVG eye and eye-off icons.
- **Form Validation & Real-time Feedback**:
  - Full Name validation (Sign Up mode)
  - Email / Username validation (regex & minimum length check)
  - Password validation (minimum 6 characters)
  - Confirm Password matching validation (Sign Up mode)
  - Real-time error clearing as the user types
- **Forgot Password Modal**: Accessible popup modal dialog with email validation, backdrop-click dismiss, and `Escape` key support.
- **Toast Notification System**: Dynamic floating toast notifications for Success, Error, and Info states with auto-dismiss timers.
- **Social Login Placeholders**: Styled Google and GitHub authentication buttons with interactive toast feedback.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports.

---

## 📂 Project Structure

```
modern-login-page/
│
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx             # Main Auth Card form component
│   │   ├── ForgotPasswordModal.jsx   # Reset password modal dialog
│   │   └── ToastContainer.jsx        # Floating animated toast notifications
│   ├── App.jsx                       # Top-level shell: background decor, modal & toast states
│   ├── main.jsx                      # React entry point
│   └── styles.css                    # Complete CSS design system and theme tokens
│
├── index.html                        # Vite HTML entry point (Plus Jakarta Sans font)
├── index.original.html               # Preserved original HTML markup
├── script.js                         # Preserved original vanilla JavaScript
├── styles.css                        # Preserved original CSS stylesheet
├── vite.config.js                    # Vite React configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

---

## 💻 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at the local URL provided by Vite (typically `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
