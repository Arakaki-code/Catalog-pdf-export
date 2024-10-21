import CardCategory from "../Card/Card";
import styles from "./TableCategory.module.scss";

const TableCategory = () => {
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

export default TableCategory;
