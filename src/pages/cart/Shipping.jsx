import { useEffect, useState } from "react";
import publicAxios from "../../services/instances/publicAxios";
import Cookies from "js-cookie";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function Shipping() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    const userId = Cookies.get("userId");
    console.log("UserId:", userId);

    if (userId) {
      publicAxios.get(`/users/${userId}`).then((response) => {
        const userData = response.data.data.user;
        setData(userData);
        setName(userData.firstname);
        setLastName(userData.lastname);
        setAddress(userData.address);
        setPhoneNumber(userData.phoneNumber);
      });
    }
  }, []);
  console.log(data);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    localStorage.setItem("shippingDate", selectedDate); // Save the date to local storage
  };

  const updatedData = {
    firstname: name,
    lastname: lastName,
    address,
    phoneNumber,
  };

  localStorage.setItem("userData", JSON.stringify(updatedData));

  function convertToPersianNumbers(input) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return input.replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
  }

  const cartData = localStorage.getItem("cartData");
  const cartObject = JSON.parse(cartData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) {
      errors.name = "نام را وارد کنید";
    }

    if (!lastName.trim()) {
      errors.lastName = "نام خانوادگی را وارد کنید";
    }

    if (!address.trim()) {
      errors.address = "آدرس را وارد کنید";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "تلفن همراه را وارد کنید";
    }

    // if (!selectedDate) {
    //   errors.selectedDate = "تاریخ تحویل را انتخاب کنید";
    // }

    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      console.log("Form data submitted:", updatedData);
      // You can add code here to send the data to the server

      // Check if the cart is empty before redirectin

      if (cartObject.items.length > 0) {
        // Redirect to the specified URL using JavaScript
        window.location.href = "http://localhost:5173/";
      }
    } else {
      // Form has errors, update the state to show errors
      setFormErrors(errors);
    }
  };

  return (
    <div className="bg-[#24272c] flex justify-between ">
      <div>
        <form
          className="w-[450px] bg-transparent backdrop-blur-xl flex flex-col font-secondary gap-5 p-10"
          onSubmit={handleSubmit}
        >
          <label htmlFor="fname">نام: </label>
          <input
            type="text"
            id="fname"
            name="fname"
            className={`border-2 py-1 px-1 rounded-lg outline-none ${
              formErrors.name ? "border-red-500" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && (
            <span className="text-red-500">{formErrors.name}</span>
          )}
          <label htmlFor="lname" className="text-white">
            نام خانوادگی:
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            className={`border-2 py-1 px-2 rounded-lg outline-none ${
              formErrors.lastName ? "border-red-500" : ""
            }`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {formErrors.lastName && (
            <span className="text-red-500">{formErrors.lastName}</span>
          )}
          <label htmlFor="address" className="text-white">
            ادرس:{" "}
          </label>
          <textarea
            id="address"
            name="address"
            rows="5"
            className={`rounded-lg outline-none py-1 px-2 ${
              formErrors.address ? "border-red-500" : ""
            }`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {formErrors.address && (
            <span className="text-red-500">{formErrors.address}</span>
          )}
          <label htmlFor="phone" className="text-white">
            تلفن همراه:{" "}
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className={`border-2 py-1 px-2 rounded-lg outline-none ${
              formErrors.phoneNumber ? "border-red-500" : ""
            }`}
            value={convertToPersianNumbers(phoneNumber)}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {formErrors.phoneNumber && (
            <span className="text-red-500">{formErrors.phoneNumber}</span>
          )}
          <label htmlFor="date" className="text-white">
            تاریخ تحویل:{" "}
          </label>
          <label htmlFor="date">تاریخ تحویل: </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border-2 py-1 px-2 rounded-lg outline-none"
            value={date}
            onChange={handleDateChange}
          />
          {/* {formErrors.selectedDate && (
            <span className="text-red-500">{formErrors.selectedDate}</span>
          )} */}
          <button
            className="px-3 py-2 bg-red-600 border-none rounded-lg justify-center flex text-white"
            type="submit"
          >
            ثبت سفارش
          </button>
          {cartObject.items.length === 0 ? (
            <p className="text-red-500">سبد خرید خالی است.</p>
          ) : (
            ""
          )}
        </form>
      </div>
      <div className="rounded-r-2xl flex items-center justify-center ">
        <div className="bg-white py-6 pr-7 flex items-center justify-center rounded-r-2xl">
          <img
            src="https://www.ikea.com/ext/ingkadam/m/7c4ea92ed589af36/original/PH168827-crop001.jpg?f=xl"
            className="w-[700px] rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
export default Shipping;
