import { useState, useCallback } from 'react';
import { Product, ProductVariation } from './useProducts'

interface ValidationErrors {
  [key: string]: string;
}

const useValidation = () => {

  const [variationErrors, setVariationErrors] = useState<ValidationErrors>({});
  const [productErrors, setProductErrors] = useState<ValidationErrors>({});


  const variationValidate = useCallback((variation: ProductVariation) => {
    const validationErrors: ValidationErrors = {};

    if (!variation.description) {
      validationErrors.description = 'Descrição do produto necessária.';
    }

    if (!variation.price || parseFloat(variation.price.toString()) <= 0) {
      validationErrors.price = 'Preço deve ser maior que zero.';
    }

    if (!variation.unit) {
      validationErrors.unit = 'Selecionar um tipo de unidade.';
    }

    setVariationErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, []);

  const productValidate = useCallback((product: Product) => {
    const validationErrors: ValidationErrors = {};

    if (!product.description) {
      validationErrors.description = 'Nome do produto é necessário.';
    }

    if (!product.category) {
      validationErrors.category = 'Categoria necessária.';
    }

    if (!product.image) {
      validationErrors.image = 'Imagem do produto é necessária.';
    }

    setProductErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, []);

  return { variationErrors, variationValidate, setVariationErrors, productValidate, productErrors, setProductErrors };
};

export default useValidation;
