import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import shanlogo from "assets/images/SHAN Logo 2020.png";

export default function Logout() {

  useEffect(() => {
    setTimeout(function() {
      if (newState == -1) {
        return <Navigate to="/dashboard" />;
      }
    }, 5000);
  }, [])
  return (
    <div className="flex h-screen justify-center items-center">
      <h4>Logout redirect in 5,4,3,2,1,0</h4>
    </div>
  )
}
