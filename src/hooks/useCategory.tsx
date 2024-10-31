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
  
  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8); // Gera um código de 6 caracteres
  };

  const formatLabelToValue = (label: string) =>
    label
      .normalize("NFD") // Decompõe acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .toLowerCase() // Converte para minúsculas
      .replace(/\s+/g, "-"); // Substitui espaços por hífens

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



  return {
    selectedCategory,
    handleCategory,
    optionsCategory,
    getCategoryLabel,
    categories,
    setCategories,
    addCategory,
    editedCategory,
    generateCode,
    formatLabelToValue,
  };
}
