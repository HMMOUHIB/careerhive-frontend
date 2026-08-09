import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Profile from "./scenes/profile";
import Evaluations from "./scenes/evaluations";
import AddSkills from "./scenes/add-skills";
import SkillsEvolution from "./scenes/skills-evolution";
import Formations from "./scenes/formations";
import PromotionRequest from "./scenes/promotion-request";
import Verification from "./scenes/Verification";
import Certificates from "./scenes/certificates";
import AuthPage from "./scenes/Login/AuthPage";
import OAuthSuccess from "./scenes/Login/OAuthSuccess";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import ClickSpark from "./components/Reactbit/ClickSpark";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const isAuthRoute =
    location.pathname === "/auth" || location.pathname === "/oauth-success";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProfileProvider>
            <CssBaseline />

            {isAuthRoute ? (
              <Routes location={location} key={location.pathname}>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/oauth-success" element={<OAuthSuccess />} />
              </Routes>
            ) : (
              <ClickSpark
                sparkColor='#00ff00'
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <AnimatePresence mode="wait">
                      <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile key="profile-route" /></ProtectedRoute>} />
                        <Route path="/evaluations" element={<ProtectedRoute><Evaluations /></ProtectedRoute>} />
                        <Route path="/add-skills" element={<ProtectedRoute><AddSkills /></ProtectedRoute>} />
                        <Route path="/skills-evolution" element={<ProtectedRoute><SkillsEvolution /></ProtectedRoute>} />
                        <Route path="/formations" element={<ProtectedRoute><Formations /></ProtectedRoute>} />
                        <Route path="/promotion-request" element={<ProtectedRoute><PromotionRequest /></ProtectedRoute>} />
                        <Route path="/contacts" element={<ProtectedRoute><Verification /></ProtectedRoute>} />
                        <Route
                          path="/certificates"
                          element={
                            <ProtectedRoute>
                              <RoleRoute allowedRoles={['manager', 'hr', 'admin']}>
                                <Certificates />
                              </RoleRoute>
                            </ProtectedRoute>
                          }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </AnimatePresence>
                  </main>
                </div>
              </ClickSpark>
            )}
          </ProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;