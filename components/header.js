import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Header() {
    const navItems = [
        { label: "Inicio", href: "/" },
        { label: "Nosotros", href: "/nosotros" },
        { label: "Servicios", href: "/servicios" },
        { label: "Clientes", href: "/clientes" },
        { label: "Contacto", href: "/contacto" },
        { label: "Login", href: "/login" }
    ];

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image src={logo} alt="Logo Giganet" width={170} height={70} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.label} className={styles.navItem}>
                            <Link href={item.href} className={styles.navLink}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
