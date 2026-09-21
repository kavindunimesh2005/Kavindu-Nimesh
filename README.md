# ⚡ Kavindu Nimesh — 2026 Developer Portfolio & CMS

> **Award-winning digital portfolio experience and real-time CMS designed for Kavindu Nimesh, Software Engineer & Web Developer, Founder of Aura Digital Developer Sri Lanka.**

---

## 🌟 Visual Identity & Design Direction

- **Obsidian Black**: `#050505` (Deep void dark surface)
- **High-Contrast Pure White**: `#FFFFFF` (Editorial typography)
- **Surgical Laser Red**: `#E50914` (Halo glows, laser lines, active indicators)
- **Editorial Typography**: Syne, Space Grotesk, Plus Jakarta Sans & JetBrains Mono
- **Aesthetic**: Futuristic dark digital studio, film grain texture, velocity-tracked magnetic cursor, interactive canvas particle grid, card tilt 3D perspectives, and micro-audio feedback.

---

## 🚀 Key Features

### 1. Public Experience
- **Initial Preloader**: Minimalist "KN." monogram with precision red laser loader and numeric percentage counter.
- **Floating Sticky Glass Navbar**: Compact pill transformation on scroll, reading progress indicator, sound toggle, dark/light theme switch, and mobile drawer.
- **Hero Section**: Large editorial headline *"i'm building digital experiences"*, live availability pill badge, mouse-reactive geometric node network canvas, and social channels.
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

## 📡 REST API Documentation

### Public Endpoints
- `GET /api/health` — API service health check
- `GET /api/public/portfolio` — Single aggregated payload for instant first-paint
- `GET /api/public/projects/:slug` — Single project case study with previous/next navigation
- `POST /api/public/contact` — Submit inquiry from contact form

### Auth Endpoints
- `POST /api/auth/login` — Authenticate admin and receive JWT token
- `GET /api/auth/verify` — Validate active session
- `POST /api/auth/change-password` — Update admin credentials

### Protected Admin Endpoints (`Bearer <token>` required)
- `GET /api/admin/dashboard` — Metric counts and recent activity
- `GET|POST /api/admin/projects` — List or create project
- `PUT|DELETE /api/admin/projects/:id` — Update or delete project
- `GET|POST /api/admin/services` — List or create service
- `PUT|DELETE /api/admin/services/:id` — Update or delete service
- `GET|POST /api/admin/skills` — List or create skill
- `PUT|DELETE /api/admin/skills/:id` — Update or delete skill
- `GET|POST /api/admin/experiences` — List or create experience entry
- `PUT|DELETE /api/admin/experiences/:id` — Update or delete experience
- `GET|POST /api/admin/testimonials` — List or create testimonial
- `PUT|DELETE /api/admin/testimonials/:id` — Update or delete testimonial
- `GET|PUT /api/admin/about` — Read or update profile bio and live statistics
- `GET|PUT /api/admin/socials` — Read or update social media links
- `GET /api/admin/messages` — Read all incoming inquiries
- `PUT /api/admin/messages/:id/read` — Toggle read/unread status
- `DELETE /api/admin/messages/:id` — Delete message
- `POST /api/upload` — Multipart form-data image upload (returns static image URL)

---

## 🎨 Architectural Design Highlights

1. **Velocity-Interpolated Magnetic Cursor**: Smooth trailing dot and expanding fluid ring that dynamically tags interactive elements with "VIEW" and expands over action buttons.
2. **Audio Feedback**: Subtle, non-intrusive futuristic sine/triangle oscillator clicks generated purely in browser memory with zero external assets.
3. **Scrollspy Navigation**: Floating glass navbar detects active viewport section, computes reading progress, and provides smooth anchor jumping.
4. **Resilient Data Architecture**: All changes made in the Admin CMS persist across server restarts and immediately update the public portfolio website.

---
© 2026 **Kavindu Nimesh** — Founder, **Aura Digital Developer Sri Lanka**.
