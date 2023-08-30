import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";

function ProductDetail() {
  const { products } = useProduct();
  const categories = useSelector((state) => state.categories.categories);
  const { productId } = useParams();
  use

  const filteredproductsDetail = products.data.products.filter(
    (item) => item._id === productId
  );
  console.log(filteredproductsDetail);

  function handleClick(){

  }
  return (
    <div>
      {filteredproductsDetail.map((product) => (
        <div>
          <div>{product.name}</div>
          <img
            src={`http://localhost:8000/images/products/images/${product.images[0]}`}
          />
          <div>{product.price}</div>
          <div>{product.description}</div>
          <button onClick={handleClick}>افزودن به سبد خرید</button>
        </div>
      ))}
    </div>
  );
}
export default ProductDetail;
