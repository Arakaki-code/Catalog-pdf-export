import { useState, useCallback } from "react";

export interface ProductVariation {
  code: string;
  description: string;
  price: number | string;
  unit: string;
}

export interface Product {
  id: number;
  code: string;
  image: string;
  description: string;
  category: string;
  variations: ProductVariation[];
}

const initialProducts: Product[] = [
  {
    id: 1,
    image: "./img-product.png",
    code: "123456",
    description: "Furadeira",
    category: "eletrica",
    variations: [
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
    ],
  },
  {
    id: 2,
    image: "./img-product.png",
    code: "123483",
    description: "Objeto",
    category: "hidraulica",
    variations: [
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
    ],
  },
  {
    id: 3,
    image: "./img-product.png",
    code: "987654",
    description: "Outro objeto",
    category: "hidraulica",
    variations: [
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
      {
        code: "pathproduct",
        description: "Furadeira axb",
        price: 120.0,
        unit: "unidade",
      },
    ],
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [variation, setVariation] = useState<ProductVariation>(
    {
      code: "",
      description: "",
      price: "",
      unit: "",
    },
  );

  // Função para filtrar produtos por categoria
  const filterProducts = useCallback(
    (selectedCategory: string | number) => {
      if (!selectedCategory) return products;
      return products.filter(
        (product) =>
          product.category.toLowerCase() ===
          String(selectedCategory).toLowerCase()
      );
    },
    [products]
  );

  // Adicionar ou editar um produto
  const addOrEditProduct = useCallback(
    (product: Product, editingProduct?: Product) => {
      setProducts((prev) => editingProduct
          ? prev.map((p) => p.id === editingProduct.id ? { ...product, id: p.id } : p)
          : [...prev, { ...product, id: prev.length + 1 }]
      );
    },
    []
  );

  // Remover um produto
  const removeProduct = useCallback((code: string) => {
    setProducts((prev) => prev.filter((product) => product.code !== code));
  }, []);

  return {
    products,
    filterProducts,
    addOrEditProduct,
    removeProduct,
    variation,
    setVariation,
  };
}
