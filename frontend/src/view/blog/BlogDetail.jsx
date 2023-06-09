import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../config/Api";
import dayjs from "dayjs";
import Loader from "../../component/widgets/Loader";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blogDetail, setBlogDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const getBlogDetail = async () => {
    try {
      const { data } = await Api(`/blogdetailbyslug/${slug}`);
      if (data.status === 1) {
        setBlogDetail(data?.data);
        setIsLoaded(true);
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
    // eslint-disable-next-line
  }, []);

  return (
    <section className="py-10 xl:py-16 2xl:py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="lg:w-2/3 xl:w-2/4">
            {isLoaded ? (
              <div className="">
                {!!blogDetail?.image && (
                  <div className="rounded-lg border border-slate-300 w-full mb-6">
                    <img
                      src={blogDetail?.image}
                      alt=""
                      className="rounded-lg w-full"
                    />
                  </div>
                )}

                <div className="">
                  <h1 className="text-3xl font-semibold text-white mb-4">
                    {blogDetail?.title}
                  </h1>
                  <div className="relative flex items-center gap-x-4 mb-10">
                    <div className="bg-sky-600 text-white w-10 h-10 rounded-full justify-center items-center flex">
                      {blogDetail?.author?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm leading-6">
                      <div className="font-semibold text-slate-400">
                        <Link to="/">{blogDetail?.author?.name}</Link>
                      </div>
                      <div className="text-slate-600">
                        {dayjs(blogDetail?.createdAt).format(
                          "DD MMM YYYY - hh:mm A"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 blogdetail">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogDetail?.long_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
