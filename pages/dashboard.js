import React from 'react';
import CustomAlert from "../components/CustomAlert";

export default function Dashboard() {
  return (
    <div>
      <h1>dashboard</h1>
      <CustomAlert msg={"Hello"} severity={'error'}/>
    </div>
  )
}

Dashboard.authRequired = true