import React, { useEffect, useState } from "react";
import BlogCard from "../../component/template/blog/BlogCard";
import Api from "../../config/Api";
import { toast } from "react-toastify";

const Blog = () => {
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
          {blogs?.map((item, index) => {
            return <BlogCard key={index} data={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
