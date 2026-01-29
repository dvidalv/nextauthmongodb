import styles from "./page.module.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Usuarios() {
  const session = await auth();
  const user = session?.user;

  if (user.role !== "admin") {
    redirect("/login");
  }
  return <div className={styles.usuarios}>
    <h1>Usuarios</h1>
  </div>;
}