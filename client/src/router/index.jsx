import { createBrowserRouter, Outlet } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      // {
      //   element: <Home />,
      //   path: "/",
      // },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: async () => {
              const query = `query ExampleQuery {
                folders {
                  id
                  name
                  createdAt
                }
              }`;

              const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
              });

              const { data } = await res.json();
              return data;
            },
            shouldRevalidate: ({ nextUrl }) => {
              // only revalidate if the next url is /
              return nextUrl.pathname === "/";
            },
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                loader: async ({ params }) => {
                  const query = `query ExampleQuery($folderId: String) {
                    folder(folderId: $folderId) {
                      id
                      name
                    }
                  }`;

                  const res = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      query,
                      variables: {
                        folderId: params.folderId,
                      },
                    }),
                  });

                  const { data } = await res.json();
                  return data;
                },
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
