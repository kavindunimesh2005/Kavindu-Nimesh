import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/common/CustomCursor';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AllProjects from './pages/AllProjects';
import NotFound from './pages/NotFound';

// Admin CMS
import { AuthProvider } from './admin/context/AuthContext';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProjects from './admin/pages/AdminProjects';
import AdminServices from './admin/pages/AdminServices';
import AdminSkills from './admin/pages/AdminSkills';
import AdminExperience from './admin/pages/AdminExperience';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminAbout from './admin/pages/AdminAbout';
import AdminMessages from './admin/pages/AdminMessages';
import AdminSettings from './admin/pages/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      {/* 2026 Magnetic Velocity Custom Cursor */}
      <CustomCursor />

      <AuthProvider>
        <Routes>
          {/* Public Portfolio Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* Admin CMS Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
