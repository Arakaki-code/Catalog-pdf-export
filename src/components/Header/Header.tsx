import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface HeaderProps {
    className?: string
}

export default function Header(props: HeaderProps) {
    
    const router = useRouter();
    const pageTitles: {[key: string]: string} = {
        "/": "Início",
        "/category": "Categorias",
        "/products": "Lista de Produtos"
    };
    const titulo = pageTitles[router.pathname] || "Catálago de produtos";


    return (
        <div className={styles.header}>
            <h1>{titulo}</h1>
        </div>
    );
}