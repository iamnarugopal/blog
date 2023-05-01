import React from "react";
import { useForm } from "react-hook-form";
import Api from "../../config/Api";
import { toast } from "react-toastify";

const ChnagePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (body) => {
    try {
      if (body.confirm_password !== body.new_password) {
        toast.error("New password & confirm password not matching", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;
      }
      // console.log(body);
      const { data } = await Api.patch("change-password", body);
      // console.log(data);
      if (data.status === 1) {
        toast.success("Password changed successfully", {
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
  };

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 xl:w-1/3">
            <div className="bg-slate-800 p-5 md:p-10 rounded-xl text-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5 lg:gap-8">
                  <div className="text-center">
                    <h1 className="text-3xl">Change Password</h1>
                  </div>
                  <div>
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("current_password", {
                        required: true,
                      })}
                    />
                    {errors.current_password && (
                      <div className="form-error">
                        Current Password is required
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("new_password", {
                        required: true,
                      })}
                    />
                    {errors.new_password && (
                      <div className="form-error">New Password is required</div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("confirm_password", {
                        required: true,
                      })}
                    />
                    {errors.confirm_password && (
                      <div className="form-error">
                        Confirm Password is required
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary w-full"
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

export default ChnagePassword;
