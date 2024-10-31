import { useState } from "react";
import CardProduct from "../Card/Card";
import DropdownCard from "../DropdownCard/DropdownCard";
import styles from "./ListVariations.module.scss";
import { Product, ProductVariation } from "@/src/hooks/useProducts";
import { formatCurrency } from "@/src/utils/utils";
interface ListVariationsProps {
  productForm: Product; 
  setProductForm: (data: Product) => void; 
}

const ListVariations: React.FC<ListVariationsProps> = ({
  productForm,
  setProductForm,
}) => {
    
  const [showVariation, setShowVariation] = useState<number | null>(null);
  const [editedVariation, setEditedVariation] = useState<ProductVariation | null>(null);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (parseFloat(numericValue) / 100)
      .toFixed(2)
      .replace(".", ",");
    return formattedValue;
  };

  const handleSaveVariation = (updatedVariation: ProductVariation) => {
    const updatedVariations = productForm.variations.map((v, i) =>
      i === showVariation ? updatedVariation : v
    );

    setProductForm({ ...productForm, variations: updatedVariations });
    setShowVariation(null); 
  };

  const handleEditVariation = (index: number) => {
    const selectedVariation = productForm.variations[index];
    setEditedVariation(selectedVariation); 
    setShowVariation(index); 
  };

  const handleDeleteVariation = (index: number) => {
    const updatedVariations = productForm.variations.filter((_, i) => i !== index);
    setProductForm({ ...productForm, variations: updatedVariations });
  };

  const handleCancel = () => {
    setShowVariation(null); 
  };

  return (
    <div className={styles.list_variations}>
      {productForm.variations.length > 0 ? (
        productForm.variations.map((variation, index) => (
          <div className={styles.list_variations_item} key={index}>
            <CardProduct
              isVariationMode
              code={variation.code}
              description={variation.description}
              price={formatCurrency(variation.price.toString())}
              unit={variation.unit}
              onEdit={() => handleEditVariation(index)}
              onDelete={() => handleDeleteVariation(index)}
            />

            {showVariation === index && editedVariation && (
              <DropdownCard
                variation={editedVariation}
                onSave={handleSaveVariation}
                onCancel={handleCancel}
              />
            )}
          </div>
        ))
      ) : (
        <span className={styles.list_variations_span}>
          Adicione ao menos uma variação do produto para salvar
        </span>
      )}
    </div>
  );
};

export default ListVariations;
