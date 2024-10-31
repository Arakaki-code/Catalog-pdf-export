import styles from "./ListProducts.module.scss";
import CardProduct from "../Card/Card";
import {Product} from "../../hooks/useProducts";

interface ListProductsProps {
  products: Product[];
  onEdit: (code: string) => void;
  onDelete: (code: string) => void;
}

export default function ListProducts({ products, onEdit, onDelete }: ListProductsProps) {


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
              onDelete={() => onDelete(product.code)}
            />
          ))
        ) : (
          <p className={styles.noProducts}>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}
