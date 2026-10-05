# 📚 BookLeaf — Author Support & Communication Portal

A full-stack **Author Support & Communication Portal** designed to make communication between authors and a publishing support team easier, more organized, and more transparent.

The platform provides separate experiences for **Authors** and **Administrators**. Authors can manage their books, track book-related information, submit support requests, and communicate with the publishing team. Administrators can manage tickets, respond to authors, add internal notes, and use AI-assisted response generation to handle support requests more efficiently.

## 🚀 Live Project

**Live Demo:**
https://book-leaf-nu.vercel.app/

**GitHub Repository:**
https://github.com/tulsishuka/BookLeaf

---

## ✨ About the Project

Publishing a book involves many different stages, including editing, production, ISBN and metadata management, printing, distribution, royalties, and communication between authors and the publishing team.

The goal of this project was to create a centralized portal where authors don't have to depend on scattered emails or informal communication to understand the status of their books or get help with their problems.

The portal brings these interactions into one place.

### The platform provides:

* Author dashboard
* Book management and book information
* Support ticket creation
* Ticket status tracking
* Author-admin communication
* Admin ticket management
* AI-powered ticket classification
* AI-generated response drafts
* Internal admin notes
* Authentication and role-based access
* Responsive UI for different screen sizes

---

# 👤 How an Author Can Use the Platform

## 1. Create an Account / Login

An author can log into the platform using their account.

Authentication is handled using **JWT**, allowing protected author and admin areas.

After authentication, the user is redirected to the appropriate dashboard based on their role.

---

## 2. View the Author Dashboard

The author dashboard provides an overview of their publishing activity.

An author can see information related to:

* Their books
* Book status
* Support requests
* Recent communication
* Account information

This gives the author a central place to understand their current publishing activity.

---

## 3. View My Books

The **My Books** section allows an author to view their books and related information.

Depending on the book, information can include:

* Book title
* ISBN
* Publishing status
* Production status
* Distribution information
* Royalty-related information

This avoids the need for the author to repeatedly contact the publishing team just to ask about basic book information.

---

## 4. Submit a Support Query

If an author has a problem or question, they can create a support ticket.

For example:

> "I haven't received an update about my book's printing status."

or:

> "I have a question about my royalty payment."

The author can provide:

* Subject
* Description
* Related book
* Support request details

Once submitted, the request is stored in the backend.

---

## 5. AI-Assisted Ticket Classification

When a ticket is created, the system can use the **Google Gemini API** to analyze the request.

The AI can help identify:

* Ticket category
* Ticket priority
* Suggested response

For example:

```text
Category:
Royalty & Payments

Priority:
High

AI Draft:
Thank you for contacting us regarding your royalty payment.
Our support team will review your account and provide an update
after verifying the relevant information.
```

The AI response is intended as an **assistant for the support team**, not as an automatic final response.

---

## 6. Track the Ticket

After submitting a ticket, the author can view its status.

Possible statuses include:

* Open
* In Progress
* Resolved
* Closed

The author can open a ticket and view the conversation history.

---

## 7. Continue the Conversation

The author does not need to create a new ticket every time they want to provide additional information.

They can reply inside the existing ticket.

For example:

```text
Author:
I have attached the updated manuscript details.

Admin:
Thank you. We will review the information.

Author:
Could you also confirm whether the ISBN has been updated?
```

The conversation remains connected to the same support ticket.

---

# 🛠️ How an Admin Can Use the Platform

Administrators have a separate dashboard for managing author support.

## Admin Dashboard

The admin dashboard provides an overview of support activity, including:

* Total tickets
* Open tickets
* Critical tickets
* High-priority tickets
* Unassigned tickets
* Tickets in progress
* Recently resolved tickets
* Recent support requests

This helps the support team identify which requests require attention.

---

## 🎫 Ticket Management

Admins can open individual tickets and view:

* Author information
* Book information
* Ticket subject
* Description
* Category
* Priority
* Current status
* Conversation history
* AI-generated response draft

Admins can then decide how to respond.

---

## 🤖 AI Response Assistance

The system can generate a response draft based on the ticket and conversation.

The admin can:

1. Review the AI-generated response.
2. Edit the response.
3. Add their own information.
4. Send the final response.

The AI does **not** directly send messages to authors.

This keeps the human support team in control of communication.

---

## 📝 Internal Notes

Admins can add internal notes to a ticket.

These notes are intended for the support team and are separate from the conversation visible to the author.

This can help the team record things such as:

* Internal investigation details
* Follow-up information
* Team instructions
* Additional context

---

# 🔄 Ticket Workflow

The overall workflow looks like this:

```text
Author
   ↓
Creates Support Ticket
   ↓
Backend Validates Request
   ↓
AI Analyzes Ticket
   ↓
Category + Priority + Draft Response
   ↓
Ticket Stored in MongoDB
   ↓
Admin Reviews Ticket
   ↓
Admin Reviews/Edits AI Draft
   ↓
Admin Sends Response
   ↓
Author Receives Response
   ↓
Author Can Reply
   ↓
AI Generates Updated Draft
   ↓
Admin Continues Conversation
```

---

# 🧠 AI Integration

The project integrates the **Google Gemini API** to assist with support operations.

AI is currently used for tasks such as:

### Ticket Analysis

The system analyzes:

* Subject
* Description
* Author information
* Related book

and generates:

* Category
* Priority
* Draft response

### Conversation-Aware Drafting

When an author replies to an existing ticket, the system considers the conversation history and generates a new response suggestion for the administrator.

The AI is instructed to:

* Focus on the author's latest message
* Use previous messages as context
* Avoid inventing policies
* Avoid inventing payment dates
* Avoid making unsupported promises
* Keep responses professional and concise

AI is used as a productivity tool while keeping the final communication under admin control.

---

# 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

Different roles have different access levels.

### Author

Authors can:

* View their own books
* Create tickets
* View their tickets
* Reply to their tickets
* View their account information

### Admin

Admins can:

* View support tickets
* Open individual tickets
* Respond to authors
* Add internal notes
* Update ticket status
* Manage support conversations

Protected backend routes use authentication and role-based middleware.

---

# 🏗️ Project Structure

```text
BookLeaf/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 💻 Tech Stack

## Frontend

* React.js
* TypeScript
* Tailwind CSS
* React Router
* Axios
* Lucide React

## Backend

* Node.js
* Express.js
* TypeScript
* REST APIs

## Database

* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

## AI

* Google Gemini API

## Tools & Deployment

* Git
* GitHub
* Vercel
* Render

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/tulsishuka/BookLeaf.git
```

```bash
cd BookLeaf
```

---

# Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

---

# Backend Setup

Open another terminal and go to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add your own environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

> **Important:** Never commit `.env` files or API keys to GitHub.

---

# 🔑 Environment Variables

| Variable         | Purpose                     |
| ---------------- | --------------------------- |
| `PORT`           | Backend server port         |
| `MONGODB_URI`    | MongoDB database connection |
| `JWT_SECRET`     | JWT authentication secret   |
| `GEMINI_API_KEY` | Google Gemini API key       |
| `VITE_API_URL`   | Frontend API URL            |

---

# 📱 Responsive Design

The interface is designed to work across different screen sizes.

The application supports:

* Desktop
* Laptop
* Tablet
* Mobile

The author and admin interfaces use responsive layouts so users can access important functionality from different devices.

---

# 🛡️ Error Handling & Reliability

The application includes backend validation and error handling for important operations.

For example:

* Invalid authentication
* Invalid book IDs
* Unauthorized book access
* Missing ticket information
* Unauthorized ticket access
* Invalid ticket IDs
* Closed ticket replies
* AI service failures

AI processing is treated as an assistance layer rather than a requirement for the core ticket system.

If the AI service is temporarily unavailable, the ticket can still be created using fallback category, priority, and response information.

This prevents an external AI service failure from breaking the main support workflow.

---

# 🎯 Problems I Solved

The main problem I wanted to solve was the **lack of a centralized communication and support workflow between authors and a publishing team**.

In a traditional publishing workflow, an author may need to contact different people or send multiple messages to get answers about:

* Book status
* ISBN
* Printing
* Distribution
* Royalties
* Metadata
* General publishing questions

This can make communication difficult to track and can also create additional work for the support team.

### My solution

I built a centralized portal where:

**Authors can:**

* Manage and view their books
* Submit support requests
* Track ticket status
* Continue conversations
* Get transparent updates

**Admins can:**

* Manage support requests from one dashboard
* Prioritize important tickets
* Respond to authors
* Maintain internal notes
* Track conversations
* Use AI to assist with ticket classification and response drafting

### The biggest improvement

Instead of treating every author question as a separate email or message, the system turns the interaction into a **structured support ticket with a complete conversation history**.

The AI layer then helps reduce repetitive support work by suggesting categories, priorities, and response drafts while keeping the final decision with the human administrator.

---

# 📌 What I Learned

While building this project, I worked with:

* Full-stack application architecture
* React and TypeScript
* REST API development
* MongoDB data modeling
* Mongoose relationships and queries
* JWT authentication
* Role-based authorization
* Frontend/backend integration
* Ticket and conversation systems
* AI API integration
* Error handling
* Responsive UI development
* Deployment
* Git and GitHub workflows

---

# 🚧 Future Improvements

Some features that could be added in future versions:

* Email notifications
* File and document attachments
* Advanced ticket filtering
* Ticket search
* Admin assignment system
* Notification center
* Analytics and reporting
* More detailed royalty tracking
* Real-time communication using WebSockets
* More advanced AI support analytics

---

# 👩‍💻 Developer

**Tulasi Shukla**

Full Stack Developer

GitHub:
https://github.com/tulsishuka

LinkedIn:
https://www.linkedin.com/in/tulsishukla/

---

## ⭐ If you find this project interesting

Feel free to explore the repository, try the application, and share feedback.

Built with React, Node.js, MongoDB, and a lot of learning. ❤️
