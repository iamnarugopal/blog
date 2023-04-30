import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import "./blogcard.scss";
const BlogCard = ({ data, isEdit, deleteBlog }) => {
  const setDefaultImg = (e) => {
    e.target.src = "https://placehold.co/320x300"
  }
  return (
    <article className="p-3 lg:p-5 rounded-xl flex max-w-xl flex-col  justify-between hover:bg-slate-800 hover:scale-105 transition-transform">
      <div className="blogcardimg rounded-lg border border-slate-300 w-full">
        <Link to={`/blog/${data?.slug}`}>
          <img
            src={!!data?.image ? data?.image : "https://placehold.co/320x180"}
            alt=""
            className="rounded-lg"
            onError={setDefaultImg}
          />
        </Link>
      </div>
      <div className="mt-5 lg:mt-8 grow">
        <div className="mb-6">
          <h3 className="text-xl line-clamp-1 font-semibold leading-6 text-white hover:text-sky-600">
            <Link to={`/blog/${data?.slug}`}>{data?.title}</Link>
          </h3>
          <p className="mt-5 mb-0 line-clamp-2 text-sm leading-6 text-gray-600">
            {data?.short_description}
          </p>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="grow">
            <div className="relative flex items-center gap-x-4">
              <div className="bg-sky-600 text-white w-10 h-10 rounded-full justify-center items-center flex">
                {data?.author?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm leading-6">
                <div className="font-semibold text-slate-400">
                  <Link to="/blog/blog123">{data?.author?.name}</Link>
                </div>
                <div className="text-slate-600">
                  {dayjs(data?.createdAt).format("DD MMM YYYY - hh:mm A")}
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            {isEdit ? (
              <div className="flex gap-x-2 items-center">
                <Link
                  to={`/add-blog`}
                  state={{ isEdit, id: data._id }}
                  className="btn btn-sm btn-outline-primary"
                >
                  <FaPen />
                </Link>
                <button
                  onClick={() => deleteBlog(data)}
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ) : (
              <Link
                to={`/blog/${data?.slug}`}
                className="btn btn-outline-primary"
              >
                View
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
