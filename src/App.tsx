import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ListingCard } from './components/common/ListingCard';
import { HomePage } from './pages/HomePage';
import { CategoryListPage } from './pages/CategoryListPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ListingDetailPage } from './pages/ListingDetailPage';
import { SearchPage } from './pages/SearchPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FounderPage } from './pages/FounderPage';
import { SitemapPage } from './pages/SitemapPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ManagerOwnerDashboard } from './pages/dashboard/ManagerOwnerDashboard';
import { TechAdminDashboard } from './pages/dashboard/TechAdminDashboard';
import { EditorDashboard } from './pages/dashboard/EditorDashboard';
import { BookInquiryModal } from './components/modals/BookInquiryModal';
import { CallActionModal } from './components/modals/CallActionModal';
import { WhatsAppActionModal } from './components/modals/WhatsAppActionModal';
import { AdminAuthModal } from './components/modals/AdminAuthModal';
import { InquiryNotificationToast } from './components/modals/InquiryNotificationToast';
import { Listing, AdminRole } from './types';
import { getCategoryBySlug } from './data/categories';

function MainApp() {
  const {
    listings,
    currentAdminUser,
    activeInquiryNotification,
    dismissInquiryNotification,
    loginAs
  } = useApp();

  // Navigation State
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [searchParams, setSearchParams] = useState<{ query: string; category: string }>({
    query: '',
    category: 'all'
  });

  // Modals
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [modalListing, setModalListing] = useState<Listing | null>(null);

  // Sync route changes with window URL hash/state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === '') {
        setCurrentRoute('home');
      } else if (hash.startsWith('listing/')) {
        const slug = hash.replace('listing/', '');
        const found = listings.find(l => l.slug === slug);
        if (found) {
          setActiveListing(found);
          setCurrentRoute(`listing:${slug}`);
        } else {
          setCurrentRoute('home');
        }
      } else if (hash.startsWith('category/')) {
        const catSlug = hash.replace('category/', '');
        setCurrentRoute(`category:${catSlug}`);
      } else if (hash.startsWith('search')) {
        const queryParams = new URLSearchParams(hash.split('?')[1] || '');
        setSearchParams({
          query: queryParams.get('q') || '',
          category: queryParams.get('category') || 'all'
        });
        setCurrentRoute('search');
      } else {
        setCurrentRoute(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [listings]);

  const navigateTo = (route: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route === 'home') {
      window.location.hash = '';
      setCurrentRoute('home');
    } else if (route.startsWith('category:')) {
      const slug = route.replace('category:', '');
      window.location.hash = `category/${slug}`;
      setCurrentRoute(route);
    } else if (route.startsWith('listing:')) {
      const slug = route.replace('listing:', '');
      window.location.hash = `listing/${slug}`;
      setCurrentRoute(route);
    } else if (route.startsWith('search')) {
      const parts = route.split('?');
      if (parts[1]) {
        const params = new URLSearchParams(parts[1]);
        setSearchParams({
          query: params.get('q') || '',
          category: params.get('category') || 'all'
        });
      }
      window.location.hash = route;
      setCurrentRoute('search');
    } else {
      window.location.hash = route;
      setCurrentRoute(route);
    }
  };

  const handleSelectListing = (listing: Listing) => {
    setActiveListing(listing);
    navigateTo(`listing:${listing.slug}`);
  };

  const handleOpenCallModal = (listing: Listing) => {
    setModalListing(listing);
    setIsCallModalOpen(true);
  };

  const handleOpenWhatsAppModal = (listing: Listing) => {
    setModalListing(listing);
    setIsWhatsAppModalOpen(true);
  };

  const handleOpenBookModal = (listing: Listing) => {
    setModalListing(listing);
    setIsBookModalOpen(true);
  };

  const handleAdminSuccess = (role: AdminRole) => {
    navigateTo('dashboard');
  };

  const handleSwitchDashboardRole = (role: AdminRole) => {
    loginAs(role);
  };

  // Render Dashboard if in dashboard route
  if (currentRoute === 'dashboard') {
    const role = currentAdminUser?.role || 'Manager/Owner';
    return (
      <DashboardLayout
        activeTab="dashboard"
        onSelectTab={() => {}}
        onExitDashboard={() => navigateTo('home')}
        onSwitchRole={handleSwitchDashboardRole}
      >
        {role === 'Manager/Owner' && (
          <ManagerOwnerDashboard onViewPublicListing={handleSelectListing} />
        )}
        {role === 'Technical Administrator' && <TechAdminDashboard />}
        {role === 'Editor' && (
          <EditorDashboard onViewPublicListing={handleSelectListing} />
        )}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Universal Top Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onOpenSearch={() => navigateTo('search')}
        onSelectServiceBooking={(catSlug) => navigateTo(`category:${catSlug}`)}
      />

      {/* Main Public Content */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectListing={handleSelectListing}
            onCall={handleOpenCallModal}
            onWhatsApp={handleOpenWhatsAppModal}
            onBook={handleOpenBookModal}
          />
        )}

        {currentRoute === 'categories' && (
          <CategoryListPage
            onSelectCategory={slug => navigateTo(`category:${slug}`)}
          />
        )}

        {currentRoute.startsWith('category:') && (
          <CategoryDetailPage
            categorySlug={currentRoute.replace('category:', '')}
            onBack={() => navigateTo('categories')}
            onSelectListing={handleSelectListing}
            onCall={handleOpenCallModal}
            onWhatsApp={handleOpenWhatsAppModal}
            onBook={handleOpenBookModal}
            onSelectCategory={slug => navigateTo(`category:${slug}`)}
          />
        )}

        {currentRoute.startsWith('listing:') && activeListing && (
          <ListingDetailPage
            listing={activeListing}
            onBack={() => navigateTo('home')}
            onNavigateCategory={catName => {
              const catObj = listings.find(l => l.category === catName);
              const found = getCategoryBySlug(catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              if (found) {
                navigateTo(`category:${found.slug}`);
              } else {
                navigateTo('categories');
              }
            }}
            onSelectListing={handleSelectListing}
            onCall={handleOpenCallModal}
            onWhatsApp={handleOpenWhatsAppModal}
            onBook={handleOpenBookModal}
          />
        )}

        {currentRoute === 'featured' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Curated Showcase
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
                Featured Products & Services
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore handpicked offerings currently highlighted by Philmen management.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings
                .filter(l => l.status === 'published' && l.featured)
                .map(item => (
                  <ListingCard
                    key={item.id}
                    listing={item}
                    onViewDetails={handleSelectListing}
                    onCall={handleOpenCallModal}
                    onWhatsApp={handleOpenWhatsAppModal}
                    onBook={handleOpenBookModal}
                  />
                ))}
            </div>
          </div>
        )}

        {currentRoute === 'search' && (
          <SearchPage
            initialQuery={searchParams.query}
            initialCategory={searchParams.category}
            onSelectListing={handleSelectListing}
            onCall={handleOpenCallModal}
            onWhatsApp={handleOpenWhatsAppModal}
            onBook={handleOpenBookModal}
          />
        )}

        {currentRoute === 'how-it-works' && (
          <HowItWorksPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'contact' && (
          <ContactPage />
        )}

        {currentRoute === 'the-founder' && (
          <FounderPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'sitemap' && (
          <SitemapPage
            onNavigate={navigateTo}
            onSelectListing={(slug) => {
              const item = listings.find(l => l.slug === slug);
              if (item) handleSelectListing(item);
            }}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
      />

      {/* Modals */}
      <BookInquiryModal
        listing={modalListing}
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      <CallActionModal
        listing={modalListing}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      <WhatsAppActionModal
        listing={modalListing}
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      {/* Real-time Email Dispatch Notification Toast */}
      <InquiryNotificationToast
        inquiry={activeInquiryNotification}
        onClose={dismissInquiryNotification}
        onOpenDashboard={() => {
          if (!currentAdminUser) {
            loginAs('Manager/Owner');
          }
          navigateTo('dashboard');
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
