import { Link } from "react-router-dom";
export default function Header() {
  return (
    <nav>
      <h1>this is navbar</h1>
      <ul>
        <Link to="/signup">
          <button type="submit"> Signup</button>
        </Link>
        <Link to="/login">
          <button type="submit"> Login</button>
        </Link>
        <Link to="/home">
          <button type="submit"> Home</button>
        </Link>

        <Link to="/blog">
          <button type="submit"> Blog</button>
        </Link>
      </ul>
    </nav>
  );
}
