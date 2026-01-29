import { auth } from "@/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserContextProvider from "@/components/dashboard/UserContextProvider";
import styles from "./layout.module.css";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  console.log("user en layout", user);
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar user={user} />

      <div className={styles.mainContent}>
        <DashboardHeader user={user} />

        <main className={styles.content}>
          <UserContextProvider user={user}>{children}</UserContextProvider>
        </main>
      </div>
    </div>
  );
}
