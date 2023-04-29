import React from "react";
import { useForm } from "react-hook-form";
import Api from "../../config/Api";
import { toast } from "react-toastify";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (body) => {
    try {
      const { title, short_description, long_description, image } = body;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("short_description", short_description);
      formData.append("long_description", long_description);
      formData.append("image", image[0]);
      const { data } = await Api.post("add-blog", formData);
      if (data.status === 1) {
        toast.success("Blog added successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        reset();
      } else {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 xl:w-2/3">
            <div className="bg-slate-800 p-5 md:p-10 rounded-xl text-white">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 lg:gap-8">
                  <div className="text-center">
                    <h1 className="text-3xl">Add Blog</h1>
                  </div>
                  <div>
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("title", {
                        required: true,
                      })}
                    />
                    {errors.title && (
                      <div className="form-error">Title is required</div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      {...register("image", {
                        required: true,
                      })}
                    />
                    {errors.image && (
                      <div className="form-error">Image is required</div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      {...register("short_description", {
                        required: true,
                      })}
                    ></textarea>
                    {errors.short_description && (
                      <div className="form-error">
                        Short Description is required
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Long Description</label>
                    <textarea
                      className="form-control"
                      rows={10}
                      {...register("long_description", {
                        required: true,
                      })}
                    ></textarea>
                    {errors.long_description && (
                      <div className="form-error">
                        Long Description is required
                      </div>
                    )}
                  </div>
                  <div className="text-center w-full">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary px-10"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddBlog;
