import { AuthProvider } from "./context/AuthContext";
import MainDashboard from "./components/dashboard/MainDashboard";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <MainDashboard />
    </AuthProvider>
  );
}

export default App;
