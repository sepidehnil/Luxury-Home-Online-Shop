import React from "react";
import { useForm } from "react-hook-form";

function FormValidation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    alert(JSON.stringify(data));
    console.log(watch(data));
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[url('https://www.ikea.com/images/two-blue-kivik-chairs-face-each-other-on-a-black-and-white-r-e8eb237382f450dbf0c88bd152083b1f.jpg?f=sg')] bg-no-repeat bg-cover bg-center">
      <div className="w-2/6	text-right font-secondary">
        <form
          className="bg-white shadow-lg rounded-lg px-8 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block text-black text-md mb-2">نام کاربری</label>
          <input
            className="border-2 border-slate-200 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="firstName"
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[ا-ی]+$/i,
            })}
          />
          {errors?.firstName?.type === "required" && (
            <p className="text-red-500 text-sm text-[0.8rem]">
              نام کاربری خود را وارد کنید
            </p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p className="text-red-500 text-[0.8rem]">فقط حروف الفبا</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormValidation;
