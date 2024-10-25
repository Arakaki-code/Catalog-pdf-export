import CardCategory from "../Card/Card";
import styles from "./ListCategory.module.scss";

const ListCategory = () => {
  return (
    <div>
      <div className={styles.divisor}></div>
      <div className={styles.tableCategory_header}>
        <span>Código</span>
        <span>Categoria</span>
        <span>Cor</span>
        <span>Ações</span>
      </div>
      <CardCategory
        category={"Eletrica"}
        code={"xzY03xcD"}
        onEdit={() => {}}
        onDelete={() => {}}
        isCardModeCategory
      />
    </div>
  );
};

export default ListCategory;
