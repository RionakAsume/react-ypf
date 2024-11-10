import { Register } from "./pages/Register";
import { LoginYPF } from "./pages/LoginYPF";
import { Main } from "./pages/Main";
import { YpfProfile } from "./pages/YpfProfile";
import { MainDetail } from "./pages/MainDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRouter } from "./ProtectedRouter";
import { OrdenProvider } from "./context/OrdenContext";
import { StatusProvider } from "./context/StatusContext";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { DetalleProvider } from "./context/DetalleordenContext";

export const App = () => {
  return (
    <AuthProvider>
      <OrdenProvider>
        <StatusProvider>
          <DetalleProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/ypfprofile" element={<YpfProfile />} />
                <Route path="/login" element={<LoginYPF />} />

                <Route element={<ProtectedRouter />}>
                  <Route path="/main" element={<Main />} />
                  <Route path="/main/:id" element={<MainDetail />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DetalleProvider>
        </StatusProvider>
      </OrdenProvider>
    </AuthProvider>
  );
};
export default App;
