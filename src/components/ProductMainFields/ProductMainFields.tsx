import React from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import ImageCard from "../ImageCard/ImageCard";
import { Product } from "../../hooks/useProducts";
import { useCategory } from "../../hooks/useCategory";
import styles from "./ProductMainFields.module.scss";

interface ProductMainFieldsProps {
  formData: Product;
  setFormData: React.Dispatch<React.SetStateAction<Product>>;
  productErrors: Record<string, string>;
  setProductErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const ProductMainFields: React.FC<ProductMainFieldsProps> = ({
  formData,
  setFormData,
  productErrors,
  setProductErrors,
}) => {
  const { categories } = useCategory();

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

  return (
    <div className={styles.product_main_fields}>
      <ImageCard
        className={styles.product_image}
        src={formData.image}
        onRemove={() => setFormData({ ...formData, image: "" })}
        onChange={(image) => {
          setFormData({ ...formData, image });
          setProductErrors((prev) => ({ ...prev, image: "" }));
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
  );
};

export default ProductMainFields;
