import { useState } from "react";
import "./App.css";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { Home, Login, Logout } from "./pages";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ProtectedRoute } from "routes/ProtectedRoute";
import { AuthProvider } from "hooks/useAuth";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <AuthProvider>
      <RecoilRoot>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/login" element={
                <Login />
              } />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </MantineProvider>
        </ColorSchemeProvider>
      </RecoilRoot>
    </AuthProvider>
  );
}

export default App;
