<div align="center">

  <h1 align="center">HIREHUB</h1>

  <p align="center">
    <strong>The Minimal, AI-Driven Recruitment Platform for Visionaries and Elite Talent/strong>
  </p>

  <p align="center">
    <a href="https://hirehub-app-blush.vercel.app/">View Live Demo</a>
    ·
    <a href="#-features">Key Features</a>
    ·
    <a href="#-getting-started">Getting Started</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Framer_Motion-Animation-EA4C89?style=for-the-badge&logo=framer" alt="Framer Motion" />
  </p>
</div>

---

## 🚀 Introduction

**HireHub** is not just another job board. It is a premium, next-generation recruitment platform designed to connect top-tier talent with forward-thinking companies. Built with a focus on **aesthetics**, **interactivity**, and **performance**, HireHub leverages the latest web technologies to provide a seamless hiring experience.

Experience a fluid interface powered by **Framer Motion**, ultra-modern designs with **Glassmorphism**, and a robust backend built on **Next.js 16** and **MongoDB**.

## ✨ Features

### 🎨 **Premium User Experience**
- **Interactive UI**: Smooth page transitions and micro-interactions powered by Framer Motion.
- **Glassmorphism Design**: A modern, sleek aesthetic with blurry glass backgrounds and vibrant gradients.
- **Responsive Layout**: meaningful experiences across all devices, from oversized desktops to mobile phones.

### 👥 **Role-Based Access Control**
HireHub provides tailored experiences for different user roles:
- **Candidates**:
  - Browse and search for curated job openings.
  - Apply with a single click and track application status.
  - Personalized dashboard to manage profile and applications.
- **Recruiters**:
  - Post and manage job listings with rich details.
  - Review incoming applications and candidate profiles.
  - Streamlined workflow to accept or reject candidates.

### 🛡️ **Security & Performance**
- **Secure Authentication**: Robust JWT-based authentication system with Bcrypt password hashing.
- **Server-Side Rendering**: Optimized for SEO and fast initial load times using Next.js App Router.
- **Type Safety**: Built with strict typing for reliability and maintainability.

## 🛠️ Tech Stack

<details>
  <summary><strong>Frontend</strong></summary>

  - **[Next.js 16](https://nextjs.org/)**: The React Framework for the Web.
  - **[React 19](https://reactjs.org/)**: A JavaScript library for building user interfaces.
  - **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
  - **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React.
  - **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icon toolkit.

</details>

<details>
  <summary><strong>Backend & Database</strong></summary>

  - **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)**: Serverless functions to handle backend logic.
  - **[MongoDB](https://www.mongodb.com/)**: The most popular database for modern apps.
  - **[Mongoose](https://mongoosejs.com/)**: Elegant MongoDB object modeling for Node.js.
  - **[JSON Web Token (JWT)](https://jwt.io/)**: Compact URL-safe means of representing claims to be transferred between two parties.
  - **[Bcrypt.js](https://www.npmjs.com/package/bcryptjs)**: Library to help you hash passwords.

</details>

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm**
- **MongoDB** (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saravanakumar2602/hirehub.git
   cd hirehub-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database Connection
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hirehub

   # Authentication Secret
   JWT_SECRET=your_super_secret_jwt_key_here

   # Next.js Public URL (Optional)
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

Here's a quick overview of the project's file structure:

```
recruitment-frontend/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (Backend logic)
│   ├── dashboard/        # Role-specific dashboard pages
│   ├── jobs/             # Job listing and details pages
│   ├── login/            # Authentication pages
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
├── lib/                  # Utility functions (DB connection, Auth)
├── models/               # Mongoose Data Models (User, Job, Application)
├── public/               # Static assets
└── styles/               # Global styles
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/Saravanakumar2602/hirehub](https://github.com/Saravanakumar2602/hirehub)
Live Demo: [https://hirehub-app-blush.vercel.app/](https://hirehub-app-blush.vercel.app/)

---
