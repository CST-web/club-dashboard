import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthProvider";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const { token } = useAuth();
  return token ? <Dashboard /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
