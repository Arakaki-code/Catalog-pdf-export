import { useState } from "react";

export interface Product {
  id: number;
  code: string;
  image: string;
  description: string;
  category: string ;
}

const initialProducts: Product[] = [
  {
    id: 1,
    image: "./img-product.png",
    code: "123456",
    description: "Furadeira",
    category: "eletrica",
  },
  {
    id: 2,
    image: "./img-product.png",
    code: "123483",
    description: "Objeto",
    category: "hidraulica",
  },
  {
    id: 3,
    image: "./img-product.png",
    code: "987654",
    description: "Outro objeto",
    category: "hidraulica",
  },
];

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts); 
  
  const filterProducts = (selectedCategory: string | number) => {
    if (!selectedCategory || selectedCategory === "") return products;
    return products.filter(
      (product) => product.category.toLowerCase() === selectedCategory
    );
  };

  const addOrEditProduct = (product: Product, editingProduct?: Product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...product, id: p.id } : p
        )
      );
    } else {
      const newProduct = { ...product, id: products.length + 1 };
      setProducts((prev) => [...prev, newProduct]);
    }
  };

  const removeProduct = (code: string) => {
    setProducts(prev => prev.filter(product => product.code !== code));
  };

  return {
    products,
    filterProducts,
    addOrEditProduct,
    removeProduct,
  };
}
