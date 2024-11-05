import CardCategory from "../Card/Card";
import { CategoryOption, useCategory } from "../../hooks/useCategory";
import styles from "./ListCategory.module.scss";
import AlertDialog from "../AlertDialog/AlertDialog";
import { useState } from "react";

interface ListCategoryProps {
  categories: CategoryOption[];
  onEdit: (code: string) => void ;
  onDelete: (code: string) => void;
  highlightedProduct?: { code: string; type: "add" | "edit" | "delete" } | null;
}
const ListCategory: React.FC<ListCategoryProps> = ({categories, onEdit, onDelete, highlightedProduct}) => {

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
    <div>
      <div className={styles.divisor}></div>
      <div className={styles.tableCategory_header}>
        <span>Código</span>
        <span>Categoria</span>
        <span>Cor</span>
        <span>Ações</span>
      </div>
      <div className={styles.tableCategory_body}>
        {categories?.length > 0 ? (
          categories?.map((categorie) => (
            <CardCategory
              key={categorie.code}
              label={categorie.label}
              code={categorie.code}
              color={categorie.color}
              onEdit={() => onEdit(categorie.code)}
              onDelete={() => handleDeleteClick(categorie.code)}
              isCardModeCategory
              highlightType={highlightedProduct?.code === categorie.code ? highlightedProduct?.type : undefined}
            />
          ))
        ) : (
          <p className={styles.noCategorys}>Nenhuma categoria encontrada.</p>
        )}
      </div>

      <AlertDialog
        isOpen={isDialogOpen}
        message="Você tem certeza que deseja excluir esta categoria?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ListCategory;
