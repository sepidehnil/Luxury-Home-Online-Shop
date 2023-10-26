import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backwardArrow from "../../../assets/svg/backwardArrow.svg";
import Cookies from "js-cookie";
import privateAxios from "../../../services/instances/privateAxios";
import publicAxios from "../../../services/instances/publicAxios";

function UserForm() {
  const panelNavigate = useNavigate();
  const [userNameVal, setUserName] = useState();
  const [passwordValue, setPasswordValue] = useState();
  const [userId, setUserId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, event) {
    event.preventDefault();
    console.log(data);
    publicAxios
      .post("http://localhost:8000/api/auth/login", data)
      .then((response) => {
        console.log(response);
        if (
          response?.status === 200 &&
          response?.data.data.user.role === "USER"
        ) {
          const token = response.data.token;
          Cookies.set("accessToken", token.accessToken);
          Cookies.set("refreshToken", token.refreshToken);

          const userId = response.data.data.user._id;
          setUserId(userId);
          Cookies.set("userId", userId);

          panelNavigate("/shipping");
        }
      });
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[url('https://www.ikea.com/images/a-mid-century-modern-living-room-centred-around-a-jaettebo-s-c7a5b708513cc0be58ebc3c4e94efd31.jpg?f=sg')] bg-no-repeat bg-cover bg-center">
      <div className="w-2/6	text-left font-secondary">
        <form
          className="bg-white shadow-lg rounded-lg px-8 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-xl">User Login</h1>
          <div className="border-b-2 bg-gray-400 my-4"></div>
          <label className="block text-black text-md ">UserName</label>
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
            })}
          />
          {errors?.username?.type === "required" && (
            <p className="text-red-500 text-[0.8rem]">enter your userName! </p>
          )}
          {errors?.username?.type === "validate" && (
            <p className="text-red-500 text-[0.8rem]">
              userName is not correct!
            </p>
          )}
          {errors?.username?.type === "pattern" && (
            <p className="text-red-500 text-[0.8rem]">only use alphabets!</p>
          )}

          <label className="block text-black text-md">Password</label>
          <input
            className="border-2 border-slate-200 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-3"
            type="password"
            id="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            {...register("password", {
              required: true,
              //   validate: (value) => value === "admin1234",
            })}
          />
          {errors?.password?.type === "required" && (
            <div className="text-red-500 text-[0.8rem] ">
              enter you're password!
            </div>
          )}
          {errors?.password?.type === "validate" && (
            <p className="text-red-500 text-[0.8rem]">
              you're password is not correct!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            LogIn
          </button>

          <Link to="/">
            <div className="flex justify-end gap-2 text-sm items-center mt-4 hover:underline-offset-4 hover:underline">
              <span>Back to home</span>
              <img src={backwardArrow} />
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
