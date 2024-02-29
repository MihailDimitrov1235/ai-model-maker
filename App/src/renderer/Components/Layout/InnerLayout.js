import { Box, List } from '@mui/material';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';

const dataItems = [
  {
    type: 'section',
    name: 'view',
    href: '/data',
    items: [
      { type: 'item', name: 'tabular', href: '/data/?filter=table' },
      { type: 'item', name: 'image', href: '/data/?filter=image' },
      // { type: 'item', name: 'text', href: '/data/?filter=text' },
    ],
  },
  {
    type: 'section',
    name: 'import',
    href: '/data/import',
    items: [
      { type: 'item', name: 'tabular', href: '/data/import/tabular' },
      { type: 'item', name: 'image', href: '/data/import/image' },
      // { type: 'item', name: 'text', href: '/data/import/text' },
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
      // { type: 'item', name: 'text', href: '/models/text' },
    ],
  },
  {
    type: 'section',
    name: 'create',
    href: '/models/create',
    items: [
      { type: 'item', name: 'tabular', href: '/models/create/tabular' },
      { type: 'item', name: 'image', href: '/models/create/image/' },
      // { type: 'item', name: 'text', href: '/models/create/text' },
    ],
  },
];

const useItems = [
  { type: 'item', name: 'tabular', href: '/use/table' },
  { type: 'item', name: 'image', href: '/use/image' },
];
const learnItems = [
  {
    type: 'section',
    name: 'getting-started',
    href: '/learn',
    items: [
      { type: 'item', name: 'setup', href: '/learn/setup' },
      { type: 'item', name: 'tutorial', href: '/learn/tutorial' },
    ],
  },
  {
    type: 'section',
    name: 'datasets',
    href: '/learn/datasets/?id=dataset',
    items: [
      { type: 'item', name: 'tabular', href: '/learn/datasets/?id=tabular' },
      {
        type: 'section',
        name: 'image',
        href: '/learn/datasets/?id=image',
        items: [
          {
            type: 'item',
            name: 'image-classification',
            href: '/learn/datasets/?id=classification',
          },
          {
            type: 'item',
            name: 'object-detection',
            href: '/learn/datasets/?id=detection',
          },
          {
            type: 'item',
            name: 'captioning',
            href: '/learn/datasets/?id=captioning',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'models',
    href: '/learn/model',
    items: [
      {
        type: 'section',
        name: 'neural-network',
        href: `/learn/model/?id=nn`,
        items: [
          {
            type: 'section',
            name: 'layers',
            href: '/learn/model/?id=layers',
            items: [
              {
                type: 'item',
                name: 'dense',
                href: '/learn/model/?id=dense',
              },
              {
                type: 'item',
                name: 'dropout',
                href: '/learn/model/?id=dropout',
              },
              {
                type: 'item',
                name: 'conv2D',
                href: '/learn/model/?id=conv-2D',
              },
              {
                type: 'item',
                name: 'max-poling2D',
                href: '/learn/model/?id=max-pooling-2D',
              },
            ],
          },
          {
            type: 'item',
            name: 'batch-size',
            href: '/learn/model/?id=batch-size',
          },
          {
            type: 'section',
            name: 'dataset-split',
            href: '/learn/model/?id=dataset-split',
            items: [
              {
                type: 'item',
                name: 'training',
                href: '/learn/model/?id=training',
              },
              {
                type: 'item',
                name: 'validation',
                href: '/learn/model/?id=validation',
              },
              {
                type: 'item',
                name: 'testing',
                href: '/learn/model/?id=testing',
              },
            ],
          },
          {
            type: 'item',
            name: 'weights-bias',
            href: '/learn/model/?id=weight-bias',
          },
          { type: 'item', name: 'target', href: '/learn/model/?id=target' },
          {
            type: 'item',
            name: 'learning-rate',
            href: '/learn/model/?id=learning-rate',
          },
          { type: 'item', name: 'epoch', href: '/learn/model/?id=epoch' },
        ],
      },
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
