export type ProductType = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | ArrayBuffer;
  price: number;
  rating: { rate: number; count: number };
}

export type AddProductReqBodyType = {
  title: string;
  price: number;
  description: string;
  image: string | ArrayBuffer;
  category: string;
};
