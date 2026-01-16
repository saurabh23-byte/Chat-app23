# 💬 Chat Application (MERN + Socket.IO)

A full-stack **real-time chat application** built using **React, Redux, Node.js, Express, MongoDB, and Socket.IO**.
The app supports authentication, live messaging, online status tracking, and scalable backend architecture.

This project demonstrates **real-world full-stack development practices**, including modular backend design, custom React hooks, Redux state management, and WebSocket communication.

---

## 🚀 Live Features

* 🔐 JWT-based user authentication (Signup / Login)
* 💬 Real-time one-to-one messaging using Socket.IO
* 🟢 Online / Offline user status
* 📜 Message persistence with MongoDB
* 🔄 Real-time message updates without refresh
* 🧠 Smart reply utility (frontend logic)
* 🎨 Responsive UI with Tailwind CSS
* ⚙️ Clean separation of frontend and backend

---

## 🛠️ Tech Stack

### Frontend

* React (Create React App)
* Redux Toolkit
* Tailwind CSS
* Socket.IO Client
* Axios
* Custom React Hooks

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO
* JWT Authentication
* Middleware-based architecture

---

## 📁 Project Structure

```
CHAT-APPLICATION/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── messageController.js
│   │   ├── statusController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── isAuthenticated.js
│   │
│   ├── models/
│   │   ├── conversationModel.js
│   │   ├── messageModel.js
│   │   ├── statusModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── messageRoute.js
│   │   ├── statusRoutes.js
│   │   └── userRoute.js
│   │
│   ├── socket/
│   │   └── socket.js
│   │
│   ├── index.js
│   ├── vercel.json
│   └── package.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── MessageContainer.jsx
│   │   │   ├── SendInput.jsx
│   │   │   ├── Status.jsx
│   │   │   └── OtherUsers.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useGetMessages.js
│   │   │   ├── useGetOtherUsers.js
│   │   │   └── useGetRealTimeMessages.js
│   │   │
│   │   ├── redux/
│   │   │   ├── messageSlice.js
│   │   │   ├── socketSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── utils/
│   │   │   └── smartReplies.js
│   │   │
│   │   ├── App.js
│   │   ├── config.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── tailwind.config.js
│   └── package.json
│
├── .env
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the **root directory**:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.paj9fml.mongodb.net/chat_app?retryWrites=true&w=majority
JWT_SECRET=your_strong_jwt_secret_here
```

⚠️ **Never commit `.env` to GitHub**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/chat-application.git
cd chat-application
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔄 Real-Time Communication Flow

1. User logs in → JWT generated
2. Socket connection established
3. User status updated (online/offline)
4. Messages emitted via Socket.IO
5. Redux store updates UI instantly
6. Messages stored in MongoDB

No refresh. No polling. Pure sockets.

---

## 🧠 Custom Hooks Explained

* `useGetMessages`
  Fetches chat history for selected conversation

* `useGetOtherUsers`
  Retrieves available users for chat

* `useGetRealTimeMessages`
  Listens to socket events and updates Redux store

---

## 📌 Security Practices

* Passwords hashed (bcrypt)
* JWT authentication middleware
* Protected routes
* Environment variables for secrets
* Clean API separation

---

## 🚧 Future Enhancements

* 👥 Group chats
* 📎 Image & file sharing
* ✔ Message read receipts
* 🔔 Notifications
* 🧑‍💻 Typing indicators
* 🌍 Deployment with CI/CD

---

## 👨‍💻 Author

**Saurabh Kumar**
B.Tech CSE
GitHub: [https://github.com/your-username](https://github.com/your-username)

---



