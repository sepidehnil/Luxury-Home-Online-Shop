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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", JSON.stringify(date));
  };

  const updatedData = {
    firstname: name,
    lastname: lastName,
    address,
    phoneNumber,
  };

  localStorage.setItem("userData", JSON.stringify(updatedData));

  const handleSave = (e) => {
    e.preventDefault();
  };

  function convertToPersianNumbers(input) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return input.replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
  }

  return (
    <div className="h-[745px] bg-[url('https://www.ikea.com/images/a-boho-bedroom-with-a-double-bed-draped-in-neutral-bed-linen-feed733279e7de1f79945bec7e45b02c.jpg?f=sg')] bg-no-repeat ">
      <form
        className="w-[400px] h-full p-8 bg-transparent backdrop-blur-xl flex flex-col font-secondary gap-5"
        onSubmit={handleSave}
      >
        <label htmlFor="fname">نام: </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-2 py-1 px-1 rounded-lg outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lname">نام خانوادگی: </label>
        <input
          type="text"
          id="lname"
          name="lname"
          className="border-2 py-1 px-2 rounded-lg outline-none"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="address">ادرس: </label>
        <textarea
          id="address"
          name="address"
          rows="5"
          className="rounded-lg outline-none py-1 px-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <label htmlFor="phone">تلفن همراه: </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="border-2 py-1 px-2 rounded-lg outline-none"
          value={convertToPersianNumbers(phoneNumber)}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="date">تاریخ تحویل: </label>
        {selectedDate && (
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            shouldHighlightWeekends
            locale="fa"
          />
        )}
        <a href="http://localhost:5173/">
          <div className="px-3 py-2 bg-red-600 border-none rounded-lg justify-center flex">
            ثبت سفارش
          </div>
        </a>
      </form>
    </div>
  );
}
export default Shipping;
