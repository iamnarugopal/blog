import React, { useEffect, useState } from "react";
import BlogCard from "../../component/template/blog/BlogCard";
import { toast } from "react-toastify";
import Api from "../../config/Api";
import Img from "../../assets/images/datanotfound.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const { data } = await Api.get("blog");
      // console.log(data);
      if (data.status === 1) {
        setBlogs(data?.data);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <section className="py-10 xl:py-16 2xl:py-20">
      <div className="container mx-auto">
        {!blogs?.length ? (
          <div className="flex justify-center text-center">
            <div className="sm:w-1/2 sm:w-1/3">
              <img src={Img} alt="Not Found" className="w-full mb-10" />
              <h5 className="text-white text-3xl mb-6">No blogs added yet</h5>
              <div>
                <Link to="/add-blog" className="btn btn-outline-primary">
                  Add Blog
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
              {blogs?.slice(0, 12)?.reverse().map((item, index) => {
                return <BlogCard key={index} data={item} />;
              })}
            </div>
            <div className="text-center mt-10">
              <div>
                <Link to="/blog" className="btn btn-outline-primary">
                  Show all blogs
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
