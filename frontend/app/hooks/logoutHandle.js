import { useAuth } from "../context/AuthContext";

export function LogoutHandle() {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    logout();
  };

  return handleLogout;
}
