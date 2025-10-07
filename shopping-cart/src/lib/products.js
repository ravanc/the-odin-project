export default async function loader() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
  } catch (err) {
    throw new Error(err);
  }
}
