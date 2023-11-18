import Landing from "./Pages/Landing";
import Layout from "./Components/Layout";
import Page404 from "./Pages/Page404";

const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Landing /> },
        { path: '*', element: <Page404 /> }
      ]
    },
  ]

export default routes;