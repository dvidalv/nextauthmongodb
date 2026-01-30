import { auth } from "@/auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function Empresas() {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "admin") {
    redirect("/dashboard/empresa");
  }

  return (
    <div className={styles.empresas}>
      <h1>Empresas</h1>
    </div>
  );
}