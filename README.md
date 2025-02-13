# Real-Time Chat Application

This is a real-time chat application built using **MERN stack** with **Socket.io** for real-time communication and **Bootstrap** for UI styling.

## 📌 Features
- 🔥 Real-time messaging using **Socket.io**
- ✅ Message persistence with **MongoDB**
- ✍️ Typing indicator
- 📜 Chat history storage
- 🎨 Responsive UI with **Bootstrap**
- 🔄 Message read/unread status

---
## 🛠 Tech Stack
### **Frontend**
- React.js (Context API for WebSocket management)
- Bootstrap & React-Bootstrap
- Axios for API calls

### **Backend**
- Node.js with Express.js
- MongoDB with Mongoose
- Socket.io for real-time communication

---
## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/shubhamghadge20/Real-Time-Chat-Application.git
```
```
 cd Real-Time-Chat-Application
```

### **2️⃣ Install Dependencies**
#### **Backend**
```sh
 cd backend
 npm install
```
#### **Frontend**
```sh
 cd frontend
 npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the **backend** directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### **4️⃣ Start the Application**
#### **Start Backend**
```sh
 cd backend
 npm start
```
#### **Start Frontend**
```sh
 cd frontend
 npm start
```

---
## 📂 Project Structure
```
frontend/
│── src/
│   ├── components/
│   │   ├── Chat.js            # Chat UI component
│   │   ├── MessageBubble.js    # Message bubble component
│   ├── context/
│   │   ├── SocketContext.js    # WebSocket context
│   ├── App.js                 # Main React component
│   ├── index.js               # Entry point
│── package.json

backend/
│── models/
│   ├── Message.js             # Message Schema
│── routes/
│   ├── messages.js            # Message API routes
│── socket/
│   ├── index.js               # WebSocket server logic
│── config/
│   ├── db.js                  # MongoDB connection
│── server.js                  # Main backend file
│── package.json
```

---
## 📡 API Endpoints
### **Messages API** (`/messages`)
- `POST /` → Save a new message
- `GET /` → Retrieve all messages
- `PUT /:id/read` → Mark message as read

---
## 💡 How It Works
1. **User enters the chat room**
2. **Messages are fetched from MongoDB**
3. **User sends a message** → Stored in DB & broadcast via **Socket.io**
4. **Other users receive the message in real-time**
5. **Typing status updates in real-time**


