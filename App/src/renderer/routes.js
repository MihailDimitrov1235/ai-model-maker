import Landing from "./Pages/Landing";
import Layout from "./Components/Layout";
import Page404 from "./Pages/Page404";
import Datasets from "./Pages/Datasets";
import ImportInfo from "./Pages/ImortInfo";
import InnerLayout from "./Components/Layout/InnerLayout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <InnerLayout />,
        children: [{ path: "/", element: <Landing /> }],
      },
      {
        path: "/data",
        element: <InnerLayout type={"data"} />,
        children: [
          {
            path: "tables",
            children: [{ path: "import", element: <ImportInfo /> }],
          },
          { path: "", element: <Datasets /> },
          { path: "data2", element: <Datasets /> },
        ],
      },
      {
        path: "/train",
        element: <InnerLayout type={"train"} />,
        children: [
          { path: "", element: <Landing /> },
          { path: "data1", element: <Landing /> },
          { path: "data2", element: <Landing /> },
        ],
      },
      {
        path: "/test",
        element: <InnerLayout type={"test"} />,
        children: [
          { path: "", element: <Landing /> },
          { path: "data1", element: <Landing /> },
          { path: "data2", element: <Landing /> },
        ],
      },
      {
        path: "*",
        element: <InnerLayout />,
        children: [{ path: "*", element: <Page404 /> }],
      },
    ],
  },
];

export default routes;
