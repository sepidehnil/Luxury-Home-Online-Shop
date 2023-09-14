import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import publicAxios from "../../services/instances/publicAxios";
import Cookies from "js-cookie";

function Shipping() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

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
        // setDate(""); // Initialize the date input with an empty string
      });
    }
  }, []);
  console.log(data);

  const handleSave = (e) => {
    e.preventDefault();

    const updatedData = {
      firstname: name,
      lastname: lastName,
      address,
      phoneNumber,
    };

    const form = new FormData();
    for (const key in updatedData) {
      const value = updatedData[key];
      if (Array.isArray(value)) {
        value.forEach((v) => {
          form.append(key, v);
        });
      } else {
        form.append(key, value);
      }
    }

    publicAxios
      .patch(`/users/${data._id}`, form)
      .then(() => {
        console.log("User data updated successfully.");
        // You can navigate to the next page or handle success as needed.
        navigate("/pay");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="date">تاریخ تحویل: </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border-2 py-1 px-2 rounded-lg outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          type="submit"
          className="flex w-full py-2 px-2 justify-center mt-7 bg-red-600 rounded-lg "
        >
          ثبت سفارش
        </button>
      </form>
    </div>
  );
}

export default Shipping;
