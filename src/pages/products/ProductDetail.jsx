import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { useDispatch, useSelector } from "react-redux";
import carIcon from "../../assets/svg/cartIcon.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import plus from "../../assets/svg/plus.svg";
import minus from "../../assets/svg/minus.svg";
import { fetchsubcategories } from "../../services/instances/subCategory";
import CartContext from "../../context/cart-context";

function ProductDetail() {
  const { isLoading, products } = useProduct();
  const { productId } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const categories = useSelector((state) => state.categories.categories);
  const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchsubcategories());
  }, [dispatch]);

  const subcategories = useSelector(
    (state) => state.subcategories.subcategories
  );

  if (isLoading) {
    return <p>loading</p>;
  }
  console.log(products);
  const addToCartHandler = (amount) => {
    const product = filteredproductsDetail[0];
    if (product) {
      cartCtx.addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        amount: amount,
        quantity: product.quantity,
        imageUrl: product.images,
      });
    }
  };

  const filteredproductsDetail = products?.data.products.filter(
    (item) => item._id === productId
  );
  const filteredCategories = categories?.data.categories.filter((category) => {
    return category._id === filteredproductsDetail[0]?.category;
  });

  const filteredSubCategories = subcategories?.data.subcategories.filter(
    (subcategory) => {
      return subcategory._id === filteredproductsDetail[0]?.subcategory;
    }
  );

  function handleIncrement() {
    if (selectedQuantity < filteredproductsDetail[0].quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  }

  function handleDecrement() {
    setSelectedQuantity(Math.max(selectedQuantity - 1, 1));
  }

  function handleAddToCart(event) {
    event.preventDefault();
    addToCartHandler(selectedQuantity);
  }

  return (
    <div className="overflow-hidden bg-red-50 p-9">
      {filteredproductsDetail.map((product) => {
        return (
          <div key={product._id} className="flex font-primary gap-11">
            <div>
              <h1 className="font-secondary text-xl font-semibold">
                {product.name}
              </h1>
              <p className="mt-2">
                {filteredCategories[0].name}/ {filteredSubCategories[0].name}
              </p>
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
                    افزودن به سبد خرید
                  </button>
                  <img src={carIcon} alt="cart icon" />
                </div>
                <div className="flex px-[4px] bg-red-700 justify-center gap-1 rounded-lg">
                  <img src={plus} onClick={handleIncrement} />
                  <input
                    className="px-[10px] py-[5px] bg-transparent outline-none text-lg font-semibold"
                    id="tentacles"
                    name="tentacles"
                    type="number"
                    min="1"
                    max={product.quantity}
                    step="1"
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
