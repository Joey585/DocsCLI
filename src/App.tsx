import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import {AdminDash} from "./pages/AdminDash";
import {Account} from "./pages/Account";

function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route element={<PrivateRoute />}>
                  <Route path="/admin" element={<AdminDash/>}/>
              </Route>
              <Route element={<PrivateRoute/>}>
                  <Route path="/account" element={<Account/>}/>
              </Route>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
