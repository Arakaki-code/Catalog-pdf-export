import React from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { ProductVariation } from "../../hooks/useProducts";
import { optionsUnit, formatCurrency  } from "../../utils/utils";
import useValidation from "@/src/hooks/useValidation";
import styles from "./ProductVariationFields.module.scss";

interface ProductVariationFieldsProps {
  newVariation: ProductVariation;
  setNewVariation: React.Dispatch<React.SetStateAction<ProductVariation>>;
  variationErrors: Record<string, string>;
}

const ProductVariationFields: React.FC<ProductVariationFieldsProps> = ({
  newVariation,
  setNewVariation,
  variationErrors,
}) => {
  const { variationValidate, setVariationErrors } = useValidation();

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

  return (
    <div className={styles.container}>
      <h4>Variações do produto</h4>
      <div className={styles.product_variation_fields}>
        <Input
          label="Produto variável"
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
    </div>
  );
};

export default ProductVariationFields;
