import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import "./App.css";
import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

function App() {
  const { isPending, error, data } = useQuery({ queryKey: ["get-total-spent"], queryFn: getTotalSpent });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{data.total}</CardContent>
    </Card>
  );
}

export default App;
