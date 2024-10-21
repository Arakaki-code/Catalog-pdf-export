import styles from "../styles/category.module.scss";
import TableCategory from "../components/TableCategory/TableCategory";
import Button from "../components/Button/Button";
import { FaPlus } from "react-icons/fa6";

export default function Category() {
  return (
    <div className={styles.container_category}>
      <div className={styles.category_header}>
        <h2>Lista de Categorias</h2>

        <div className={styles.category_buttons}>
          <Button
            btnStyle={"primary"}
            icon={<FaPlus />}
            className={styles.button_add_product}
          >
            Adicionar Categoria
          </Button>
        </div>
      </div>
      <TableCategory />
    </div>
  );
}
