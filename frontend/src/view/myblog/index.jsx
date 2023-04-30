import React, { useEffect, useState } from "react";
import BlogCard from "../../component/template/blog/BlogCard";
import { toast } from "react-toastify";
import Api from "../../config/Api";
import Img from "../../assets/images/datanotfound.svg";
import { Link } from "react-router-dom";
const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const { data } = await Api.get("myblog");
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

  const deleteBlog = async (d) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const { data } = await Api.delete(`deleteblog/${d?._id}`);
        if (data.status === 1) {
          getBlogs();
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="py-10 xl:py-16 2xl:py-20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-white">My Blogs</h1>
        </div>
        {!blogs?.length ? (
          <div className="flex justify-center text-center">
            <div className="sm:w-1/2 sm:w-1/3">
              <img src={Img} alt="Not Found" className="w-full mb-10" />
              <h5 className="text-white text-3xl mb-6">No blogs added yet</h5>
              <div>
                <Link to="/add-blog" className="btn btn-outline-primary">Add Blog</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
            {blogs?.map((item, index) => {
              return (
                <BlogCard
                  key={index}
                  data={item}
                  isEdit={true}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBlog;
