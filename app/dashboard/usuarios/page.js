"use client";

import styles from "./page.module.css";
import { useUser } from "@/components/dashboard/UserContextProvider";
import { redirect } from "next/navigation";

export default function Usuarios() {
  const user = useUser();
  console.log("user en usuarios", user.role);
  if (user.role !== "admin") {
    redirect("/login");
  }
  return (
    <div className={styles.usuarios}>
      <h1>Usuarios</h1>
    </div>
  );
}
