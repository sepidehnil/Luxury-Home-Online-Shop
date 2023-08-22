import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backwardArrow from "../../../assets/svg/backwardArrow.svg";
import axios from "axios";
import Cookies from "js-cookie";

function FormValidation() {
  const panelNavigate = useNavigate();
  const [userNameVal, setUserName] = useState();
  const [passwordValue, setPasswordValue] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    // alert(JSON.stringify(data));
    console.log(data);
    axios
      .post("http://localhost:8000/api/auth/login", data)
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.data.user.role === "ADMIN"
        ) {
          const token = response.data.token;
          Cookies.set("accessToken", token.accessToken);
          Cookies.set("refreshToken", token.accessToken);
          panelNavigate("/orders");
        }
      });
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[url('https://www.ikea.com/images/two-blue-kivik-chairs-face-each-other-on-a-black-and-white-r-e8eb237382f450dbf0c88bd152083b1f.jpg?f=sg')] bg-no-repeat bg-cover bg-center">
      <div className="w-2/6	text-right font-secondary">
        <form
          className="bg-white shadow-lg rounded-lg px-8 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-xl">پنل مدیریت</h1>
          <div className="border-b-2 bg-gray-400 my-4"></div>
          <label className="block text-black text-md ">نام کاربری</label>
          <input
            className="border-2 border-slate-200 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-3"
            type="text"
            id="username"
            value={userNameVal}
            onChange={(e) => setUserName(e.target.value)}
            {...register("username", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
              validate: (value) => value === "admin",
            })}
          />
          {errors?.username?.type === "required" && (
            <p className="text-red-500 text-[0.8rem]">
              نام کاربری خود را وارد کنید
            </p>
          )}
          {errors?.username?.type === "validate" && (
            <p className="text-red-500 text-[0.8rem]">
              نام کاربری صحیح نمی باشد
            </p>
          )}
          {errors?.username?.type === "pattern" && (
            <p className="text-red-500 text-[0.8rem]">فقط حروف الفبا</p>
          )}

          <label className="block text-black text-md">رمز عبور</label>
          <input
            className="border-2 border-slate-200 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-3"
            type="password"
            id="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            {...register("password", {
              required: true,
              validate: (value) => value === "admin1234",
            })}
          />
          {errors?.password?.type === "required" && (
            <div className="text-red-500 text-[0.8rem] ">
              رمز عبور خود را وارد کنید
            </div>
          )}
          {errors?.password?.type === "validate" && (
            <p className="text-red-500 text-[0.8rem]">رمز عبور صحیح نمی باشد</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            ورود
          </button>

          <Link to="/home">
            <div className="flex justify-end gap-2 text-sm items-center mt-4 hover:underline-offset-4 hover:underline">
              <span>بازگشت به خانه</span>
              <img src={backwardArrow} />
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default FormValidation;
