import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("When App first render", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const errorMsg = screen.queryByText(
    "Todo field is empty.Please fill that field"
  );
  const allTodos = screen.queryAllByTestId("todo");

  expect(inputElement).toHaveValue("");
  expect(errorMsg).not.toBeInTheDocument();
  expect(allTodos).toHaveLength(0);
});

test("When user add new todo", async () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addTodoBtn = screen.getByRole("button");

  //Before adding new todo todos length will be 0
  expect(screen.queryAllByTestId("todo")).toHaveLength(0);
  userEvent.type(inputElement, "Get Up Early");
  userEvent.click(addTodoBtn);

  //After adding new todo todos length will be 1
  expect(await screen.findAllByTestId("todo")).toHaveLength(1);
});

test("Delete Todo", async () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addTodoBtn = screen.getByRole("button");

  //Before adding new todo todos length will be 0
  expect(screen.queryAllByTestId("todo")).toHaveLength(0);
  userEvent.type(inputElement, "Get Up Early");
  userEvent.click(addTodoBtn);
  //After adding new todo todos length will be 1
  expect(await screen.findAllByTestId("todo")).toHaveLength(1);

  //find that newly added todo by id
  const findTodo = screen.queryByTestId(1);
  userEvent.click(findTodo);

  //after deleting todo todos length will be 0
  expect(screen.queryAllByTestId("todo")).toHaveLength(0);
});

test("When user try to add emtpy todo it will show error", () => {
  render(<App />);
  const addTodoBtn = screen.getByRole("button");

  userEvent.click(addTodoBtn);

  // it shows error because user wants to add emtpy todo
  expect(
    screen.getByText("Todo field is empty.Please fill that field")
  ).toBeInTheDocument();
});
