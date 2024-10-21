import Link from 'next/link';
import styles from './Link.module.scss';

interface NavegadorProps{
    href: string
    texto: string
}
export default function Navegador(props: NavegadorProps) {
    return (
        <Link href={props.href} className={styles.link}>
            {props.texto}
        </Link>
    );
}