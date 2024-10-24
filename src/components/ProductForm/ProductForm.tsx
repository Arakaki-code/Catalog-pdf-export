import styles from "./ProductForm.module.scss";
import React, { FormEvent, useState } from "react";
import { Product, ProductVariation } from "../../hooks/useProducts";
import Input from "../Input/Input";
import ImageCard from "../ImageCard/ImageCard";
import Select from "../Select/Select";
import DivisorLine from "../DivisorLine/DivisorLine";
import CardProduct from "../Card/Card";
import Button from "../Button/Button";
import { GiSaveArrow } from "react-icons/gi";
import DropdownCard from "../DropdownCard/dropdownCard";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  submitButtonLabel?: string;
}

const optionsCategory = [
  { value: "eletrica", label: "Elétrica" },
  { value: "hidraulica", label: "Hidráulica" },
];
const optionsUnit = [
  { value: "unidade", label: "Unidade" },
  { value: "peca", label: "Peça" },
  { value: "kg", label: "Kg" },
  { value: "litro", label: "Litro" },
];

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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [variationErrors, setVariationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.description)
      errors.description = "Nome do produto é necessária.";
    if (!formData.category) errors.category = "Categoria necessária.";
    if (!formData.image) errors.image = "Imagem do produto é necessária.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateVariation = () => {
    const errors: { [key: string]: string } = {};

    if (!newVariation.description) {
      errors.description = "Descrição do produto necessária.";
    }
    if (newVariation.price <= 0) {
      errors.price = "Preço deve ser maior que zero.";
    }
    if (!newVariation.unit) {
      errors.unit = "Selecionar um tipo de unidade";
    }

    setVariationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isSaveButtonDisabled = formData.variations?.length === 0;

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
    if (!validateVariation()) return;

    const variationWithCode = {
      ...newVariation,
      code: generateUniqueCode(),
    };

    setFormData((prev) => ({
      ...prev,
      variations: [...prev?.variations, variationWithCode],
    }));

    setNewVariation({
      code: "",
      description: "",
      price: 0,
      unit: newVariation.unit,
    });
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (parseFloat(numericValue) / 100)
      .toFixed(2)
      .replace(".", ",");
    return formattedValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "description") {
      setFormErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setFormErrors((prev) => ({ ...prev, category: "" }));
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    const productWithCode = {
      ...formData,
      code: generateUniqueCode(),
    };

    console.log("Produto enviado:", productWithCode);

    if (validateForm()) onSubmit(productWithCode);
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
              setFormErrors((prev) => ({ ...prev, image: "" }));
          }}
          error={formErrors["image"]}
        />

        <div className={styles.main_form}>
          <Input
            label="Produto"
            name="description"
            className={styles.product_description}
            value={formData.description}
            onChange={handleChange}
            placeholder="Nome do produto"
            error={formErrors["description"]}
          />

          <Select
            label="Categoria"
            name="category"
            className={styles.product_category}
            options={optionsCategory}
            onChange={handleCategoryChange}
            value={formData.category}
            placeholder="Selecionar categoria"
            selectStyles="secondary"
            error={formErrors["category"]}
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

      <div className={styles.list_variations}>
        {formData.variations?.length > 0 ? (
          formData.variations?.map((variation, index) => (
            <CardProduct
              key={index}
              isVariationMode
              code={variation.code}
              description={variation.description}
              price={formatCurrency(variation.price.toString())}
              unit={variation.unit}
              onEdit={() => "editando"}
              onDelete={() => "deletando"}
            />
          ))
        ) : (
          <span className={styles.list_variations_span}>
            Adicione ao menos uma variação do produto para salvar
          </span>
        )}
        <DropdownCard />
      </div>
    </form>
  );
};

export default ProductForm;
