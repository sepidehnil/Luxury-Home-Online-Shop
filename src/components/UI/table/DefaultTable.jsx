import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import axios from "axios";

const DefaultTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    return await axios
      .get("http://localhost:8000/api/orders")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };
  console.log(data);
  return <div>hvhgv</div>;
};
export default DefaultTable;
