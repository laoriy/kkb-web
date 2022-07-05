import { useSearchParams } from "react-router-dom";

export function LoginPage() {
  const [search] = useSearchParams();
  const redirect = search.get("redirect");
  console.log(redirect);

  return (
    <div>
      <h3>LoginPage</h3>
    </div>
  );
}
