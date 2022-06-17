import { useState } from "react";
import ContextTypePage from "./sub-page/ContextTypePage";
import { ThemeProvider, defaultTheme } from "../context/theme";
import { Button } from "antd";
import { defaultUser, UserProvider } from "../context/user";
export default function Context() {
  const [theme, setTheme] = useState(defaultTheme);
  const [user, setUser] = useState(defaultUser);
  return (
    <div>
      <h3>Context Page</h3>
      <Button
        onClick={() => {
          setTheme({
            themeColor: theme.themeColor === "red" ? "green" : "red",
          });
        }}
      >
        切换主题
      </Button>
      <Button
        onClick={() => {
          setUser({
            userName: user.userName === "111" ? "3333" : "111",
          });
        }}
      >
        切换用户
      </Button>
      <ThemeProvider value={theme}>
        <ContextTypePage />
        <UserProvider value={user}>
          <ContextTypePage />
        </UserProvider>
      </ThemeProvider>
      <ContextTypePage />
    </div>
  );
}
