import { createBrowserRouter, Outlet } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { noteLoader, notesLoader } from "../utils/noteUtils";
import { folderLoader } from "../utils/folderUtils";

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
            loader: folderLoader,
            shouldRevalidate: ({ nextUrl }) => {
              // only revalidate if the next url is /
              return nextUrl.pathname === "/";
            },
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    loader: noteLoader,
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
