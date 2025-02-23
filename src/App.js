import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PasswordRetrieval from "./PasswordRetrieval";
import Login from "./Login";
import Dashboard from "./Dashboard";
import WelcomeScreen from "./WelcomeScreen";
import SignUp from "./SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PasswordRetrieval" element={<PasswordRetrieval />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
