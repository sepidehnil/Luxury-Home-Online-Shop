import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";
import carIcon from "../../assets/svg/cartIcon.svg";
import { useState } from "react";
import { Carousel } from "antd";

function ProductDetail() {
  const { isLoading, products } = useProduct();
  const categories = useSelector((state) => state.categories.categories);
  const { productId } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const filteredproductsDetail = products?.data.products.filter(
    (item) => item._id === productId
  );

  console.log(filteredproductsDetail);
  function handleIncrement() {
    // Increment the selected quantity if within stock range
    if (selectedQuantity < filteredproductsDetail[0].quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  }

  function handleDecrement() {
    // Decrement the selected quantity if greater than or equal to 1
    setSelectedQuantity(Math.max(selectedQuantity - 1, 1));
  }

  function handleAddToCart() {
    // Add the selected product with quantity to the cart
    // You can implement your cart logic here
    console.log(
      `Added ${selectedQuantity} units of product ${productId} to the cart.`
    );
  }

  if (isLoading) {
    return <p>loading</p>;
  }
  // console.log(product.description);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div>
      {filteredproductsDetail.map((product) => {
        console.log(product);
        return (
          <div key={product._id}>
            <div>{product.name}</div>

            <Carousel afterChange={onChange}>
              {product?.images.map((item, index) => (
                <div key={index}>
                  <img
                    src={`http://localhost:8000/images/products/images/${item}`}
                  />
                </div>
              ))}
            </Carousel>

            <div>{product.price}</div>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />

            <div className="px-[20px] py-[8px] bg-red-800 bord rounded-3xl flex gap-5 items-center justify-center">
              <div className="px-[12px] py-[3px] rounded-2xl bg-red-600 flex items-center justify-center text-md">
                {selectedQuantity}
              </div>
              <button onClick={handleIncrement}>+</button>
              <button onClick={handleDecrement}>-</button>
              <input
                type="number"
                id="tentacles"
                name="tentacles"
                min="0"
                max={product.quantity}
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              />
              <button onClick={handleAddToCart}>
                سبد خرید
                <img src={carIcon} alt="cart icon" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductDetail;
