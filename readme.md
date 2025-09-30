# EcoMarket

**A modern, sustainable e‑commerce platform focused on eco-friendly brands and products.**

> *Tagline:* EcoMarket — an eco-friendly e‑commerce platform built with the MERN stack. Secure JWT authentication, image uploads with Multer, and an admin panel for management.

---

## Table of Contents

* [Highlights & Goals](#highlights--goals)
* [Tech Stack](#tech-stack)
* [Core Features](#core-features)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Environment Variables](#environment-variables)
  * [Install & Run (Local)](#install--run-local)
  * [Run with Docker (Optional)](#run-with-docker-optional)
* [API Overview](#api-overview)
* [Image Uploads (Multer)](#image-uploads-multer)
* [Authentication & Authorization](#authentication--authorization)
* [Admin Panel](#admin-panel)
* [Testing](#testing)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## Highlights & Goals

* 🌱 Promote eco-friendly products and transparent sourcing
* 🔒 Secure user authentication with JWT
* 🖼️ Image uploads handled with Multer (local or cloud adapter)
* 📦 Full RESTful backend for products, carts, orders, users, and admin actions
* 🧾 Admin panel for product management, order fulfillment, and analytics
* ♻️ Lightweight, performant frontend (React + Tailwind)

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, React Router
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Auth:** JSON Web Tokens (JWT)
* **Image Storage:** Multer (local filesystem or cloud — S3, Cloudinary adapters)
* **Payments:** Stripe / Razorpay (pluggable)
* **Dev / Deploy:** Docker (optional), PM2, Vercel/Netlify (frontend), Render/Heroku/DigitalOcean (backend)

## Core Features

* User signup/login (JWT)
* User profile with order history
* Product listing with categories and tags (e.g. `zero-waste`, `organic`)
* Cart & checkout flow
* Orders, payments, and order status tracking
* Reviews & ratings
* Admin panel: add/edit/remove products, manage orders, view sales dashboard
* Role-based authorization (user vs admin)