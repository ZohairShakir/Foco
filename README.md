# FinSight — Finance Dashboard

> A clean, interactive personal finance dashboard built with React.

![FinSight Preview](https://via.placeholder.com/1200x630/080C18/00D9A3?text=FinSight+Finance+Dashboard)

## 🚀 Live Demo

**[→ View Live on Vercel](#)** *(replace with your deployment URL)*

---

## 📦 Tech Stack

| Layer           | Choice                        |
|----------------|-------------------------------|
| Framework       | React 18 + Vite               |
| State Management| React Context + useReducer    |
| Charts          | Recharts                      |
| Styling         | Custom CSS (design tokens)    |
| Persistence     | localStorage                  |
| Data            | Static mock data (~90 tx)     |

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

### Deploy to Vercel (one click)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repo — Vercel auto-detects Vite
4. Click Deploy ✅

---

## ✨ Features
Foco is packed with essential tools for peak productivity:
- 🔐 **Secure Authentication** — JWT-based authentication with bcrypt password hashing for maximum security.
- 📋 **Seamless Task Management** — Full CRUD (Create, Read, Update, Delete) operations with a focus on speed.
- 🎯 **Priority Intelligence** — Color-coded levels (Low, Medium, High) to help you tackle what matters most.
- 📅 **Deadline Tracking** — Integrated due dates to keep your projects on schedule.
- 📊 **Visual Analytics** — A dynamic dashboard showing real-time stats for completed vs. pending tasks.
- 🔎 **Smart Filtering** — Instantly toggle between All, Completed, and Pending tasks to reduce cognitive load.
- ⚡ **Modern UX** — Smooth transitions, toast notifications, and loading states for a premium app feel.

---

## 🧱 Tech Stack

### Frontend
- **React (Vite)** — For a blazing fast, component-based user interface.
- **Tailwind CSS** — Utility-first styling for a custom, responsive design system.
- **shadcn/ui** — Radix-based accessible components for consistent UI patterns.
- **Lucide Icons** — Beautifully crafted, consistent iconography.

### Backend
- **Node.js & Express.js** — A scalable, RESTful API architecture with clean separation of concerns.

### Database
- **MongoDB (Mongoose)** — Flexible, document-oriented data storage for complex task schemas.

### Authentication
- **JWT + bcrypt** — Industry-standard security for stateless authentication and data protection.

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 📸 Screenshots

![Dashboard Overview](https://via.placeholder.com/1200x600/0a0c14/ffffff?text=Foco+Dashboard+UI)
*The modern dark-navy dashboard featuring task stats and priority-coded lists.*

![Authentication Page](https://via.placeholder.com/1200x600/0a0c14/ffffff?text=Foco+Auth+UI)
*The sleek split-layout login/signup system.*

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/focusboard.git
cd focusboard
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `/backend` folder:
   ```env
   NODE_ENV = development
   PORT = 5000
   MONGO_URI = your_mongodb_connection_string
   JWT_SECRET = your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` to see the app in action.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contact
Your Name - [@yourhandle](https://twitter.com/yourhandle) - email@example.com
Project Link: [https://github.com/yourusername/focusboard](https://github.com/yourusername/focusboard)
