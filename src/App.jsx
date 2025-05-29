import React, { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/auth";
import Clipboard from "./components/clipboard";
import { isAuthenticated } from "./actions/login";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStatus = isAuthenticated();
    console.log("User authenticated:", authStatus);
    setIsAuth(authStatus);
  }, []);

  return (
    <>
      {isAuth ? (
        <Clipboard />
      ) : (
        <Auth updateAuth={(value) => setIsAuth(value)}></Auth>
      )}
    </>
  );
}

export default App;
