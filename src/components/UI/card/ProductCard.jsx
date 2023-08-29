import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = (props) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt={props.name} src={props.image} />}
  >
    <Meta title={props.name} description={`Price: ${props.price}`} />
    <Link to={`/products/${props.id}`}>View Details</Link>
  </Card>
);

export default ProductCard;
