import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import shanlogo from "assets/images/SHAN Logo 2020.png";

export default function Logout() {

  const [counter, setCounter] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    countToRedirect();
  }, [])

  const countToRedirect = () => {
    let timer = setInterval(() => {
      let newCount = counter - 1;
      newCount >= 0 ? setCounter(newCount) : setCounter(0)
    }, 1000);

    if (counter === 0) {
      navigateToLogin(timer)
    }

  }

  const navigateToLogin = (timer: number) => {
    if (timer) {
      clearInterval(timer)
    }

    navigate("/login", { replace: true })
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
