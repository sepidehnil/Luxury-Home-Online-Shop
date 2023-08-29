import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
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
    <Meta title={name} description={`Price: ${price}`} />
    <Link to={`/products/${id}`}>View Details</Link>
  </Card>
);

export default ProductCard;
