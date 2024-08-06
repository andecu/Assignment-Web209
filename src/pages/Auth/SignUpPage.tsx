/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: Inputs) => {
      return api.post("/register", data);
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      navigate("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    mutate(values);
  };

  return (
    <div className="max-w-[1200px] px-3 mx-auto mt-14">
      <h1 className="text-2xl font-semibold text-center uppercase">Đăng ký</h1>

      <form
        action=""
        className="mt-8 w-[500px] max-w-full mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="" className="block">
            Họ tên
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Vui lòng nhập họ tên",
            })}
            placeholder="Nhập họ tên"
            className="px-3 py-2 border mt-1 w-full outline-none transition-all focus:border-[#053d29] rounded"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="" className="block">
            Email
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email không đúng định dạng",
              },
            })}
            placeholder="Nhập email"
            className="px-3 py-2 border mt-1 w-full outline-none transition-all focus:border-[#053d29] rounded"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="" className="block">
            Mật khẩu
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 4,
                message: "Mật khẩu tối thiểu 4 ký tự",
              },
            })}
            placeholder="Nhập mật khẩu"
            className="px-3 py-2 border mt-1 w-full outline-none transition-all focus:border-[#053d29] rounded"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="mt-4 transition-all bg-[#4e7c32] hover:bg-[#053d29] h-12 w-full text-white font-medium uppercase">
          Đăng ký
        </button>

        <div className="flex gap-x-1 mt-6 justify-center">
          <p>Bạn đã có tài khoản?</p>
          <Link to="/sign-in" className="text-[#4e7c32]">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
