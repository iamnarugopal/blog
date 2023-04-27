import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../component/template/blog/BlogCard";

const Home = () => {
  return (
    <section className="py-10 xl:py-16 2xl:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
};

export default Home;
