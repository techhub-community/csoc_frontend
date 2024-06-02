import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileSection from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfileSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
