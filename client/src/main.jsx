import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

import { AuthProvider, useAuth } from "./lib/auth";

// Shows Dashboard if logged in, Landing page if logged out
function HomeRoute() {
  const { token } = useAuth();
  return token ? <Dashboard /> : <LandingPage />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeRoute />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import "./index.css";

// import LandingPage from "./pages/LandingPage";
// import { useAuth } from "./lib/auth";
// import { useContext } from "react";
// import { AuthProvider } from "./lib/auth";
// import Protected from "./components/Protected";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<App />}>
//           <Route
//             index
//             element={
//               <Protected>
//                 <Dashboard />
//               </Protected>
//             }
//           />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//         </Route>
//       </Routes>
//     </AuthProvider>
//   </BrowserRouter>
// );
