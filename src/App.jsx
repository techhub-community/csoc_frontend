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
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorQuizzes from "./pages/mentor/MentorQuizzes";
import MentorQuizCreate from "./pages/mentor/MentorQuizCreate";
import MentorQuizResults from "./pages/mentor/MentorQuizResults";
import MentorAssignments from "./pages/mentor/MentorAssignments";
import MentorAssignmentCreate from "./pages/mentor/MentorAssignmentCreate";
import MentorAssignmentSubmissions from "./pages/mentor/MentorAssignmentSubmissions";

import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import MenteeQuizzes from "./pages/mentee/MenteeQuizzes";
import MenteeQuizAttempt from "./pages/mentee/MenteeQuizAttempt";
import MenteeQuizResult from "./pages/mentee/MenteeQuizResult";
import MenteeAssignments from "./pages/mentee/MenteeAssignments";
import MenteeAssignmentSubmit from "./pages/mentee/MenteeAssignmentSubmit";
import MenteeWelcome from "./pages/mentee/MenteeWelcome";
import Maintenance from "./pages/Maintenance";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { loading, isAuthenticated, role } = useAuthStore();
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/auth" />;
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={`/${role}/dashboard`} />;
  }
  return element;
};

function App() {
  const isMaintenanceMode = true; // Set to true to enable maintenance page
  const hasDevAccess = localStorage.getItem("dev_access") === "7019210110";
  const [token,] = useLocalStorage("token", null);
  const { loading, setRole, setTeam, isAuthenticated, setIsAuthenticated, setPendings, setData, setInvite, setType, setProgram, setSuggestions } = useAuthStore();

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
        setRole(data.role || "mentee");
        setTeam(data.team);
        setInvite(data.invite);
        setProgram(data.program);
        setIsAuthenticated(true);
        setPendings(data.pendings);
        setSuggestions(data.suggestions);
        setData(data.name, data.email, data.about, data.props, data.verified, data.usn);
      } catch (error) {
        console.error("Error fetching session data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchData().then();
  }, []);

  if (isMaintenanceMode && !hasDevAccess) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="/auth" element={loading ? <LoadingScreen />
            : isAuthenticated ? <Navigate to={(useAuthStore.getState().role || "mentee") === "mentee" ? "/mentee/welcome" : `/${useAuthStore.getState().role}/dashboard`} /> : <AuthPage />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfileSection />} />} />

          <Route path="/mentor/dashboard" element={<ProtectedRoute requiredRole="mentor" element={<MentorDashboard />} />} />
          <Route path="/mentor/quizzes" element={<ProtectedRoute requiredRole="mentor" element={<MentorQuizzes />} />} />
          <Route path="/mentor/quizzes/create" element={<ProtectedRoute requiredRole="mentor" element={<MentorQuizCreate />} />} />
          <Route path="/mentor/quizzes/:quizId/results" element={<ProtectedRoute requiredRole="mentor" element={<MentorQuizResults />} />} />
          <Route path="/mentor/assignments" element={<ProtectedRoute requiredRole="mentor" element={<MentorAssignments />} />} />
          <Route path="/mentor/assignments/create" element={<ProtectedRoute requiredRole="mentor" element={<MentorAssignmentCreate />} />} />
          <Route path="/mentor/assignments/:assignmentId/submissions" element={<ProtectedRoute requiredRole="mentor" element={<MentorAssignmentSubmissions />} />} />

          <Route path="/mentee/dashboard" element={<ProtectedRoute requiredRole="mentee" element={<MenteeDashboard />} />} />
          <Route path="/mentee/quizzes" element={<ProtectedRoute requiredRole="mentee" element={<MenteeQuizzes />} />} />
          <Route path="/mentee/quizzes/:quizId/attempt" element={<ProtectedRoute requiredRole="mentee" element={<MenteeQuizAttempt />} />} />
          <Route path="/mentee/quizzes/:quizId/result" element={<ProtectedRoute requiredRole="mentee" element={<MenteeQuizResult />} />} />
          <Route path="/mentee/assignments" element={<ProtectedRoute requiredRole="mentee" element={<MenteeAssignments />} />} />
          <Route path="/mentee/assignments/:assignmentId/submit" element={<ProtectedRoute requiredRole="mentee" element={<MenteeAssignmentSubmit />} />} />
          <Route path="/mentee/welcome" element={<ProtectedRoute requiredRole="mentee" element={<MenteeWelcome />} />} />

          <Route path="/reset-password" element={isAuthenticated ? <Navigate to={`/${useAuthStore.getState().role}/dashboard`} /> : <ResetPWD />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;