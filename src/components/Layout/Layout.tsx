import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.layout_navbar}>
        <Navbar />
      </div>
      <div className={styles.layout_header}>
        <Header/>
      </div>
      <div className={styles.layout_content}>{props.children}</div>
    </div>
  );
}
