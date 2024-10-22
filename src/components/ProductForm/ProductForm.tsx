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

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  submitButtonLabel?: string;
}

const optionsCategory = [
  { value: "eletrica", label: "Elétrica" },
  { value: "hidraulica", label: "Hidráulica" },
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

  // verificar se o botão deve estar desabilitado
  const isFormIncomplete = () => {
    return (
      formData.variations.length === 0 ||
      formData.image.trim() === "" ||
      formData.description.trim() === "" ||
      formData.category.trim() === ""
    );
  };
  const isSaveButtonDisabled = isFormIncomplete();
  

  const generateUniqueCode = () => `${Math.random().toString(36).substring(2, 10)}`;


  const handleNewVariationChange = (
    field: keyof ProductVariation,
    value: string | number
  ) => {
    setNewVariation((prev) => ({ ...prev, [field]: value }));
  };


  const addVariation = () => {
    if (
      !newVariation.description ||
      newVariation.price <= 0 ||
      !newVariation.unit
    ) {
      alert("Adicionar ao menos uma variação.");
      return;
    }

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

  const formatCurrency = (value: string) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");
    // Converte para float e formata como moeda
    const formattedValue = (parseFloat(numericValue) / 100)
      .toFixed(2)
      .replace(".", ",");
    return formattedValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    const { image, description, category } = formData;
    if (!image || !description || !category) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    console.log("Produto enviado:", formData);
    onSubmit(formData);
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.product_main_fields}>
        <div className={styles.main_form}>
          <Input
            label="Produto"
            name="description"
            className={styles.product_description}
            value={formData.description}
            onChange={handleChange}
            placeholder="Nome do produto"
          />
          <Select
            label="Categoria"
            name="category"
            className={styles.product_category}
            options={optionsCategory}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value as string }))
            }
            value={formData.category}
            placeholder="Selecionar categoria"
            selectStyles="secondary"
          />
        </div>
        <ImageCard
          className={styles.product_image}
          src={formData.image}
          onRemove={() => setFormData({ ...formData, image: "" })}
          onChange={(image) => setFormData({ ...formData, image })}
        />
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
        />
        <Input
          label="Preço"
          name="variation-price"
          type="text"
          value={formatCurrency(newVariation.price.toString())}
          onChange={(e) => handleNewVariationChange("price", e.target.value)}
          placeholder="R$ 0,00"
        />

        <Input
          label="Unidade"
          name="variation-unit"
          value={newVariation.unit}
          onChange={(e) => handleNewVariationChange("unit", e.target.value)}
          placeholder="Uni. | Pçs. | Kg."
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
        {formData.variations.length > 0 ? (
          formData.variations.map((variation, index) => (
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
      </div>
    </form>
  );
};

export default ProductForm;
