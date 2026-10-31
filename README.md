# Modern & Aesthetic Authentication & Dashboard App (React.js)

A professional, responsive, glassmorphic web application built with **React.js**, **React Router**, and **Vite**. Features the original modern authentication page and a matching executive Dashboard UI with key metrics, statistics cards, and real-time activity feeds.

---

## 🚀 Features

### 🔐 Authentication (`/login`)
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
- **Seamless Route Transition**: Successful login immediately redirects the user to `/dashboard`.

### 📊 Modern Dashboard (`/dashboard`)
- **Responsive Sidebar Navigation** (`<Sidebar />`):
  - Brand header with glowing logo and version badge
  - Navigation categories ("Main Menu", "Workspace") with active glow indicator
  - Navigation links: Dashboard, Analytics, Projects, Tasks, Users, Notifications, Settings
  - Interactive notification count badges
  - Mobile drawer slide-in with backdrop blur overlay
  - User profile section with avatar, online status indicator, and Logout action
- **Top Navbar** (`<Navbar />`):
  - Mobile drawer hamburger toggle
  - Global search bar with `⌘K` keyboard shortcut pill
  - Quick action "+ New Project" button
  - Notification icon with unread alert badge counter (`4`)
  - User profile dropdown with account links and Sign Out button
- **Welcome Hero Banner**:
  - Personalized greeting ("Welcome back, Alex Morgan 👋")
  - System status indicator pill
  - Date chip and "Export Report" action
- **Dashboard Metric Cards** (`<DashboardCard />`):
  - **Total Users**: `24,892` (+14.2% vs last month, Indigo theme)
  - **Active Projects**: `48` (+6 this week, Purple theme)
  - **Pending Tasks**: `142` (89% completed, Emerald theme)
  - **Notifications**: `18` (4 urgent, Rose theme)
  - Animated progress bars and trend indicators
- **Recent Activity Feed** (`<RecentActivity />`):
  - Categorized feed with avatar initials, action descriptions, timestamps, and status pills
  - Category filter tabs: All, Project, Task, Security, Team
- **Active Projects Overview**:
  - Milestone progress bars, task counts, and sprint deadlines
- **Responsive Design**: Clean layout across Desktop (1200px+), Tablet (768px-1024px), and Mobile (<768px).

---

## 📂 Project Structure

```
modern-login-page/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx               # Responsive navigation sidebar
│   │   ├── Navbar.jsx                # Top header bar with search & profile dropdown
│   │   ├── DashboardCard.jsx         # Reusable KPI metric card component
│   │   ├── RecentActivity.jsx        # Real-time activity feed with filter tabs
│   │   ├── LoginForm.jsx             # Main Auth Card form component
│   │   ├── ForgotPasswordModal.jsx   # Reset password modal dialog
│   │   └── ToastContainer.jsx        # Floating animated toast notifications
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx             # Login / Sign-up page view (/login)
│   │   └── DashboardPage.jsx         # Full dashboard page view (/dashboard)
│   │
│   ├── styles/
│   │   ├── dashboard.css             # Dashboard layout, sidebar, cards, activity styles
│   │   └── login.css                 # Login page glassmorphism & authentication styles
│   │
│   ├── App.jsx                       # Client-side router configuration (/login & /dashboard)
│   └── main.jsx                      # React 18 root mounting file
│
├── index.html                        # Vite HTML entry point (Plus Jakarta Sans font)
├── vite.config.js                    # Vite React configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

---

## 💻 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`. You can navigate between:
- **`http://localhost:5173/login`**
- **`http://localhost:5173/dashboard`**

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
