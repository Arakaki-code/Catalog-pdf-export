// components/ListProducts/ListProducts.tsx
import React, { useState } from 'react';
import styles from './ListProducts.module.scss';
import CardProduct from '../Card/Card';
import { Product } from '../../hooks/useProducts';
import AlertDialog from '../AlertDialog/AlertDialog';

interface ListProductsProps {
  products: Product[];
  onEdit: (code: string) => void;
  onDelete: (code: string) => void;
  highlightedProduct: { code: string; type: "add" | "edit" | "delete" } | null;
}

export default function ListProducts({ products, onEdit, onDelete, highlightedProduct }: ListProductsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDeleteClick = (code: string) => {
    setProductToDelete(code);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete); 
    }
    setIsDialogOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className={styles.tableProducts}>
      <div className={styles.divisor}></div>

      <div className={styles.tableProducts_header}>
        <span>Imagem</span>
        <span>Código</span>
        <span>Descrição do produto</span>
        <span>Categoria</span>
        <span>Ações</span>
      </div>
      <div className={styles.tableProducts_body}>
        {products.length > 0 ? (
          products.map((product) => (
            <CardProduct
              key={product.code}
              code={product.code}
              image={product.image}
              description={product.description}
              label={product.category}
              onEdit={() => onEdit(product.code)}
              onDelete={() => handleDeleteClick(product.code)}
              highlightType={
                highlightedProduct?.code === product.code
                  ? highlightedProduct.type
                  : undefined
              }
            />
          ))
        ) : (
          <p className={styles.noProducts}>Nenhum produto encontrado.</p>
        )}
      </div>

      <AlertDialog
        isOpen={isDialogOpen}
        message="Você tem certeza que deseja excluir este produto?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
