import AppRoutes from "./routes";
import Navbar from "./components/navbar";
import DebugComponent from "./dev-cache/debug-component";

const App = () => {
  return (
    <>
      <Navbar />
      <DebugComponent />
      <AppRoutes />
    </>
  );
};

export default App;
