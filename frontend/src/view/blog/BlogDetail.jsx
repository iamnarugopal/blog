import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../config/Api";
import dayjs from "dayjs";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blogDetail, setBlogDetail] = useState([]);
  const getBlogDetail = async () => {
    try {
      const { data } = await Api(`/blog/${slug}`);
      if (data.status === 1) {
        setBlogDetail(data?.data);
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
    getBlogDetail();
  }, []);

  return (
    <section className="py-10 xl:py-16 2xl:py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-2/4">
            <div className="">
              {!!blogDetail?.image && (
                <div className="rounded-lg border border-slate-300 w-full mb-6">
                  <img src={blogDetail?.image} alt="" className="rounded-lg" />
                </div>
              )}

              <div className="mb-10">
                <h1 className="text-3xl font-semibold text-white mb-4">
                  {blogDetail?.title}
                </h1>
                <div className="relative flex items-center gap-x-4 mb-10">
                  <div className="bg-sky-600 text-white w-10 h-10 rounded-full justify-center items-center flex">
                    {blogDetail?.author?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-slate-400">
                      <Link to="/">{blogDetail?.author?.name}</Link>
                    </p>
                    <p className="text-slate-600">
                      {dayjs(blogDetail?.createdAt).format(
                        "DD MMM YYYY - HH:MM A"
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {blogDetail?.long_description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
