import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AttendanceView } from "./pages/AttendanceView";
import DebugComponent from "./dev-cache/debug-component";
import { Homepage } from "./pages/Homepage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route path="view" element={<AttendanceView />} />
      <Route path="debug" element={<DebugComponent />} />
    </Routes>
  );
};

export default AppRoutes;
