import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../config/Api";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, isEdit } = location.state || {};
  const [editData, setEditData] = useState();
  const getBlogDetail = async () => {
    try {
      const { data } = await Api(`/blogdetailbyid/${id}`);
      if (data.status === 1) {
        setEditData(data.data);
        reset({
          title: data?.data?.title,
          short_description: data?.data?.short_description,
          long_description: data?.data?.long_description,
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (body) => {
    try {
      const imgSize = Math.ceil(body["image"][0]["size"] / 1024);
      const imgType = body["image"][0]["type"].split("/")[1].toLowerCase();
      const allowedImage = ["jpg", "jpeg", "png"];
      if (imgSize > 200) {
        toast.error("Image size should be under 200kb", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      if (!allowedImage.includes(imgType)) {
        toast.error("Image extension should be jpg, jpeg or png", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      const { title, short_description, long_description, image } = body;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("short_description", short_description);
      formData.append("long_description", long_description);
      formData.append("image", image[0]);
      if (isEdit) {
        const { data } = await Api.patch(`updateblog/${id}`, formData);
        // console.log(data);
        if (data.status === 1) {
          toast.success("Blog updated successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          navigate("/my-blog");
        } else {
          toast.error(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        const { data } = await Api.post("addblog", formData);
        if (data.status === 1) {
          toast.success("Blog added successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          reset();
          navigate("/my-blog");
        } else {
          toast.error(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setDefaultImg = (e) => {
    e.target.src = "https://placehold.co/100x100";
  };

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full  xl:w-2/3">
            <div className="bg-slate-800 p-5 md:p-10 rounded-xl text-white">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-5 lg:gap-8">
                  <div className="text-center">
                    <h1 className="text-3xl">{isEdit ? "Edit" : "Add"} Blog</h1>
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
                        required: isEdit ? false : true,
                      })}
                    />
                    {errors.image && (
                      <div className="form-error">Image is required</div>
                    )}
                  </div>
                  {isEdit && !watch("image") && !!editData?.image && (
                    <div>
                      <img
                        src={editData?.image}
                        alt="blog"
                        style={{ height: "100px" }}
                        onError={setDefaultImg}
                      />
                    </div>
                  )}

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
                    {/* <textarea
                      className="form-control"
                      rows={10}
                      {...register("long_description", {
                        required: true,
                      })}
                    ></textarea> */}
                    <div>
                      <Controller
                        control={control}
                        name="long_description"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <ReactQuill
                            {...field}
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={{
                              toolbar: [
                                [{ font: [] }, { size: [] }],
                                [{ align: [] }, "direction"],
                                ["bold", "italic", "underline", "strike"],
                                [{ color: [] }, { background: [] }],
                                [{ script: "super" }, { script: "sub" }],
                                ["blockquote", "code-block"],
                                [
                                  { list: "ordered" },
                                  { list: "bullet" },
                                  { indent: "-1" },
                                  { indent: "+1" },
                                ],
                                ["link", "video"],
                                ["clean"],
                              ],
                            }}
                          />
                        )}
                      />
                    </div>
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
