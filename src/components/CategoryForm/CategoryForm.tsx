import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { CategoryOption, useCategory } from "../../hooks/useCategory";
import { generateUniqueCode } from "../../utils/utils";

import styles from "./CategoryForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Divisor from "../DivisorLine/DivisorLine";
import ColorSelect from "../ColorSelect/ColorSelect";
import useValidation from "@/src/hooks/useValidation";

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryOption>({
    ...initialCategory,
    code: "",
    value: "",
    label: "",
    color: "",
  });
  const { formatLabelToValue } = useCategory();
  const { categoryValidate, categoryErrors, setCategoryErrors } =
    useValidation();

  useEffect(() => {
    if (initialCategory) {
      setCategoryData(initialCategory);
    } else {
      setCategoryData({ code: "", value: "", label: "", color: "" });
    }

  }, [initialCategory]);

  useEffect(() => {
    const hasChanges = JSON.stringify(categoryData) !== JSON.stringify(initialCategory);
    setIsButtonDisabled(!hasChanges);
  }, [categoryData, initialCategory]);
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));

    if (categoryErrors[name]) {
      setCategoryErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleColorChange = (color: string) => {
    setCategoryData((prev) => ({ ...prev, color }));

    if (categoryErrors["color"]) {
      setCategoryErrors((prev) => ({ ...prev, color: "" }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedLabel = formatLabelToValue(categoryData.label);

    const newCategory = {
      ...categoryData,
      value: formattedLabel,
      code: categoryData.code || generateUniqueCode(),
    };

    if (categoryValidate(newCategory)) {
      onSubmit(newCategory);
    }
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
          error={categoryErrors.label}
        />
        <ColorSelect
          initialColor={categoryData.color}
          onColorChange={handleColorChange}
          isEdit={true}
          error={categoryErrors["color"]}
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
          disabled={isButtonDisabled}
        >
          {submitButtonLabel || "Salvar"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
