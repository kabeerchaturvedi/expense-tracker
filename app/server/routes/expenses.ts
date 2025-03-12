import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;
const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Groceries",
    amount: 150.5,
  },
  {
    id: 2,
    title: "Gas",
    amount: 45.0,
  },
  {
    id: 3,
    title: "Movie Tickets",
    amount: 30.0,
  },
  {
    id: 4,
    title: "Internet Bill",
    amount: 89.99,
  },
  {
    id: 5,
    title: "Coffee",
    amount: 4.75,
  },
];

const createPostSchema = expenseSchema.omit({ id: true });

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })

  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = await c.req.valid("json");
    const expense = createPostSchema.parse(data);
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    return c.json(expense);
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return c.json({
      total,
    });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (expense) {
      return c.json({ expense });
    }
  })
  //   .put("/:id{[0-9]+}", async (c) => {
  //     const id = Number.parseInt(c.req.param("id"));
  //     const expense = fakeExpenses.find((expense) => expense.id === id);
  //     if (expense) {
  //       const data = await c.req.valid("json");
  //       const updatedExpense = {
  //         ...createPostSchema.parse(data),
  //         id: expense.id,
  //       };
  //       const index = fakeExpenses.findIndex((e) => e.id === expense.id);
  //       fakeExpenses.splice(index, 1, updatedExpense);
  //       return c.json({ expense: updatedExpense });
  //     }
  //   })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expennse: deletedExpense });
  });
