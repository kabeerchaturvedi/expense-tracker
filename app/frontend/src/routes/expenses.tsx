import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Show All Expenses!</div>
}
