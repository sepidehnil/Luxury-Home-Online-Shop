import ProductCard from "../card/ProductCard";

function ProductPrev({ categories, products, categoryId, name }) {
  const filteredProducts = products.data.products.filter(
    (item) => item.category === categoryId
  );
  console.log(filteredProducts);

  const lastSixProducts = filteredProducts.slice(
    Math.max(filteredProducts.length - 6, 0)
  );
  return (
    <section>
      <h1 className="text-3xl font-semibold font-secondary py-8 px-8">
        {name}
      </h1>
      <div className="flex w-11/12 gap-6 flex-wrap m-auto">
        {lastSixProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            image={`http://localhost:8000/images/products/images/${product.images[0]}`}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
    </section>
  );
}
export default ProductPrev;
