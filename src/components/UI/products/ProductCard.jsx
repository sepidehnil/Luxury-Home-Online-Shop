import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

function convertToPersianNumbers(input) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const inputString = String(input);
  const numberWithCommas = inputString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const persianNumberString = numberWithCommas.replace(
    /[0-9]/g,
    (char) => persianNumbers[parseInt(char)]
  );

  return persianNumberString;
}
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
    <Meta
      title={name}
      description={`قیمت کالا: ${convertToPersianNumbers(price)}`}
    />
    <div className="mt-1 underline underline-offset-4">
      <Link to={`/products/${id}`}>جزئیات بیشتر</Link>
    </div>
  </Card>
);

export default ProductCard;
