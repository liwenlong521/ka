import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { AppRoute } from './types';
import { AppProvider } from './context/AppContext';

// Wrapper to conditionally render bottom nav
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavRoutes = ['/', '/scan', '/result'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-bg-light dark:bg-bg-dark font-display text-slate-800 dark:text-white transition-colors duration-300">
      <div className="h-full overflow-y-auto no-scrollbar pb-[80px]"> 
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path={`/${AppRoute.HOME}`} element={<HomeScreen />} />
            <Route path={`/${AppRoute.SCAN}`} element={<CameraScreen />} />
            <Route path={`/${AppRoute.RESULT}`} element={<ResultScreen />} />
            <Route path={`/${AppRoute.PROFILE}`} element={<ProfileScreen />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}
