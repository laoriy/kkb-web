import { ThemeConsumer } from "../../context/theme";
import { UserConsumer } from "../../context/user";
export default function ContextTypePage() {
  return (
    <ThemeConsumer>
      {(theme) => {
        return (
          <>
            <div style={{ color: theme.themeColor }}>{theme.themeColor}</div>
            <UserConsumer>
              {(user) => {
                return <div>{user.userName}</div>;
              }}
            </UserConsumer>
          </>
        );
      }}
    </ThemeConsumer>
  );
}
