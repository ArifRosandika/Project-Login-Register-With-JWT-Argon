"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

type RegisterData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    try {
      await axios.post("http://localhost:8080/register", data);
      alert("Register is success, please login!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Email or password is wrong, Try again");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      <div className="w-1/2 h-screen hidden lg:block">
        <Image
          src="/bg.jpg"
          alt="Placeholder Image"
          width={800}
          height={800}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register Here</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Input your name"
              {...register("username", { required: "Username is required" })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="text"
              placeholder="Input your email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Input your password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              id="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" className="text-blue-500" />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-black text-center">
          Already have an account?{" "}
          <a href="/login" className="hover:underline text-blue-600">
            Sign up Here
          </a>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="bg-white/3 backdrop-blur-lg rounded-lg">
          <button className="flex items-center justify-center w-full py-2 rounded-lg mb-3 bg-blue-300 hover:bg-blue-500 transition">
            <FcGoogle className="text-xl mr-2" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="bg-white/3 backdrop-blur-lg rounded-lg ">
          <button className="flex items-center justify-center w-full py-2 rounded-lg bg-black/50 hover:bg-gray-700 transition">
            <FaApple className="text-xl mr-2" />
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}
