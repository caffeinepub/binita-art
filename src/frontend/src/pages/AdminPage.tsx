import { useAuth } from "../contexts/AuthContext";
import { AdminDashboardPage } from "./AdminDashboardPage";
import { AdminLoginPage } from "./AdminLoginPage";

export function AdminPage() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminDashboardPage /> : <AdminLoginPage />;
}
