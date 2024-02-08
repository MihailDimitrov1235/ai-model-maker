import { Box, List } from '@mui/material';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';

const dataItems = [
  {
    type: 'section',
    name: 'view',
    href: '/data',
    items: [
      { type: 'item', name: 'tabular', href: '/data/tabular' },
      { type: 'item', name: 'image', href: '/data/image' },
      { type: 'item', name: 'text', href: '/data/text' },
    ],
  },
  {
    type: 'section',
    name: 'import',
    href: '/data/import',
    items: [
      { type: 'item', name: 'tabular', href: '/data/import/tabular' },
      { type: 'item', name: 'image', href: '/data/import/image' },
      { type: 'item', name: 'text', href: '/data/import/text' },
    ],
  },
];

const modelsItems = [
  {
    type: 'section',
    name: 'view',
    href: '/models',
    items: [
      { type: 'item', name: 'tabular', href: '/models/tabular' },
      { type: 'item', name: 'image', href: '/models/image' },
      { type: 'item', name: 'text', href: '/models/text' },
    ],
  },
  {
    type: 'section',
    name: 'create',
    href: '/models/create',
    items: [
      { type: 'item', name: 'tabular', href: '/models/create/tabular' },
      { type: 'item', name: 'image', href: '/models/create/image' },
      { type: 'item', name: 'text', href: '/models/create/text' },
    ],
  },
];

const useItems = [
  { type: 'item', name: 'Model1', href: '/test' },
  { type: 'item', name: 'Model2', href: '/test' },
];

const learnItems = [
  {
    type: 'item',
    name: 'Home',
    href: '/learn',
  },
  {
    type: 'section',
    name: 'datasets',
    href: '/learn/datasets',
    items: [
      { type: 'item', name: 'tabular', href: '/learn/datasets/tabular'},
      { type: 'section', name: 'image', href: '/learn/datasets/image', items:[
        { type: 'item', name: 'classification', href: '/learn/datasets/classification'},
        { type: 'item', name: 'detection', href: '/learn/datasets/detection'},
        { type: 'item', name: 'captioning', href: '/learn/datasets/captioning'},
      ]},
    ],
  },
  {
    type: 'section',
    name: 'models',
    href: '/learn/models',
    items: [
      { type: 'section', name: 'neural-network', href: '/learn/models/nn', items:[
        { type: 'section', name: 'layers', href: '/learn/models/nn/layers', items:[
          { type: 'item', name: 'dense', href: '/learn/models/nn/layers/dense' },
          { type: 'item', name: 'dropout', href: '/learn/models/nn/layers/dropout' },
          { type: 'item', name: 'conv-2D', href: '/learn/models/nn/layers/conv2D' },
          { type: 'item', name: 'max-pooling-2D', href: '/learn/models/nn/layers/mp2D' },
        ] },
        { type: 'item', name: 'batch-size', href: '/learn/models/nn/bs' },
        { type: 'section', name: 'dataset-split', href: '/learn/models/nn/ds', items:[
          { type: 'item', name: 'training', href: '/learn/models/nn/ds/training' },
          { type: 'item', name: 'validation', href: '/learn/models/nn/ds/validation' },
          { type: 'item', name: 'testing', href: '/learn/models/nn/ds/testing' },
        ] },
        { type: 'item', name: 'target', href: '/learn/models/nn/target' },
        { type: 'item', name: 'learning-rate', href: '/learn/models/nn/lr' },
        { type: 'item', name: 'epoch', href: '/learn/models/nn/epoch' },
      ] },
    ],
  },
];

export default function InnerLayout({ type = null }) {
  const itemMap = {
    data: dataItems,
    models: modelsItems,
    use: useItems,
    learn: learnItems,
  };
  const items = itemMap[type] || [];

  return (
    <Box display={'flex'} sx={{ width: 'calc(100% - 78px)' }}>
      {type && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '250px',
            bgcolor: 'background.standOut',
            borderRadius: '20px',
            m: 1,
            ml: 0,
          }}
        >
          <Box
            sx={{
              my: 2,
              overflowX: 'hidden',
              overflowY: 'hidden',
              ':hover': {
                overflowY: 'auto',
              },
            }}
          >
            <List>
              <SidebarMenu items={items} />
            </List>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          overflow: 'hidden',
          flex: 1,
          borderRadius: '20px',
          bgcolor: 'background.standOut',
          m: 1,
          ml: 0,
        }}
      >
        <Box
          sx={{
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            px: 2,
            height: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
