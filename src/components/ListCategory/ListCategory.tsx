import CardCategory from "../Card/Card";
import { CategoryOption, useCategory } from "../../hooks/useCategory";
import styles from "./ListCategory.module.scss";

interface ListCategoryProps {
  categories: CategoryOption[];
  onEdit: (code: string) => void ;
  onDelete: (code: string) => void;
}
const ListCategory: React.FC<ListCategoryProps> = ({categories, onEdit, onDelete}) => {

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
              onDelete={() => onDelete(categorie.code)}
              isCardModeCategory
            />
          ))
        ) : (
          <p className={styles.noCategorys}>Nenhuma categoria encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ListCategory;
