import { Routes, Route } from "react-router-dom";
import Home from "./view/home";
import Header from "./component/common/header";
import Footer from "./component/common/footer";
import Signup from "./view/signup";
import Login from "./view/login";
import Error from "./view/error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./view/blog";
import BlogDetail from "./view/blog/BlogDetail";
import ChangePassword from "./view/changepassword";
import UserAuth from "./navigation/UserAuth";
import AddBlog from "./view/addblog";
import MyBlog from "./view/myblog";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col h-full">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<UserAuth redirectPath="/login" />}>
              <Route path="/add-blog" element={<AddBlog />} />
              <Route path="/my-blog" element={<MyBlog />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
