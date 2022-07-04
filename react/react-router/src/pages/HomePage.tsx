import { Link, Route, useParams } from "react-router-dom";

export function HomePage() {
  let params = useParams();
  const { id } = params;

  return (
    <div>
      <h3>HomePage</h3>
      <Link to={"/search/" + id + "/detail"}>详情</Link>
    </div>
  );
}
