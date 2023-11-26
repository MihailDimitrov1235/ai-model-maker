import Landing from "./Pages/Landing";
import Layout from "./Components/Layout";
import Page404 from "./Pages/Page404";
import InnerLayout from "./Components/Layout/InnerLayout";

const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { 
          path: '/', 
          element: <InnerLayout />, 
          children: [
            {path: '/', element: <Landing />}
          ]
        },
        { 
          path: '/data', 
          element: <InnerLayout type={'data'} />, 
          children: [
            {path: '', element: <Landing />},
            {path: 'data1', element: <Landing />},
            {path: 'data2', element: <Landing />}
          ]  
        },
        { path: '*', element: <InnerLayout />, children:[{path: '*', element: <Page404 />}]}
      ]
    },
  ]

export default routes;