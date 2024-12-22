import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "react-hot-toast";
const App = () => {
  const token = localStorage.getItem('token');
  console.log(token)
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
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
