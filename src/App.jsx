import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileSection from "./pages/ProfilePage";
import { useEffect } from "react";

import { baseUrl } from "./data/consts"
import useAuthStore from "./hooks/useAuthStore";
import useLocalStorage from "./hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

function App() {
  const [token, ] = useLocalStorage("token", null);
  const { loading, setRole, isAuthenticated, setIsAuthenticated, setData } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/session`, {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
          method: "POST"
        });

        const data = await response.json();
        setIsAuthenticated(data.valid);
        setRole(data.role);
        setData(data.name, data.email, data.about, data.props, data.verified);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchData().then();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="/auth" element={loading ? <>Loading...</> : isAuthenticated ? <Navigate to="/profile" /> : <AuthPage />} />
          <Route path="/profile" element={loading ? <>Loading...</>
            : !isAuthenticated ? <Navigate to="/auth" /> : <ProfileSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
