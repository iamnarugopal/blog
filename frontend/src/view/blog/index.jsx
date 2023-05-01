import React, { useEffect, useState } from "react";
import BlogCard from "../../component/template/blog/BlogCard";
import Api from "../../config/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Img from "../../assets/images/datanotfound.svg";
import Loader from "../../component/widgets/Loader";

const Blog = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const { data } = await Api.get("blog");
      // console.log(data);
      if (data.status === 1) {
        setBlogs(data?.data);
        setIsLoaded(true)
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
        {isLoaded ? (
          <>
            {!blogs?.length ? (
              <div className="flex justify-center text-center">
                <div className="sm:w-1/2 sm:w-1/3">
                  <img src={Img} alt="Not Found" className="w-full mb-10" />
                  <h5 className="text-white text-3xl mb-6">
                    No blogs added yet
                  </h5>
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
                  {blogs?.reverse().map((item, index) => {
                    return <BlogCard key={index} data={item} />;
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};

export default Blog;
