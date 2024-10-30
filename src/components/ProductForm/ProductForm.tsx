import React, { FormEvent, useState } from "react";
import { Product, ProductVariation } from "../../hooks/useProducts";
import { useCategory } from "../../hooks/useCategory";
import {optionsUnit} from "../../utils/utils"
import { GiSaveArrow } from "react-icons/gi";

import styles from "./ProductForm.module.scss";
import Input from "../Input/Input";
import ImageCard from "../ImageCard/ImageCard";
import Select from "../Select/Select";
import DivisorLine from "../DivisorLine/DivisorLine";
import Button from "../Button/Button";
import ListVariations from "../ListVariations/ListVariations";
import useValidation from "@/src/hooks/useValidation";

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

  const {categories} = useCategory()
  const [formData, setFormData] = useState<Product>(initialData);
  const [newVariation, setNewVariation] = useState<ProductVariation>({
    code: "",
    description: "",
    price: 0,
    unit: "",
  });
  const {
    productValidate, productErrors, setProductErrors, 
    variationValidate, variationErrors, setVariationErrors
  } = useValidation()

  const isSaveButtonDisabled = formData.variations?.length === 0;

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const parsedValue = numericValue ? parseFloat(numericValue) / 100 : 0; // Retorna 0 se vazio
    return parsedValue.toFixed(2).replace(".", ",");
  };
  const generateUniqueCode = () =>
    `${Math.random().toString(36).substring(2, 10)}`;

  const handleNewVariationChange = (
    field: keyof ProductVariation,
    value: string | number
  ) => {
    if (field === "description") {
      setVariationErrors((prev) => ({ ...prev, description: "" }));
    } else if (field === "price") {
      setVariationErrors((prev) => ({ ...prev, price: "" }));
    } else if (field === "unit") {
      setVariationErrors((prev) => ({ ...prev, unit: "" }));
    }
    setNewVariation((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "description") {
      setProductErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setProductErrors((prev) => ({ ...prev, category: "" }));
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
      <div className={styles.product_main_fields}>
        <ImageCard
          className={styles.product_image}
          src={formData.image}
          onRemove={() => setFormData({ ...formData, image: "" })}
          onChange={(image) => {
            setFormData({ ...formData, image }),
            setProductErrors((prev) => ({ ...prev, image: '' }));
          }}
          error={productErrors["image"]}
        />

        <div className={styles.main_form}>
          <Input
            label="Produto"
            name="description"
            className={styles.product_description}
            value={formData.description}
            onChange={handleChange}
            placeholder="Nome do produto"
            error={productErrors["description"]}
          />

          <Select
            label="Categoria"
            name="category"
            className={styles.product_category}
            options={categories}
            onChange={handleCategoryChange}
            value={formData.category}
            placeholder="Selecionar categoria"
            selectStyles="secondary"
            error={productErrors["category"]}
          />
        </div>
      </div>

      <DivisorLine />

      <h4>Variações do Produto</h4>
      <div className={styles.product_variation_fields}>
        <Input
          label="Variação do produto"
          name="variation-description"
          value={newVariation.description}
          onChange={(e) =>
            handleNewVariationChange("description", e.target.value)
          }
          placeholder="Descrição do produto"
          error={variationErrors["description"]}
        />

        <Input
          label="Preço"
          name="variation-price"
          type="text"
          value={formatCurrency(newVariation.price.toString())}
          onChange={(e) => handleNewVariationChange("price", e.target.value)}
          placeholder="R$ 0,00"
          error={variationErrors["price"]}
        />

        <Select
          label="Unidade"
          name="variation-unit"
          className={styles.product_unit}
          options={optionsUnit}
          onChange={(value) =>
            handleNewVariationChange("unit", value as string)
          }
          value={newVariation.unit}
          selectStyles="secondary"
          placeholder="Selecionar unidade"
          error={variationErrors["unit"]}
        />
      </div>

      <div className={styles.buttons_form}>
        <Button
          icon={<GiSaveArrow />}
          btnStyle={"primary"}
          onClick={addVariation}
        >
          Adicionar Variação do Produto
        </Button>
        <Button
          btnStyle={"primary"}
          disabled={isSaveButtonDisabled}
          onClick={() => handleSubmit()}
        >
          {submitButtonLabel}
        </Button>
      </div>

      <ListVariations productForm={formData} setProductForm={setFormData} />
    </form>
  );
};

export default ProductForm;
