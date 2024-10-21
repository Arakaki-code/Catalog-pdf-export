import { useState } from "react";

interface CategoryOption {
  value: string | number;
  label: string;
}

interface Product {
    id: number;
    code: string;
    image: string;
    description: string;
    category: string;
  }

export function useCategory(initialCategory: string  = "", products: Product[] = []) {
  const [selectedCategory, setSelectedCategory] = useState<string >(
    initialCategory
  );

  const optionsCategory: CategoryOption[] = [
    { value: "", label: "Todas Categorias" },
    { value: "eletrica", label: "Elétrica" },
    { value: "hidraulica", label: "Hidráulica" },
  ];

  const handleCategory = (value: string) => {
    setSelectedCategory(value);
  };

  const getCategoryLabel = () => {
    const selected = optionsCategory.find(
      (option) => option.value === selectedCategory
    );
    return selected ? selected.label : "Selecionar categoria";
  };


  return {
    selectedCategory,
    handleCategory,
    optionsCategory,
    getCategoryLabel,
  };
}
