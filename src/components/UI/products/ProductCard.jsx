import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = (props) => (
  <Card
    hoverable
    style={{
      width: 420,
      height: 400,
    }}
    cover={
      <Link to={`/products/${props.id}`}>
        <img alt={props.name} src={props.image} />
      </Link>
    }
    className="font-secondary"
  >
    <Meta title={props.name} description={`Price: ${props.price}`} />
    <Link to={`/products/${props.id}`}>View Details</Link>
  </Card>
);

export default ProductCard;
