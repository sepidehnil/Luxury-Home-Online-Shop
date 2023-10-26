import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import backward from "../../../assets/svg/backwardArrow.svg";
const { Meta } = Card;

const ProductCard = ({ name, price, id, image }) => (
  <Card
    hoverable
    style={{
      width: 420,
      height: 400,
    }}
    cover={
      <Link to={`/products/${id}`}>
        <img alt={name} src={image} />
      </Link>
    }
    className="font-secondary"
  >
    <Meta title={name} description={`Price: $${price}`} />
    <div className="mt-1 underline underline-offset-4">
      <Link to={`/products/${id}`}>
        <div className="flex gap-2">
          <span>More Details</span>
          <img src={backward} />
        </div>
      </Link>
    </div>
  </Card>
);

export default ProductCard;
