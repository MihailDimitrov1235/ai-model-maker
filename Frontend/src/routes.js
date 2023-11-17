import Landing from "./Pages/Landing";
import Layout from "./Components/Layout";

const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Landing /> },
      ]
    }
    // { path: '*', element: <Page404 /> }
  ];

export default routes;