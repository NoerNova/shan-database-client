import { useState } from "react";
import "./App.css";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

import { Home, Login, Logout } from "./pages";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import useToken from "./utils/useToken";

import { RecoilRoot } from "recoil";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
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
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  );
}

export default App;
