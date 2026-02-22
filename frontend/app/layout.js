import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/themeContext";
import { cookies } from "next/headers";

export const metadata = {
  title: "School Tool",
  description: "tool",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
