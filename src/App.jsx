import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRouted from "./components/ProtectedRouted";
import PublicRouted from "./components/PublicRouted";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouted>
                <Home />
              </ProtectedRouted>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRouted>
                <Post />
              </ProtectedRouted>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRouted>
                <Login />
              </PublicRouted>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRouted>
                <Register />
              </PublicRouted>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </>
  );
};

export default App;
