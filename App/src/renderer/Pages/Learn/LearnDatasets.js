import {
  Button,
  Grid,
  Box,
  Pagination,
  TextField,
  alpha,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Datasets = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const items = [
    {
      type: 'text',
      title: 'Datasets',
      titleType: 'h3',
      text: (
        <>
          <b>Datasets</b> are structured collections of data used for analysis,
          research, or training machine learning models. They consist of
          individual data points, each representing an observation or sample,
          along with attributes or features describing those samples.
        </>
      ),
    },
    {
      type: 'list',
      title: 'Tabular',
      listItems: [
        {
          text: (
            <>
              Tabular data, often likened to a spreadsheet, is structured in
              rows and columns. Each row represents an individual observation,
              while each column denotes a specific attribute or feature
              associated with that observation.
            </>
          ),
        },
        {
          text: (
            <>
              In simpler terms, think of it as an organized table where each row
              describes something, like a customer's information or a product's
              characteristics. For instance, in a customer database, each row
              might represent a different customer, with columns containing
              details such as their age, gender, and purchase history.
            </>
          ),
        },
        {
          text: (
            <>
              Labels in tabular datasets typically indicate what we're trying to
              predict or understand, like whether a customer will make a
              purchase or not. This type of data is commonly used in predictive
              modeling and decision-making tasks, making it a fundamental aspect
              of machine learning for analyzing and understanding structured
              information.
            </>
          ),
        },
      ],
    },
    {
      type: 'list',
      title: 'Image Classification',
      listItems: [
        {
          text: (
            <>
              Image classification involves teaching a computer to recognize and
              assign labels to images based on their contents. Imagine teaching
              a child to differentiate between different animals in a picture bo
              ok - it's a similar concept.
            </>
          ),
        },
        {
          text: (
            <>
              In image classification datasets, images are categorized into
              predefined classes or categories, such as "dog," "cat," or "car."
              These datasets are crucial for training algorithms to
              automatically recognize and classify objects in images, enabling
              applications like facial recognition, autonomous driving, and
              medical imaging. Labels in image classification datasets specify
              the correct category or class for each image, guiding the learning
              process and enabling the model to make accurate predictions.{' '}
            </>
          ),
        },
        {
          text: (
            <>
              In programming and machine learning, understanding image
              classification datasets is a fundamental step towards building
              models that can interpret visual information effectively.
            </>
          ),
        },
      ],
    },
    {
      type: 'list',
      title: 'Object Detection',
      listItems: [
        {
          text: (
            <>
              Object detection goes beyond simple classification by identifying
              and locating multiple objects within an image. It's like having a
              computer scan a picture and draw boxes around different items,
              indicating what they are and where they're located.
            </>
          ),
        },
        {
          text: (
            <>
              In datasets for object detection tasks, images are annotated with
              bounding boxes around objects of interest, along with labels
              specifying the class of each object. For instance, in a street
              scene, objects like cars, pedestrians, and traffic lights may be
              annotated with bounding boxes and corresponding labels.
            </>
          ),
        },
        {
          text: (
            <>
              Object detection is crucial for applications like surveillance,
              autonomous navigation, and augmented reality, as it enables
              machines to perceive and interact with their surroundings in a
              detailed manner.
            </>
          ),
        },
      ],
    },
    {
      type: 'list',
      title: 'Image Captioning',
      listItems: [
        {
          text: (
            <>
              Image captioning combines computer vision and natural language
              processing to generate descriptive captions for images
              automatically. It's like teaching a computer to describe what it
              sees in a picture, just like a person would.
            </>
          ),
        },
        {
          text: (
            <>
              In image captioning datasets, each image is paired with one or
              more human-generated captions, providing textual descriptions of
              the objects, actions, and scenes depicted in the images. These
              datasets enable researchers and developers to train algorithms
              that can understand and communicate visual information
              effectively. Labels in image captioning datasets consist of the
              textual descriptions corresponding to each image, guiding the
              model in learning to generate accurate and meaningful captions.
            </>
          ),
        },
        {
          text: (
            <>
              In programming and machine learning, grasping the concept of image
              captioning datasets lays the groundwork for creating AI systems
              capable of understanding and describing visual content.
            </>
          ),
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: '50px',
        gap: 3,
        minHeight: '100%',
      }}
    >
      {items.map((item) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography mt={3} variant={item.titleType || 'h5'}>
            {item.title}
          </Typography>
          {item.type == 'text' && (
            <>
              <Typography mt={2} sx={{ fontSize: 'large' }}>
                {item.text}
              </Typography>
            </>
          )}
          {item.type == 'list' && (
            <>
              <List
                sx={{
                  listStyleType: 'disc',
                  pl: 2,
                  '& .MuiListItem-root': {
                    display: 'list-item',
                  },
                }}
              >
                {item.listItems.map((listItem) => (
                  <ListItem>{listItem.text}</ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Datasets;
