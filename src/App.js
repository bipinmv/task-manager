import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNav from "./components/CustomNav";

function App() {
  return (
    <BrowserRouter basename="/task-manager">
      <CustomNav />
    </BrowserRouter>
  );
}

export default App;
