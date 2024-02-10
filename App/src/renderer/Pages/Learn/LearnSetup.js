import LearnCreator from '../../Components/LearnCreator';
import { useTranslation } from 'react-i18next';

export default function LearnSetup() {
  const { t } = useTranslation();
  const items = [
    {
      type: 'text',
      title: t('setup'),
      titleType: 'h3',
      paragraphs: [t('ml-introduction')],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'CPU',
          items: [
            {
              type: 'text',
              title: t('setup'),
              titleType: 'h3',
              paragraphs: [t('ml-introduction')],
            },
          ],
        },
        {
          label: 'GPU',
          items: [
            {
              type: 'text',
              title: t('system-requirements'),
              titleType: 'h5',
              paragraphs: ['Tensorflow requires Windows 7 or higher (64-bit)'],
            },
            {
              type: 'text',
              title: 'Install Microsoft Visual C++ Redistributable',
              titleType: 'h5',
              paragraphs: [
                'Install the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, and 2019.',
                <>Go to the Microsoft Visual C++ downloads</>,
              ],
            },
          ],
        },
      ],
      titleType: 'h3',
      paragraphs: [t('ml-introduction')],
    },
    // {
    //   type: 'list',
    //   title: t('layers'),
    //   id: 'layers',
    //   listItems: [
    //     {
    //       text: t('dense-text'),
    //       subId: 'dense',
    //     },
    //     {
    //       text: t('dropout-text'),
    //       subId: 'dropout',
    //     },
    //     {
    //       text: t('conv2D-text'),
    //       subId: 'conv-2D',
    //     },
    //     {
    //       text: t('max-poling2D-text'),
    //       subId: 'max-pooling-2D',
    //     },
    //   ],
    // },
  ];
  return <LearnCreator items={items} />;
}
