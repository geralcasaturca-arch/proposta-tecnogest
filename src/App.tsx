import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider, useApp } from './context/AppContext';
import { SEOHead } from './components/SEOHead';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { WhatsAppChatModal } from './components/WhatsAppChatModal';
import { ToastContainer } from './components/Toast';

// Lazy loading views
const HomeView = lazy(() => import('./views/HomeView').then(m => ({ default: m.HomeView })));
const CoursesView = lazy(() => import('./views/CoursesView').then(m => ({ default: m.CoursesView })));
const CourseDetailView = lazy(() => import('./views/CourseDetailView').then(m => ({ default: m.CourseDetailView })));
const EnrollmentView = lazy(() => import('./views/EnrollmentView').then(m => ({ default: m.EnrollmentView })));
const EnrollmentSuccessView = lazy(() => import('./views/EnrollmentSuccessView').then(m => ({ default: m.EnrollmentSuccessView })));
const PolosView = lazy(() => import('./views/PolosView').then(m => ({ default: m.PolosView })));
const AboutView = lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));

// Lazy loading admin views
const AdminLayout = lazy(() => import('./views/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboardView = lazy(() => import('./views/admin/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));
const AdminCoursesView = lazy(() => import('./views/admin/AdminCoursesView').then(m => ({ default: m.AdminCoursesView })));
const AdminCategoriesView = lazy(() => import('./views/admin/AdminCategoriesView').then(m => ({ default: m.AdminCategoriesView })));
const AdminLeadsView = lazy(() => import('./views/admin/AdminLeadsView').then(m => ({ default: m.AdminLeadsView })));
const AdminPolosView = lazy(() => import('./views/admin/AdminPolosView').then(m => ({ default: m.AdminPolosView })));
const AdminReviewsView = lazy(() => import('./views/admin/AdminReviewsView').then(m => ({ default: m.AdminReviewsView })));
const AdminSettingsView = lazy(() => import('./views/admin/AdminSettingsView').then(m => ({ default: m.AdminSettingsView })));

const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-4 text-primary">
      <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
      <span className="text-sm font-bold animate-pulse">A carregar...</span>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const isAdminView =
    currentView === 'admin' ||
    currentView === 'admin-courses' ||
    currentView === 'admin-categories' ||
    currentView === 'admin-leads' ||
    currentView === 'admin-polos' ||
    currentView === 'admin-reviews' ||
    currentView === 'admin-settings';

  const renderAdminView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminDashboardView />;
      case 'admin-courses':
        return <AdminCoursesView />;
      case 'admin-categories':
        return <AdminCategoriesView />;
      case 'admin-leads':
        return <AdminLeadsView />;
      case 'admin-polos':
        return <AdminPolosView />;
      case 'admin-reviews':
        return <AdminReviewsView />;
      case 'admin-settings':
        return <AdminSettingsView />;
      default:
        return <AdminDashboardView />;
    }
  };

  const renderPublicView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'courses':
        return <CoursesView />;
      case 'course-detail':
        return <CourseDetailView />;
      case 'enroll':
        return <EnrollmentView />;
      case 'enroll-success':
        return <EnrollmentSuccessView />;
      case 'polos':
        return <PolosView />;
      case 'about':
        return <AboutView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <>
      <SEOHead />
      {isAdminView ? (
        <Suspense fallback={<div className="h-screen w-full bg-surface flex items-center justify-center"><LoadingFallback /></div>}>
          <AdminLayout>
            <Suspense fallback={<LoadingFallback />}>
              {renderAdminView()}
            </Suspense>
          </AdminLayout>
        </Suspense>
      ) : (
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
          <Navbar />
          <main className="flex-1 flex flex-col relative">
            <Suspense fallback={<LoadingFallback />}>
              {renderPublicView()}
            </Suspense>
          </main>
          <Footer />
          <WhatsAppFloat />
          <WhatsAppChatModal />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </HelmetProvider>
  );
}
