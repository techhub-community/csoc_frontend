import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileSection from "./pages/ProfilePage";
import { useEffect } from "react";
import { baseUrl } from "./data/consts"
import useAuthStore from "./hooks/useAuthStore";
import useLocalStorage from "./hooks/useLocalStorage";
import { Navigate } from "react-router-dom";
import ResetPWD from "./pages/ResetPWD";
import LoadingScreen from "./pages/LoadingPage";

function App() {
  const [token, ] = useLocalStorage("token", null);
  const { loading, setTeam, isAuthenticated, setIsAuthenticated, setPendings, setData, setInvite, setType, setProgram, setSuggestions } = useAuthStore();

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

        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }

        setType(data.type);
        setTeam(data.team);
        setInvite(data.invite);
        setProgram(data.program);
        setIsAuthenticated(true);
        setPendings(data.pendings);
        setSuggestions(data.suggestions);
        setData(data.name, data.email, data.about, data.props, data.verified, data.usn);
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
          <Route path="/auth" element={loading ? <LoadingScreen />
            : isAuthenticated ? <Navigate to="/profile" /> : <AuthPage />} />
          <Route path="/profile" element={loading ? <LoadingScreen />
            : !isAuthenticated ? <Navigate to="/auth" /> : <ProfileSection />} />
          <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/" /> : <ResetPWD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;