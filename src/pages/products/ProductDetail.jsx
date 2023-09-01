import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";
import carIcon from "../../assets/svg/cartIcon.svg";
import { useState } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import plus from "../../assets/svg/plus.svg";
import minus from "../../assets/svg/minus.svg";

function ProductDetail() {
  const { isLoading, products } = useProduct();
  const categories = useSelector((state) => state.categories.categories);
  const { productId } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredproductsDetail = products?.data.products.filter(
    (item) => item._id === productId
  );

  console.log(filteredproductsDetail);
  function handleIncrement() {
    if (selectedQuantity < filteredproductsDetail[0].quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  }

  function handleDecrement() {
    setSelectedQuantity(Math.max(selectedQuantity - 1, 1));
  }

  function handleAddToCart() {

    console.log(
      `Added ${selectedQuantity} units of product ${productId} to the cart.`
    );
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="overflow-hidden bg-red-50 p-9">
      {filteredproductsDetail.map((product) => {
        console.log(product);
        return (
          <div key={product._id} className="flex font-primary gap-11">
            <div>
              <h1 className="font-secondary text-xl font-semibold">
                {product.name}
              </h1>
              <div className="border-2 mt-5 w-[300px] border-gray-500"></div>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="my-10 w-[600px]"
              />
              <span className="my-10">{` قیمت کالا : ${product.price}`}</span>
              <div className="flex justify-center items-center gap-8 mt-[80px]">
                <div className="px-[60px] py-[8px] bg-red-800 rounded-3xl flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="font-secondary font-semibold text-md"
                  >
                    سبد خرید
                  </button>
                  <img src={carIcon} alt="cart icon" />
                </div>
                <div className="flex px-[4px] bg-red-700 justify-center gap-1 rounded-lg">
                  <img src={plus} onClick={handleIncrement} />
                  <input
                    className="px-[10px] py-[5px] bg-transparent w-[30px] outline-none text-lg font-semibold"
                    id="tentacles"
                    name="tentacles"
                    min="0"
                    max={product.quantity}
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(Number(e.target.value))
                    }
                  />
                  <img src={minus} onClick={handleDecrement} />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-5/6">
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={100}
                  totalSlides={product?.images.length}
                  currentSlide={selectedImageIndex}
                >
                  <Slider>
                    {product?.images.map((item, index) => (
                      <Slide key={index} index={index}>
                        <img
                          src={`http://localhost:8000/images/products/images/${item}`}
                          alt={`Image ${index}`}
                        />
                      </Slide>
                    ))}
                  </Slider>
                </CarouselProvider>
              </div>

              {/* Render the Thumbnail Images */}
              <div className="w-2/12 flex flex-col gap-10">
                {product?.images.map((item, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8000/images/products/images/${item}`}
                    alt={`Thumbnail ${index}`}
                    className={`cursor-pointer ${
                      index === selectedImageIndex
                        ? "border border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductDetail;
