import Layout from './Components/Layout';
import InnerLayout from './Components/Layout/InnerLayout';

import Page404 from './Pages/Page404';
import Landing from './Pages/Landing';

import Datasets from './Pages/Datasets';
import ImportDataset from './Pages/Datasets/import/ImportDataset';
import ImportTabular from './Pages/Datasets/import/importTabular';
import ImportImage from './Pages/Datasets/import/ImportImage';
import ImportText from './Pages/Datasets/import/ImportText';

import ReviewDatasets from './Pages/Datasets/import/imageData/ReviewDatasets';
import Classification from './Pages/Datasets/import/imageData/Classification';
import CreateLabels from './Pages/Datasets/import/imageData/CreateLabels';

import Models from './Pages/Models';
import CreateModel from './Pages/Models/CreateModel';
import CreateTabular from './Pages/Models/CreateModel/CreateTabular';
import TableModel from './Pages/Models/TableModel';
import CreateImage from './Pages/Models/CreateModel/CreateImageModel/CreateImage';

import LearnAIComponents from './Pages/Learn/LearnAIComponents';
import LearnDatasets from './Pages/Learn/LearnDatasets';
import LearnSetup from './Pages/Learn/LearnSetup';
import LearnTutorial from './Pages/Learn/LearnTutorial';
import Use from './Pages/Use';
import UseTable from './Pages/Use/UseTable';

import { SnackbarProvider } from 'notistack';
import CustomSnackbar from './Components/Utils/Snack';

const routes = [
  {
    path: '/',
    element: (
      <SnackbarProvider
        maxSnack={10}
        Components={{ custom: CustomSnackbar }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        preventDuplicate
      >
        <Layout />
      </SnackbarProvider>
    ),
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
                    path: 'labels',
                    element: <CreateLabels />,
                    children: [
                      {
                        path: 'classification',
                        element: <Classification />,
                      },
                      {
                        path: 'detection',
                        element: <CreateLabels />,
                      },
                      {
                        path: 'captioning',
                        element: <CreateLabels />,
                      },
                    ],
                  },
                  {
                    path: 'create',
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
        ],
      },
      {
        path: '/models',
        element: <InnerLayout type={'models'} />,
        children: [
          {
            path: '',
            element: <Models />,
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
                children: [{ path: ':id', element: <CreateImage /> }],
              },
            ],
          },
          { path: 'table/:id', element: <TableModel /> },
          { path: 'image/classification/:id', element: <Models /> },
          { path: 'image/detection/:id', element: <Models /> },
          { path: 'image/captioning/:id', element: <Models /> },
        ],
      },
      {
        path: '/use',
        element: <InnerLayout type={'use'} />,
        children: [
          {
            path: '',
            element: <Use />,
            children: [
              {
                path: 'table',
                children: [{ path: ':id', element: <UseTable /> }],
              },
              {
                path: 'image',
                children: [{ path: ':id', element: <UseTable /> }],
              },
            ],
          },
        ],
      },
      {
        path: '/learn',
        element: <InnerLayout type={'learn'} />,
        children: [
          {
            path: '',
            element: <LearnDatasets />,
          },
          { path: 'setup', element: <LearnSetup /> },
          { path: 'tutorial', element: <LearnTutorial /> },
          { path: 'datasets', element: <LearnDatasets /> },
          { path: 'model', element: <LearnAIComponents /> },
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
