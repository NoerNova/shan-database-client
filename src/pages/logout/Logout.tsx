import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import shanlogo from "assets/images/SHAN Logo 2020.png";
import { useAuth } from "hooks/useAuth";

export default function Logout() {

  const [counter, setCounter] = useState(1);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let timer = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000);

    counter <= 0 && navigateToLogin()

    return () => {
      clearInterval(timer);
    }
  }, [counter])

  const navigateToLogin = () => {
    navigate("/login", { replace: true })
    logout();

  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <img src={shanlogo} className="h-40 w-40" />
        <h3 className="font-bold italic">Logout ... {counter}</h3>
      </div>

    </div>
  )
}
