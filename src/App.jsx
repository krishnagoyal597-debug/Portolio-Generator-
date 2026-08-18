import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ToastContainer } from './components/ui/Toast';

// Lazy-loaded pages for performance
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Dashboard
import AppLayout from './components/layout/AppLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import PortfoliosPage from './pages/dashboard/PortfoliosPage';
import ThemesPage from './pages/dashboard/ThemesPage';
import SettingsPage from './pages/dashboard/SettingsPage';

// Create wizard
import CreateLayout from './components/layout/CreateLayout';
import UploadStep from './pages/create/UploadStep';
import AnalysisStep from './pages/create/AnalysisStep';
import ReviewStep from './pages/create/ReviewStep';
import CustomizeStep from './pages/create/CustomizeStep';
import GenerateStep from './pages/create/GenerateStep';
import PreviewStep from './pages/create/PreviewStep';

// Portfolio view
import FullPortfolioView from './pages/portfolio/FullPortfolioView';

// Admin
import AdminLayout from './components/layout/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPortfolios from './pages/admin/AdminPortfolios';
import AdminThemes from './pages/admin/AdminThemes';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Route guards
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

function RedirectIfAuth({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (isAuthenticated) return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />;
  return children;
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <PortfolioProvider>
          <HashRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<RedirectIfAuth><LoginPage /></RedirectIfAuth>} />
              <Route path="/signup" element={<RedirectIfAuth><SignupPage /></RedirectIfAuth>} />

              {/* User Dashboard */}
              <Route path="/dashboard" element={<RequireAuth><AppLayout /></RequireAuth>}>
                <Route index element={<DashboardHome />} />
                <Route path="portfolios" element={<PortfoliosPage />} />
                <Route path="templates" element={<ThemesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Creation Wizard */}
              <Route path="/create" element={<RequireAuth><CreateLayout /></RequireAuth>}>
                <Route index element={<Navigate to="/create/upload" replace />} />
                <Route path="upload" element={<UploadStep />} />
                <Route path="analysis" element={<AnalysisStep />} />
                <Route path="review" element={<ReviewStep />} />
                <Route path="customize" element={<CustomizeStep />} />
                <Route path="generate" element={<GenerateStep />} />
                <Route path="preview" element={<PreviewStep />} />
              </Route>

              {/* Full Portfolio View */}
              <Route path="/portfolio/:id" element={<FullPortfolioView />} />

              {/* Admin */}
              <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                <Route index element={<AdminOverview />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="portfolios" element={<AdminPortfolios />} />
                <Route path="templates" element={<AdminThemes />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer />
          </HashRouter>
        </PortfolioProvider>
      </AuthProvider>
    </AppProvider>
  );
}
