import { useSelector } from "react-redux";

import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/UI/Header";
import Plates from "./components/Plates";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <Header />
      <Auth />
      {isAuth && <Plates />}
    </div>
  );
}

export default App;
