# ⚡ Kavindu Nimesh — 2026 Developer Portfolio & CMS

> **Award-winning digital portfolio experience and real-time CMS designed for Kavindu Nimesh, Software Engineer & Web Developer, Founder of Aura Digital Developer Sri Lanka.**

---

## 🌟 Visual Identity & Design Direction

- **Obsidian Black**: `#050505` (Deep void dark surface)
- **High-Contrast Pure White**: `#FFFFFF` (Editorial typography)
- **Surgical Laser Red**: `#E50914` (Halo glows, laser lines, active indicators)
- **Editorial Typography**: Bebas Neue, Syne, Space Grotesk, Plus Jakarta Sans & JetBrains Mono
- **Aesthetic**: Futuristic dark digital studio, technical grid, velocity-tracked magnetic cursor, interactive rotating 3D polyhedron canvas, card tilt 3D perspectives, and micro-audio feedback.

---

## 🚀 Key Features

### 1. Public Experience
- **Initial Preloader**: Minimalist "KN." monogram with precision red laser loader and numeric percentage counter.
- **Floating Sticky Glass Navbar**: Centered pill navbar with `• KN`, clean active section underline under `Home`, bordered `Resume` button, and `☀️` theme toggle.
- **Hero Section**: 
  - **Header Meta Row**: `Kavindu Nimesh` ─── `Software Engineer & Web Developer` ─── `Founder, Aura Digital Developer Sri Lanka`.
  - **Giant Editorial Headline**: Stacked tall condensed Bebas Neue typography (`BUILDING`, `DIGITAL`, `EXPERIENCES■` with a solid surgical red square period).
  - **Narrative Bio**: Left-aligned high-impact copy describing problem-solving for real businesses.
  - **Refined Action Buttons**: Red solid primary button `View my work ↗` and dark bordered button `Let's work together`.
  - **Bottom Controls**: Left vertical red line with `SCROLL` indicator, and right row of sleek square outline social buttons (GitHub, LinkedIn, Fiverr, TikTok, Email, WhatsApp).
  - **Right 3D Geometric Polyhedron**: Interactive rotating red wireframe polyhedron with glowing vertices and fine structural lines.
- **About Section**: Editorial 3+ years experience presentation, portrait photo with chromatic aberration / laser scan effect on hover, and live database-fed stats (Years, Projects, Tech, Clients).
- **Services Section**: 6 interactive capability cards with indices `01` - `06`, Lucide icons, tech stack tags, and hover elevation.
- **Featured Projects Showcase**: Editorial magazine cards with image zoom, category filter pills (All, E-Commerce, Admin Dashboards, Custom Web Applications), and direct links to live sites and GitHub.
- **Dedicated Case Study Pages (`/projects/:slug`)**: Full storytelling case study with Overview, Challenge, Solution, Key Features, Gallery, Tech Stack, Measurable Results, and Client Feedback.
- **Interactive Bento Skills Grid**: Categorized by Frontend, Backend, Database, Tools, and Design with dynamic proficiency meters.
- **Experience Timeline**: Vertical glowing red timeline with milestone nodes and responsibilities.
- **Client Testimonials**: Authentic feedback slider with star ratings and client avatars.
- **Interactive Contact Section**: Proposal form with Project Type selector, Budget ranges, direct WhatsApp and Email shortcuts, and confetti celebration upon transmission.

### 2. Admin CMS (`/admin`)
- **JWT & Bcrypt Security**: Password-hashed session authentication protecting all management routes.
- **Metrics Dashboard**: Real-time count of total projects, services, testimonials, experience entries, and unread inquiries.
- **Projects Manager**: Full CRUD, image upload (via Multer), category assignment, case study challenge/solution text, features array, and publish/featured toggles.
- **Services Manager**: Full CRUD for all 6 service offerings, icon selectors, and tech arrays.
- **Skills Manager**: Full CRUD categorized across Frontend, Backend, Database, Tools, and Design.
- **Experience Manager**: Timeline entry editor for roles, companies, dates, and descriptions.
- **Testimonials Manager**: Full review editor with photo avatar uploads and 1-5 star ratings.
- **About & Stats Manager**: Live updates to bio paragraphs, portrait photo, resume link, and numerical counters.
- **Messages Inbox**: Review contact inquiries, mark as read/unread, delete, and 1-click email/WhatsApp replies.
- **Site & SEO Settings**: Custom Meta Title, Meta Description, Social handles, and Admin Password update.

---

## 🔐 Default Admin Credentials

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@kavindu.dev`
- **Password**: `Admin@2026!`

*(You can change your password anytime in the Admin Settings tab)*

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router DOM, Lucide React, Canvas Confetti |
| **Styling** | Vanilla Modern CSS Design System, Custom Keyframe Animations, Glassmorphism |
| **Backend** | Node.js, Express.js, JWT, Bcrypt.js, Multer |
| **Database** | Embedded Zero-Config Relational Store (default) + Full MySQL Support |

---

## 📦 Getting Started & Running Locally

### 1. Start Both Backend & Frontend
From the root directory:
```bash
# In terminal 1: Start Backend API (Port 5001)
cd server
npm start

# In terminal 2: Start Frontend Client (Port 5173)
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Database Options

### Default Mode: Zero-Config Embedded Database
The server runs out of the box with an embedded persistent database (`server/database/db.json`) that pre-loads all rich projects (Bharana Books, Ayu Care Ceylon, etc.), skills, testimonials, and statistics without needing any external database server.

### MySQL Production Mode
To connect to MySQL:
1. Open MySQL (e.g. phpMyAdmin, XAMPP, or MySQL CLI).
2. Import `server/database/schema.sql`.
3. In `server/.env`, update:
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kavindu_portfolio
```
4. Restart the server (`npm start`). The system will automatically use the MySQL database!

---
© 2026 **Kavindu Nimesh** — Founder, **Aura Digital Developer Sri Lanka**.
