
# 📚 BookLeaf — Author Support & Communication Portal

A full-stack **Author Support & Communication Portal** built for authors and publishing support teams.

The platform provides a centralized place for authors to manage their books, submit support queries, track tickets, and communicate with administrators. Admins can manage tickets, respond to authors, add internal notes, and use AI-assisted responses.

<img width="1523" height="726" alt="Screenshot 2026-10-03 141304" src="https://github.com/user-attachments/assets/31c2d42b-02e2-4731-bd80-2bf1bbad0aba" />
<img width="1522" height="727" alt="Screenshot 2026-10-03 141319" src="https://github.com/user-attachments/assets/e28651c9-1991-4d48-8325-63697e805331" />
<img width="1517" height="727" alt="Screenshot 2026-10-03 141333" src="https://github.com/user-attachments/assets/3cc8d214-ab8f-48e0-9ef1-9be31de37322" />

## ✨ Features

### Author

* Secure login and authentication
* View and manage books
* Submit support tickets
* Track ticket status
* Reply to existing tickets
* View conversation history

### Admin

* Admin dashboard
* View and manage support tickets
* Filter tickets by status and priority
* Respond to authors
* Add internal notes
* AI-powered ticket classification
* AI-generated response drafts

## 🤖 AI Integration

Google Gemini API is used to:

* Categorize support tickets
* Determine ticket priority
* Generate response suggestions
* Understand conversation context when an author replies

AI only assists the admin; the final response is reviewed and sent by the support team.

## 🛠️ Tech Stack

**Frontend:** React.js, TypeScript, Tailwind CSS, React Router, Axios

**Backend:** Node.js, Express.js, TypeScript, REST APIs

**Database:** MongoDB, Mongoose

**Authentication:** JWT, bcrypt

**AI:** Google Gemini API

**Deployment:** Vercel, Render

## ⚙️ Run Locally

Clone the repository:

```bash
git clone https://github.com/tulsishuka/BookLeaf.git
cd BookLeaf
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Never commit `.env` files or API keys to GitHub.

## 🎯 Problem I Solved

Authors often need to contact different people or send multiple messages to get updates about their books, royalties, ISBN, printing, or distribution.

I built this portal to **centralize author support into one structured system** where authors can track their requests and conversations, while admins can manage tickets efficiently and use AI to reduce repetitive support work.

## 👩‍💻 Developer

**Tulasi Shukla**

GitHub: https://github.com/tulsishuka

LinkedIn: https://www.linkedin.com/in/tulsishukla/
