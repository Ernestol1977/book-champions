import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/ui/notFound/NotFound";
import Protected from "./components/routing/protected/Protected";
import Register from "./components/auth/register/Register";

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("book/champions-token");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="login" element={<Login onLogin={handleLogIn} />} />
          <Route element={<Protected isSignedIn={loggedIn} />}>
            <Route
              path="/library/*"
              element={
                <>
                  <Dashboard onLogout={handleLogout} />
                </>
              } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};

export default App;
