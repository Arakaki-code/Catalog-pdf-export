import CardCategory from "../Card/Card";
import { CategoryOption, useCategory } from "../../hooks/useCategory";
import styles from "./ListCategory.module.scss";

interface ListCategoryProps {
  onEdit: (code: string) => void;
  onDelete: (code: string) => void;
}
const ListCategory: React.FC<ListCategoryProps> = ({ onEdit, onDelete}) => {
  const {categories} = useCategory()

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
          categories?.map((category) => (
            <CardCategory
              category={category.label}
              code={category.code}
              color={category.color}
              onEdit={() => {}}
              onDelete={() => {}}
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
