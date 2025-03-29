import AppRoutes from "./routes";
import DebugComponent from "./dev-cache/debug-component";

const App = () => {
  return (
    <>
      <DebugComponent />
      <AppRoutes />
    </>
  );
};

export default App;
