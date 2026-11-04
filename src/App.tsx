import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import MainDashboard from "./components/dashboard/MainDashboard";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <MainDashboard />
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
