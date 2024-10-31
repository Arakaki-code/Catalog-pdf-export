// components/ProductForm/ProductForm.tsx
import React, { FormEvent, useState } from "react";
import { Product, ProductVariation } from "../../hooks/useProducts";
import { generateUniqueCode } from "../../utils/utils";
import styles from "./ProductForm.module.scss";
import ProductMainFields from "../ProductMainFields/ProductMainFields";
import ProductVariationFields from "../ProductVariationFields/ProductVariationFields";
import ProductFormButtons from "../ProductFormButtons/ProductFormButtons";
import ListVariations from "../ListVariations/ListVariations";
import useValidation from "@/src/hooks/useValidation";
import Divisor from "../DivisorLine/DivisorLine";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  submitButtonLabel?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData = {
    id: 0,
    image: "",
    code: "",
    description: "",
    category: "",
    variations: [],
  },
  onSubmit,
  submitButtonLabel = "Salvar",
}) => {
  const [formData, setFormData] = useState<Product>(initialData);
  const [newVariation, setNewVariation] = useState<ProductVariation>({
    code: "",
    description: "",
    price: 0,
    unit: "",
  });

  const {
    productValidate,
    productErrors,
    setProductErrors,
    variationValidate,
    variationErrors,
    setVariationErrors,
  } = useValidation();

  const isSaveButtonDisabled = formData.variations?.length === 0;

  const addVariation = () => {
    if (!variationValidate(newVariation)) return;

    const variationWithCode = {
      ...newVariation,
      code: generateUniqueCode(),
    };

    setFormData((prev) => ({
      ...prev,
      variations: [...prev.variations, variationWithCode],
    }));

    setNewVariation({
      code: "",
      description: "",
      price: 0,
      unit: newVariation.unit,
    });
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    const productWithCode = {
      ...formData,
      code: generateUniqueCode(),
    };

    if (productValidate(productWithCode)) {
      onSubmit(productWithCode); // Envia o formulário se válido
    }
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <ProductMainFields
        formData={formData}
        setFormData={setFormData}
        productErrors={productErrors}
        setProductErrors={setProductErrors}
      />

      <Divisor />
      
      <ProductVariationFields
        newVariation={newVariation}
        setNewVariation={setNewVariation}
        variationErrors={variationErrors}
      />

      <ProductFormButtons
        addVariation={addVariation}
        handleSubmit={handleSubmit}
        isSaveButtonDisabled={isSaveButtonDisabled}
        submitButtonLabel={submitButtonLabel}
      />

      <ListVariations productForm={formData} setProductForm={setFormData} />
    </form>
  );
};

export default ProductForm;
