import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from './lib/router';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { Cursor } from './components/ui/Cursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Loader } from './components/ui/Loader';
import { PageTransition, RouteWipe } from './components/transitions/PageTransition';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { AiPage } from './pages/AiPage';
import { WorkPage } from './pages/WorkPage';
import { ApproachPage } from './pages/ApproachPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** New route, new page: start at the top, behind the ink wipe. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Chrome() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-loader focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <ScrollProgress />
      <RouteWipe />
      <ScrollToTop />
      <main id="main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/ai" element={<AiPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/approach" element={<ApproachPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  // First load only, and only on the front door: arriving at /services from a
  // search result should not cost two seconds before any content appears.
  const [loading, setLoading] = useState(
    () => typeof window !== 'undefined' && window.location.pathname === '/',
  );

  return (
    <BrowserRouter>
      {loading ? <Loader onDone={() => setLoading(false)} /> : null}
      <Chrome />
    </BrowserRouter>
  );
}
