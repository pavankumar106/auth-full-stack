import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import PageNotFound from "./components/PageNotFound";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="*" element={<PageNotFound />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} exact />
        </Route>
      </Routes>
    </>
  );
};

export default App;
