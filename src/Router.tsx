import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CategoryList from "./components/CategoryList";
import ToDoList from "./components/ToDoList";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <App />,
    children: [
      {
        path: "",
        element: <ToDoList />,
      },
      {
        path: "category",
        element: <CategoryList />,
      },
    ]
  }
]);

export default router;
