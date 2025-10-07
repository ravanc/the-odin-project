import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="flex justify-center">
      <Navbar cart={cart} />
      <div className="pt-[60px] max-w-[850px]">
        <Outlet context={[cart, setCart]} />
      </div>
    </div>
  );
}

export default App;
