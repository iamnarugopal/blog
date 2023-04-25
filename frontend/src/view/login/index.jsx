import React from "react";
import { useForm } from "react-hook-form";
import Api from "../../config/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  console.log(Cookies.get('token'));

  const onSubmit = async (body) => {
    try {
      const res = await Api.post("login", body);
      console.log(res);
      // if (data.status === 1) {
      //   toast.success("Login successfully!", {
      //     position: toast.POSITION.BOTTOM_RIGHT,
      //   });
      //   reset();
      //   navigate("/");
      // }else{
      //   toast.error(data.message, {
      //     position: toast.POSITION.BOTTOM_RIGHT,
      //   });
      // }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
                    <h1 className="text-3xl">Login</h1>
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", {
                        required: true,
                      })}
                    />
                    {errors.email && (
                      <div className="form-error">Email is required</div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && (
                      <div className="form-error">Password is required</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Login"
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

export default Login;
