import { useEffect, useState } from "react";
import publicAxios from "../../services/instances/publicAxios";
import Cookies from "js-cookie";
import { Calendar, theme } from "antd";

function Shipping() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 400,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onPanelChange = (value, mode) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    localStorage.setItem("selectedDate", selectedDate);
  };

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

  const updatedData = {
    firstname: name,
    lastname: lastName,
    address,
    phoneNumber,
  };

  localStorage.setItem("userData", JSON.stringify(updatedData));

  const cartData = localStorage.getItem("cartData");
  const cartObject = JSON.parse(cartData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) {
      errors.name = "Enter you're name!";
    }

    if (!lastName.trim()) {
      errors.lastName = "Enter you're lastName!";
    }

    if (!address.trim()) {
      errors.address = "Enter you're address!";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Enter you're phone number!";
    }

    if (!selectedDate) {
      errors.selectedDate = "Select you're delivery date!";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Form data submitted:", updatedData);
      if (cartObject.items.length > 0) {
        window.location.href = "http://localhost:5173/";
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="bg-[#24272c] flex justify-between ">
      <div>
        <form
          className="w-[500px] bg-transparent backdrop-blur-xl flex flex-col font-secondary gap-5 p-10"
          onSubmit={handleSubmit}
        >
          {cartObject.items.length === 0 ? (
            <p className="text-red-500">Your cart is empty</p>
          ) : (
            ""
          )}
          <label htmlFor="fname" className="text-white">
            Name:
          </label>
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
            LastName:
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
            Address:
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
            Phone number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className={`border-2 py-1 px-2 rounded-lg outline-none ${
              formErrors.phoneNumber ? "border-red-500" : ""
            }`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {formErrors.phoneNumber && (
            <span className="text-red-500">{formErrors.phoneNumber}</span>
          )}
          <label htmlFor="date" className="text-white">
            Deliver Date:
          </label>
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
          {formErrors.selectedDate && (
            <span className="text-red-500">{formErrors.selectedDate}</span>
          )}
          <button
            className="px-3 py-2 bg-red-600 border-none rounded-lg justify-center flex text-white"
            type="submit"
          >
            Place order
          </button>
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
