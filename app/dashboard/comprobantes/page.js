import styles from "./page.module.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Comprobantes() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className={styles.comprobantes}>
      <h1>Comprobantes</h1>
    </div>
  );
}
