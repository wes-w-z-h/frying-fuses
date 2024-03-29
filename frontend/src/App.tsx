import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SignIn from "./pages/SignInView";
import User from "./types/User";
import {
  handleLogin,
  checkLoggedIn,
  handleLogout,
} from "./helpers/AuthenticationHelpers";
import Navbar from "./components/Navbar";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import Notice from "./components/Notice";

import HomePage from "./pages/HomeIndex";
import AboutView from "./pages/AboutView";
import CategoriesView from "./pages/CategoriesView";
import TopicsView from "./pages/TopicsView";
import "./App.css";
import PostsView from "./pages/PostsView";
import AppState from "./types/AppState";
import LogoutTimer from "./components/Authentication/LogoutTimer";
import SearchView from "./pages/SearchView";
import TopicObj from "./types/TopicObj";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {} as User,
  });

  const [openNotice, setOpenNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("hihi");
  const [noticeSeverity, setNoticeSeverity] = useState<AlertColor>("info");

  const notice = (message: string, severity: AlertColor) => {
    setNoticeMessage(message);
    setNoticeSeverity(severity);
    setOpenNotice(true);
  };

  useEffect(() => checkLoggedIn(appState, setAppState, notice), [appState]);

  return (
    <div className="App Tut">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Notice
            message={noticeMessage}
            severity={noticeSeverity}
            noticeState={[openNotice, setOpenNotice]}
          />
          <Navbar
            loggedInStatus={appState.loggedInStatus}
            setAppState={setAppState}
            notice={notice}
          />
          <LogoutTimer
            handleLogout={handleLogout}
            appState={appState}
            setAppState={setAppState}
            notice={notice}
          />
          <Routes>
            <Route
              path="/users/sign_in"
              element={
                <SignIn
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                  setAppState={setAppState}
                  loggedInStatus={appState.loggedInStatus}
                  notice={notice}
                />
              }
            />
            <Route path="/dashboard" element={<CategoriesView />} />
            <Route path="/about" element={<AboutView />} />
            <Route
              path="/categories/:id"
              element={<TopicsView appState={appState} notice={notice} />}
            />
            <Route
              path="/topics/:id"
              element={<PostsView appState={appState} notice={notice} />}
            />
            <Route
              path="/topics/all"
              element={<SearchView appState={appState} notice={notice} />}
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
