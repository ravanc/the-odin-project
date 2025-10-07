export default async function loader(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product;
  } catch (err) {
    throw new Error(err);
  }
}
