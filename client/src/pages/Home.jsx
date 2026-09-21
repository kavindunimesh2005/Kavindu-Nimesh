import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Skills from '../components/home/Skills';
import Experience from '../components/home/Experience';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';
import Footer from '../components/common/Footer';
import Preloader from '../components/common/Preloader';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await api.getPortfolio();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <div style={{ opacity: showPreloader ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Navbar resumeUrl={data?.about?.resume_url} />
        
        <main>
          <Hero about={data?.about} socials={data?.socials} />
          <About about={data?.about} />
          <Services services={data?.services} />
          <FeaturedProjects projects={data?.projects} />
          <Skills skills={data?.skills} />
          <Experience experiences={data?.experiences} />
          <Testimonials testimonials={data?.testimonials} />
          <Contact settings={data?.settings} socials={data?.socials} />
        </main>

        <Footer about={data?.about} socials={data?.socials} />
      </div>
    </>
  );
}
