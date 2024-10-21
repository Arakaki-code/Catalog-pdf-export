import styles from "./ProductForm.module.scss";
import React, { FormEvent, useRef, useState } from "react";
import { Product } from "../../hooks/useProducts";
import Input from "../Input/Input";
import ImageCard from "../ImageCard/ImageCard";
import Select from "../Select/Select";

interface ProductFormProps {
  initialData?: Product; // Dados iniciais para edição, opcional
  onSubmit: (data: Product) => void; // Função chamada ao enviar o formulário
  submitButtonLabel?: string; // Rótulo customizável para o botão de submit
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
  },
  onSubmit,
  submitButtonLabel = "Salvar",
}) => {
  const [formData, setFormData] = useState<Product>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string | number) => {
    setFormData((prev) => ({ ...prev, category: value as string }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { image, code, description, category } = formData;
    if (!image || !code || !description || !category) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    console.log("Produto enviado:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.product_main_content}>
        <ImageCard
          className={styles.product_image}
          src={formData.image}
          onRemove={() => setFormData({ ...formData, image: "" })}
          onChange={(image) => setFormData({ ...formData, image })}
        />

        <div className={styles.main_form}>
          <Input
            label="Código"
            name="code"
            className={styles.product_code}
            value={formData.code}
            onChange={handleChange}
            placeholder="Código do produto"
          />
          <Select
            label="Categoria"
            name="category"
            className={styles.product_category}
            options={optionsCategory}
            onChange={handleSelectChange}
            value={formData.category}
            placeholder={"Selecionar categoria"}
            selectStyles="secondary"
          />
          
          <Input
            label="Produto"
            name="description"
            className={styles.product_description}
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição do produto"
          />

          
        </div>
      </div>

      <button
        type="submit"
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default ProductForm;
