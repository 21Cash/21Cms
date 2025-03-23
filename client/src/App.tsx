import { Link } from "react-router-dom";
import AppRoutes from "./routes";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <AppRoutes />
    </>
  );
};

export default App;
