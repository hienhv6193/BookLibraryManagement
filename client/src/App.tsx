import { Outlet } from "react-router";
import Navbar from "./Components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
