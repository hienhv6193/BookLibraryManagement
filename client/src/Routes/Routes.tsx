import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TabBook from "../Pages/TabBook/TabBook";
import TabReader from "../Pages/TabReader/TabReader";
import Author from "../Pages/Author/Author";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <TabReader />,
      },
      { path: "author", element: <Author /> },
      {
        path: "book",
        element: <TabBook />,
      },
    ],
  },
]);
