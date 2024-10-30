import { useState } from "react";
import { optionsCategory } from "../utils/utils";

export interface CategoryOption {
  value: string | number;
  label: string;
  color?: string;
  code?: string;
}

const initialCategories: CategoryOption[] = [
  { value: "eletrica", label: "Elétrica", code: "zs2fxk1", color: "#fb8500" },
  { value: "hidraulica", label: "Hidráulica", code: "zs2fxk2", color: "#219ebc"},
  { value: "eletronicos", label: "Eletrônicos" , code: "zs2fxk2", color: "#588157"},
];


export function useCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string >("");
  const[categories, setCategories] = useState<CategoryOption[]>(initialCategories);


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
    categories,
    setCategories,
  };
}
