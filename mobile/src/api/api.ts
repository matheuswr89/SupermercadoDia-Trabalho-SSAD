import axios from "axios";

export async function getProductsApi() {
  const response = await axios.get(
    "https://www.redbullshopus.com/products.json"
  );
  const products = response.data.products.map((p: any) => {
    return {
      id: p.id,
      title: p.title,
      description: p.body_html,
      image: p.images[0].src,
      price: p.variants[0].price,
      quantity: 0,
    };
  });
  return products;
}
