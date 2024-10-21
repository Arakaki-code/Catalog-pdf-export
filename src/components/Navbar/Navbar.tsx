import styles from "./styles.module.scss";
import Link from "../Link/Link";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_links}>
        <Link href="/" texto="Home"/>
        <Link href="/listProducts" texto="Lista de Produtos" />
        <Link href="/category" texto="Categorias" />
      </div>
    </div>
  );
}
