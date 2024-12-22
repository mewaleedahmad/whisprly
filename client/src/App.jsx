import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
const App = () => {
  const {authUser} = useAuthContext()
  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={false}  toastOptions={{
          style: {
            background: '#171b1d', 
            color: 'white', 
            duration : 2000,
          },
        }}/>
      </div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
