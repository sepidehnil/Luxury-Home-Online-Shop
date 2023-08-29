import { Link } from "react-router-dom";
function ProductDetail() {
  return (
    <>
      <h1>product details</h1>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}
export default ProductDetail;
