import { Routes, Route } from "react-router-dom";
import Home from "./view/home";
import Header from "./component/common/header";
import Footer from "./component/common/footer";
import Signup from "./view/signup";
import Login from "./view/login";
import Error from "./view/error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col h-full">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
