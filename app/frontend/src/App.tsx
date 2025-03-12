 import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import "./App.css";


function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(()=>{
fetch("/api/expenses/total-spent")
  },[])

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
