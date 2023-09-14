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
import PagesHeader from "../../components/UI/header/PagesHeader";

function ProductDetail() {
  const { isLoading, products } = useProduct();
  const { productId } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [counter, setCounter] = useState(1);
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
    setCounter(counter + 1);
  }

  function handleDecrement() {
    setSelectedQuantity(Math.max(selectedQuantity - 1, 1));
    setCounter(counter - 1);
  }

  function handleAddToCart(event) {
    event.preventDefault();
    addToCartHandler(selectedQuantity);
  }

  return (
    <div>
      <PagesHeader />

      <div className="overflow-hidden p-14 mt-2">
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
                <div className="border-2 mt-5 w-[300px] border-[#fdd262]"></div>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="my-10 w-[600px]"
                />
                <span className="my-10">{` قیمت کالا : ${product.price.toLocaleString(
                  "fa"
                )} تومان`}</span>
                <div className="mt-10 mb-5 flex justify-start">
                  <div className="px-[60px] py-[8px] bg-[#141b2d] rounded-3xl gap-3 flex justify-center items-center ">
                    <button
                      onClick={handleAddToCart}
                      className="font-secondary text-md text-white"
                    >
                      افزودن به سبد خرید
                    </button>
                    <img src={carIcon} alt="cart icon" />
                  </div>
                </div>

                <div className="rounded-lg flex justify-start">
                  <div className="bg-[#141b2d] flex items-center gap-8 rounded-full">
                    <div
                      className="bg-[#fdd262] hover:p-5 duration-500 p-3 rounded-full hover:bg-[#7AA668] cursor-pointer"
                      onClick={handleIncrement}
                    >
                      <img src={plus} />
                    </div>
                    <input
                      className="bg-transparent outline-none text-2xl flex items-center justify-center w-5 text-white"
                      id="tentacles"
                      name="tentacles"
                      min="1"
                      max={product.quantity}
                      step="1"
                      value={selectedQuantity.toLocaleString("fa")}
                      onChange={(e) =>
                        setSelectedQuantity(Number(e.target.value))
                      }
                    />
                    <div
                      className="bg-[#fdd262] hover:p-5 duration-500 p-3 rounded-full hover:bg-[#7AA668] cursor-pointer"
                      onClick={handleDecrement}
                    >
                      <img src={minus} />
                    </div>
                  </div>
                </div>
                {counter > product.quantity ? (
                  <p className="mt-3 text-red-600">
                    از این کالا {product.quantity} عدد موجود می باشد.
                  </p>
                ) : (
                  <p></p>
                )}
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
                            className="border-2 border-gray-200 rounded-2xl"
                          />
                        </Slide>
                      ))}
                    </Slider>
                  </CarouselProvider>
                </div>

                <div className="w-2/12 flex flex-col gap-10">
                  {product?.images.map((item, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/images/products/images/${item}`}
                      alt={`Thumbnail ${index}`}
                      className={`cursor-pointer ${
                        index === selectedImageIndex
                          ? "border-2 border-gray-300 rounded-xl shadow-xl"
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
    </div>
  );
}

export default ProductDetail;
