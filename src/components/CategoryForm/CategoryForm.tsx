import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { CategoryOption, useCategory } from "../../hooks/useCategory";

import styles from "./CategoryForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Divisor from "../DivisorLine/DivisorLine";

interface CategoryFormProps {
  initialCategory?: CategoryOption;
  onSubmit: (data: CategoryOption) => void;
  submitButtonLabel?: string;
  onCancel?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialCategory,
  onSubmit,
  submitButtonLabel,
  onCancel,
}) => {
  const [categoryData, setCategoryData] = useState<CategoryOption>({ ...initialCategory,  code: "", value: "", label: "", color: "" });
  const { generateCode, formatLabelToValue } = useCategory();

  useEffect(() => {
    if (initialCategory) {
      setCategoryData(initialCategory);
    } else {
      setCategoryData({ code: "", value: "", label: "", color: "" });
    }
  }, [initialCategory]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedLabel = formatLabelToValue(categoryData.label);
    const newCategory = {
      ...categoryData,
      value: formattedLabel,
      code: categoryData.code || generateCode(), 
    };
    onSubmit(newCategory);

    console.log(newCategory);
  };

  return (
    <form className={styles.container_form} onSubmit={handleSubmit}>
      <div className={styles.content_inputs}>
        <Input
          type="text"
          name="label"
          label="Nome da categoria"
          value={categoryData.label}
          onChange={handleChange}
          placeholder="Nome da categoria"
        />
        <Input
          type="color"
          name="color"
          label="Cor"
          value={categoryData.color}
          onChange={handleChange}
          placeholder="Cor"
          stylesInput="color_input"
        />
      </div>
      <Divisor />
      <div className={styles.content_buttons}>
        <Button
          btnStyle="primary"
          className={styles.button_cancel}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          width="160px"
          btnStyle="btn_borderline"
          className={styles.button_save}
        >
          {submitButtonLabel || "Salvar"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
