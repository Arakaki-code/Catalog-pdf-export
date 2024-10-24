import styles from "./DropdownCard.module.scss";
import { useState } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { ProductVariation } from "@/src/hooks/useProducts";
import Button from "../Button/Button";

interface DropdownCardProps {}
const optionsUnit = [
  { value: "unidade", label: "Unidade" },
  { value: "peca", label: "Peça" },
  { value: "kg", label: "Kg" },
  { value: "litro", label: "Litro" },
];
const DropdownCard = () => {
  const [newVariation, setNewVariation] = useState<ProductVariation>({
    code: "",
    description: "",
    price: 0,
    unit: "",
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (parseFloat(numericValue) / 100)
      .toFixed(2)
      .replace(".", ",");
    return formattedValue;
  };

  const handleNewVariationChange = (
    field: keyof ProductVariation,
    value: string | number
  ) => {
    setNewVariation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.dropdownCard}>
      <div className={styles.dropdown_fields}>
        <Input
          label="Variação do produto"
          name="variation-description"
          placeholder="Descrição do produto"
        />
        <Input
          label="Preço"
          name="variation-price"
          value={formatCurrency(newVariation.price.toString())}
          onChange={(e) => handleNewVariationChange("price", e.target.value)}
          placeholder="R$ 0,00"
        />
        <Select
          label="Unidade"
          name="variation-unit"
          value={newVariation.unit}
          options={optionsUnit}
          onChange={(value) =>
            handleNewVariationChange("unit", value as string)
          }
          selectStyles="secondary"
          placeholder="Selecionar unidade"
        />
      </div>
      <div className={styles.dropdown_buttons}>
        <Button btnStyle="primary">Salvar</Button>

        <Button btnStyle="primary">Cancelar</Button>
      </div>
    </div>
  );
};

export default DropdownCard;
