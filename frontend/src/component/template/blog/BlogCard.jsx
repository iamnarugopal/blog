import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <article className="p-3 lg:p-5 rounded-xl flex max-w-xl flex-col items-start justify-between hover:bg-slate-800 hover:scale-105 transition-transform">
      <div className="rounded-lg border border-slate-300 w-full">
        <Link to="/">
          <img
            src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=3603&amp;q=80"
            alt=""
            className="rounded-lg"
          />
        </Link>
      </div>
      <div className="mt-5 lg:mt-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold leading-6 text-white hover:text-sky-600">
            <Link to="/">Boost your conversion rate</Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam
            vitae illo. Non aliquid explicabo necessitatibus unde. Sed
            exercitationem placeat consectetur nulla deserunt vel. Iusto
            corrupti dicta.
          </p>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="grow">
            <div className="relative flex items-center gap-x-4">
              <div className="bg-sky-600 text-white w-10 h-10 rounded-full justify-center items-center flex">
                a
              </div>
              <div className="text-sm leading-6">
                <p className="font-semibold text-slate-400">
                  <Link to="/">Michael Foster</Link>
                </p>
                <p className="text-slate-600">
                  <time dateTime="2020-03-16">Mar 16, 2020</time>
                </p>
              </div>
            </div>
          </div>
          <div>
            <Link to="/" className="btn btn-outline-primary">
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
