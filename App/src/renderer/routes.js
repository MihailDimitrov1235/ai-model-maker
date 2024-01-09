import Layout from './Components/Layout';
import InnerLayout from './Components/Layout/InnerLayout';

import Page404 from './Pages/Page404';
import Landing from './Pages/Landing';

import Datasets from './Pages/Datasets';
import ImportDataset from './Pages/Datasets/import/ImportDataset';
import ImportTabular from './Pages/Datasets/import/ImportTabular';
import ImportImage from './Pages/Datasets/import/ImportImage';
import ImportText from './Pages/Datasets/import/ImportText';

import ImportInfo from './Pages/ImortInfo';
import ReviewDatasets from './Pages/Datasets/ReviewDatasets';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <InnerLayout />,
        children: [{ path: '/', element: <Landing /> }],
      },
      {
        path: '/data',
        element: <InnerLayout type={'data'} />,
        children: [
          { path: '', element: <Datasets /> },
          {
            path: 'import',
            element: <ImportDataset />,
            children: [
              { path: 'tabular', element: <ImportTabular /> },
              {
                path: 'image',
                children: [
                  {
                    path: '',
                    element: <ImportImage />,
                  },
                  {
                    path: 'review',
                    element: <ReviewDatasets />,
                  },
                ],
              },
              { path: 'text', element: <ImportText /> },
            ],
          },
          {
            path: 'tables',
            children: [{ path: 'import', element: <ImportInfo /> }],
          },
        ],
      },
      {
        path: '/train',
        element: <InnerLayout type={'train'} />,
        children: [
          { path: '', element: <Landing /> },
          { path: 'data1', element: <Landing /> },
          { path: 'data2', element: <Landing /> },
        ],
      },
      {
        path: '/test',
        element: <InnerLayout type={'test'} />,
        children: [
          { path: '', element: <Landing /> },
          { path: 'data1', element: <Landing /> },
          { path: 'data2', element: <Landing /> },
        ],
      },
      {
        path: '*',
        element: <InnerLayout />,
        children: [{ path: '*', element: <Page404 /> }],
      },
    ],
  },
];

export default routes;
