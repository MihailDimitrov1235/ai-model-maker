import Landing from "./Pages/Landing";

const routes = [
    {
      path: '/',
    //   element: <MainLayout />,
      children: [
        { path: '/', element: <Landing /> },
      ]
    }
    // { path: '*', element: <Page404 /> }
  ];

export default routes;