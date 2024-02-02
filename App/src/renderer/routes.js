import Layout from './Components/Layout';
import InnerLayout from './Components/Layout/InnerLayout';

import Page404 from './Pages/Page404';
import Landing from './Pages/Landing';

import Datasets from './Pages/Datasets';
import ImportDataset from './Pages/Datasets/import/ImportDataset';
import ImportTabular from './Pages/Datasets/import/importTabular';
import ImportImage from './Pages/Datasets/import/ImportImage';
import ImportText from './Pages/Datasets/import/ImportText';

import ImportInfo from './Pages/ImortInfo';
import ReviewDatasets from './Pages/Datasets/import/imageData/ReviewDatasets';
import Classification from './Pages/Datasets/import/imageData/Classification';

import Models from './Pages/Models';
import CreateModel from './Pages/Models/CreateModel';
import CreateTabular from './Pages/Models/CreateModel/CreateTabular';

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
                    children: [
                      {
                        path: 'classification',
                        element: <Classification />,
                      },
                      {
                        path: 'detection',
                        element: <ReviewDatasets />,
                      },
                      {
                        path: 'captioning',
                        element: <ReviewDatasets />,
                      },
                    ],
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
        path: '/models',
        element: <InnerLayout type={'models'} />,
        children: [
          {
            path: '',
            element: <Models />,
            // children: [
            //   { path: 'tabular/:id', element: <Tabular /> },
            //   { path: 'image/classification/:id', element: <Models /> },
            //   { path: 'table/detection/:id', element: <Models /> },
            //   { path: 'table/captioning/:id', element: <Models /> },
            // ],
          },
          {
            path: 'create',
            element: <CreateModel />,
            children: [
              {
                path: 'tabular',
                children: [{ path: ':id', element: <CreateTabular /> }],
              },
              {
                path: 'image',
                children: [{ path: ':id', element: <CreateTabular /> }],
              },
            ],
          },
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
