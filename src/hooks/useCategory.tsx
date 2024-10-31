import { useState } from "react";
import { optionsCategory } from "../utils/utils";

export interface CategoryOption {
  value: string | number;
  label: string;
  color?: string;
  code: string;
}

const initialCategories: CategoryOption[] = [
  { value: "eletrica", label: "Elétrica", code: "zs2fxk1", color: "#fb8500" },
  { value: "hidraulica", label: "Hidráulica", code: "zs2fxk2", color: "#219ebc"},
  { value: "eletronicos", label: "Eletrônicos" , code: "zs2fxk3", color: "#588157"},
];


export function useCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string >("");
  const[categories, setCategories] = useState<CategoryOption[]>(initialCategories);
  

  const formatLabelToValue = (label: string) =>
    label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase() 
      .replace(/\s+/g, "-"); 

  const handleCategory = (value: string) => {
    setSelectedCategory(value);
  };

  const getCategoryLabel = () => {
    const selected = optionsCategory.find(
      (option) => option.value === selectedCategory
    );
    return selected ? selected.label : "Selecionar categoria";
  };

  const addCategory = (newCategory: CategoryOption) => {
    setCategories((prev) => [...prev, newCategory  ]);
  };

  const editedCategory = (code: string, updatedData: Partial<CategoryOption>) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.code === code ? { ...category, ...updatedData } : category
      )
    );
  };

  const removeCategory = (code: string) => {
    setCategories((prev) => prev.filter((category) => category.code !== code));
  }



  return {
    selectedCategory,
    handleCategory,
    optionsCategory,
    getCategoryLabel,
    categories,
    setCategories,
    addCategory,
    editedCategory,
    formatLabelToValue,
    removeCategory,
  };
}
