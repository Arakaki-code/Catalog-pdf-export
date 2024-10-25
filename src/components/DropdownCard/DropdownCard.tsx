import { useState, useEffect } from 'react';
import styles from './DropdownCard.module.scss';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Button from '../Button/Button';
import { ProductVariation } from '../../hooks/useProducts';
import useValidation from '../../hooks/useValidation';

interface DropdownCardProps {
  variation: ProductVariation | null;
  onSave: (variation: ProductVariation) => void;
  onCancel: () => void;
}

const optionsUnit = [
  { value: 'Unid', label: 'Unidade' },
  { value: 'Pçs', label: 'Peça' },
  { value: 'Kg', label: 'Kilo' },
  { value: 'Lts', label: 'Litro' },
];

const DropdownCard: React.FC<DropdownCardProps> = ({ variation, onSave, onCancel }) => {
  const [localVariation, setLocalVariation] = useState<ProductVariation>(
    variation || { code: '', description: '', price: 0, unit: '' }
  );
  const { variationErrors, variationValidate, setVariationErrors } = useValidation()


  
  useEffect(() => {
    if (variation && variation !== localVariation) {
      setLocalVariation(variation);
    }

  }, [variation]);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (parseFloat(numericValue) / 100)
      .toFixed(2)
      .replace('.', ',');
    return formattedValue;
  };

  const handlePriceChange = (value: string) => {
    if (value === '') {
      handleChange('price', 0); 
      return;
    }
    const sanitizedValue = value.replace(/[^\d,]/g, '');
    handleChange('price', sanitizedValue);
  };

  const handleChange = (field: keyof ProductVariation, value: string | number) => {
    setLocalVariation((prev) => ({ ...prev, [field]: value }));


    if (field === "description") {
      setVariationErrors((prev) => ({ ...prev, description: "" }));
    }

    if (field === "unit") {
      setVariationErrors((prev) => ({ ...prev, unit: "" }));
    }
    if (field === "price") {
      setVariationErrors((prev) => ({ ...prev, price: "" }));
    }
  };


  const handleSave = () => {
    if (variationValidate(localVariation)) {
      onSave(localVariation);
    }
  };



  return (
    <div className={styles.dropdownCard}>
      <div className={styles.dropdown_fields}>
        <Input
          name="variation-description"
          value={localVariation.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descrição do produto"
          error={variationErrors["description"]}

        />

        <Input
          name="variation-price"
          value={formatCurrency(localVariation.price.toString())}
          onChange={(e) => handlePriceChange(e.target.value)}
          error={variationErrors["price"]}
          placeholder="R$ 0,00"
        />

        <Select
          name="variation-unit"
          value={localVariation.unit}
          options={optionsUnit}
          onChange={(value) => handleChange('unit', value)}
          selectStyles="secondary"
          placeholder="Selecionar unidade"
          error={variationErrors["unit"]}

        />
      </div>

      <div className={styles.dropdown_buttons}>
        <Button btnStyle="primary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button btnStyle="primary" onClick={handleSave}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default DropdownCard;
