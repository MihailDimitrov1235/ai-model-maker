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
  List,
  ListItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Datasets = function () {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    let id = queryParameters.get('id') != null ? queryParameters.get('id') : '';
    console.log('element');
    console.log(id);
    const element = document.getElementById(queryParameters.get('id'));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [queryParameters.get('id')]);

  const items = [
    {
      type: 'text',
      title: t('learn-ai'),
      titleType: 'h3',
      text: <>{t('ml-introduction')}</>,
    },
    {
      type: 'text',
      title: t('neural-network'),
      titleType: 'h4',
      text: t('neural-network-text'),
    },
    {
      type: 'text',
      title: t('components-of-neural-network'),
      id: 'nn',
      titleType: 'h4',
    },
    {
      type: 'text',
      title: t('neurons'),
      id: 'neurons',
      titleType: 'h5',
      text: t('neurons-text'),
    },

    {
      type: 'list',
      title: t('layers'),
      id: 'layers',
      listItems: [
        {
          text: t('dense-text'),
          subId: 'dense',
        },
        {
          text: t('dropout-text'),
          subId: 'dropout',
        },
        {
          text: t('conv2D-text'),
          subId: 'conv-2D',
        },
        {
          text: t('max-poling2D-text'),
          subId: 'max-pooling-2D',
        },
      ],
    },
    {
      type: 'text',
      title: t('batch-size'),
      id: 'batch-size',
      titleType: 'h5',
      text: t('batch-size-text'),
    },
    {
      type: 'list',
      title: t('dataset-split'),
      id: 'dataset-split',
      listItems: [
        {
          text: t('training-text'),
          subId: 'training',
        },
        {
          text: t('validation-text'),
          subId: 'validation',
        },
        {
          text: t('testing-text'),
          subId: 'testing',
        },
      ],
    },
    {
      type: 'text',
      title: t('weights-bias'),
      id: 'weight-bias',
      titleType: 'h5',
      text: t('weights-bias-text'),
    },
    {
      type: 'text',
      title: t('target'),
      id: 'target',
      titleType: 'h5',
      text: t('target-text'),
    },
    {
      type: 'text',
      title: t('learning-rate'),
      id: 'learning-rate',
      titleType: 'h5',
      text: t('learning-rate-text'),
    },
    {
      type: 'text',
      title: t('epoch'),
      id: 'epoch',
      titleType: 'h5',
      text: t('epoch-text'),
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
        mb: 3,
      }}
    >
      {items.map((item) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant={item.titleType || 'h5'} id={item.id || ''}>
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
                  <ListItem id={listItem.subId || ''}>{listItem.text}</ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      ))}
    </Box>
    // <>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       px: '50px',
    //       gap: 3,
    //       minHeight: '100%',
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //         mt: 3,
    //       }}
    //     >
    //       <h2>{t('learn-ai')}</h2>
    //     </Box>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
    //
    //       <h3>Components of a Neural Network </h3>
    //       <ol>
    //         <Typography fontSize={'large'}>
    //           <li>
    //             <b>Neurons:</b>
    //           </li>
    //           Neurons are the basic building blocks of a neural network. They
    //           receive input, process it, and produce an output. Neurons are
    //           organized into layers: input layer, hidden layers, and output
    //           layer.
    //         </Typography>
    //         <Typography fontSize={'large'} mt={3}>
    //           <li>
    //             <b>Layers:</b>
    //           </li>
    //           {/* A neural network typically consists of three types of layers: */}
    //           <ul>
    //             {/* <li>Input Layer:</li>
    //             <Typography fontSize={'large'}>
    //               This layer receives the initial data. Each neuron in the input
    //               layer represents a feature or attribute of the input data.
    //             </Typography>
    //             <li>Hidden Layers:</li>
    //             <Typography fontSize={'large'}>
    //               These layers process the input data through a series of
    //               transformations. Each hidden layer performs calculations using
    //               weighted connections between neurons.
    //             </Typography>
    //             <li>Output Layer:</li>
    //             <Typography fontSize={'large'}>
    //               The final layer produces the network's output, which could be
    //               a prediction, classification, or any desired result.
    //             </Typography> */}
    //             <li>Dense:</li>
    //             <Typography fontSize={'large'}>
    //               A dense layer, also known as a fully connected layer, is a
    //               fundamental building block in neural networks. Imagine it as a
    //               layer where every neuron is connected to every neuron in the
    //               previous and next layers. Each neuron in a dense layer
    //               receives input from all neurons in the previous layer and
    //               produces an output value. Dense layers are commonly used for
    //               learning patterns in data and making predictions. For example,
    //               in a simple neural network for image classification, the first
    //               dense layer might receive flattened pixel values of an image
    //               as input and learn to recognize patterns in the data, such as
    //               edges or shapes.
    //             </Typography>
    //             <li>Dropout:</li>
    //             <Typography fontSize={'large'}>
    //               Dropout is a regularization technique used to prevent
    //               overfitting in neural networks. It works by randomly dropping
    //               a certain percentage of neurons (along with their connections)
    //               during training, effectively forcing the network to learn more
    //               robust and generalizable features. Dropout helps prevent the
    //               network from relying too heavily on specific neurons or
    //               features, making it less likely to memorize the training data
    //               and better able to generalize to unseen data. For example, in
    //               a dropout layer with a dropout rate of 0.5, each neuron has a
    //               50% chance of being temporarily dropped during training.
    //             </Typography>
    //             <li>Convolutional 2D (Conv2D):</li>
    //             <Typography fontSize={'large'}>
    //               A Conv2D layer is a fundamental component of convolutional
    //               neural networks (CNNs), which are widely used for tasks like
    //               image recognition and object detection. Conv2D layers apply a
    //               convolution operation to the input data, sliding a small
    //               filter (also known as a kernel) across the input image to
    //               extract features. This process helps the network learn
    //               hierarchical representations of the input data, capturing
    //               patterns at different levels of abstraction. For example, in
    //               image classification, the first Conv2D layer might learn
    //               low-level features like edges and textures, while subsequent
    //               layers learn higher-level features like shapes and objects.
    //             </Typography>
    //             <li>MaxPooling2D:</li>
    //             <Typography fontSize={'large'}>
    //               MaxPooling2D is a pooling operation commonly used in CNNs to
    //               reduce the spatial dimensions of feature maps while retaining
    //               important information. It works by dividing the input feature
    //               map into non-overlapping regions and retaining only the
    //               maximum value within each region. This reduces the
    //               computational complexity of the network and helps prevent
    //               overfitting by reducing the number of parameters. For example,
    //               in an image classification CNN, MaxPooling2D layers are
    //               typically used to downsample feature maps after convolutional
    //               layers, reducing their spatial resolution while preserving the
    //               most relevant information.
    //             </Typography>
    //           </ul>
    //         </Typography>
    //         <li style={{ fontSize: 'large', marginTop: '20px' }}>
    //           <b>Batchsize:</b>
    //         </li>
    //         <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //           Batch size determines the number of training examples used in one
    //           iteration of training. Larger batch sizes can speed up training
    //           but require more memory, while smaller batch sizes can lead to
    //           more stable training. Adjust batch size based on hardware
    //           constraints and dataset characteristics to achieve optimal
    //           training performance.
    //         </Typography>

    //         <li style={{ fontSize: 'large', marginTop: '20px' }}>
    //           <b>Weights and Bias:</b>
    //         </li>
    //         <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //           Each connection between neurons has a weight associated with it,
    //           which determines the strength of the connection. The network
    //           learns by adjusting these weights based on the input data.
    //           Additionally, each neuron has a bias term that helps control the
    //           output of that neuron.
    //         </Typography>

    //         <li style={{ fontSize: 'large', marginTop: '20px' }}>
    //           <b>Validation split:</b>
    //         </li>
    //         <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //           Validation split involves dividing the dataset into training and
    //           validation sets to evaluate the model's performance. Validation
    //           split helps monitor the model's generalization ability and tune
    //           hyperparameters effectively. Utilize validation split or
    //           cross-validation techniques to assess model performance and
    //           optimize hyperparameters for better results.
    //         </Typography>
    //         <li style={{ fontSize: 'large', marginTop: '20px' }}>
    //           <b>Target:</b>
    //         </li>
    //         <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //           In machine learning (ML), the target, also known as the target
    //           variable or dependent variable, is the variable that the model
    //           aims to predict or estimate based on the input features.
    //         </Typography>
    //         <li style={{ fontSize: 'large', marginTop: '20px' }}>
    //           <b>Learning Rate:</b>
    //         </li>
    //         <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //           Learning rate controls the step size at which the model's
    //           parameters are updated during training. Proper selection of the
    //           learning rate is crucial for achieving fast convergence without
    //           overshooting or getting stuck in local minima. Experiment with
    //           different learning rates and consider using adaptive learning rate
    //           algorithms for improved performance.
    //         </Typography>
    //         <li style={{ fontSize: 'large', marginTop: '20px' }}>
    //           <b>Epoches:</b>
    //         </li>
    //         <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //           Epochs refer to the number of times the entire dataset is passed
    //           forward and backward through the neural network during training.
    //           Increasing epochs can improve model accuracy by allowing it to
    //           learn from the data multiple times. However, too many epochs can
    //           lead to overfitting. Experiment with different epoch values to
    //           find the optimal balance between model performance and training
    //           time.
    //         </Typography>
    //       </ol>

    //       {/* <h3>Loss Function</h3>
    //       <Typography sx={{ textIndent: '60px' }} fontSize={'large'} mt={1}>
    //         Loss function quantifies the difference between predicted and actual
    //         values, measuring how well the model is performing. Choosing an
    //         appropriate loss function depends on the task at hand, such as
    //         regression or classification. Select a loss function tailored to the
    //         specific ML task and monitor its value during training to assess
    //         model performance.
    //       </Typography>
    //       <h3>Optimizer</h3>
    //       <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
    //         Optimizer adjusts the model's parameters based on the gradients of
    //         the loss function. Different optimizers offer varying convergence
    //         speeds and stability, affecting the training process and final model
    //         performance. Experiment with various optimizers such as SGD, Adam,
    //         and RMSprop to find the most suitable one for your ML task.
    //       </Typography>
    //       <h3>Activation Functions</h3>
    //       <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
    //         Activation functions introduce non-linearity into the neural
    //         network, enabling it to learn complex patterns. Choosing the right
    //         activation function impacts the model's ability to capture and
    //         represent data. Explore different activation functions like ReLU,
    //         sigmoid, and tanh to enhance the expressive power of your neural
    //         network.
    //       </Typography> */}

    //       <Typography
    //         sx={{ textIndent: '60px' }}
    //         mt={2}
    //         mb={4}
    //         fontSize={'large'}
    //       >
    //         Mastering these essential properties in machine learning is vital
    //         for building accurate, efficient, and robust models. By
    //         understanding how epochs, batch size, learning rate, loss function,
    //         optimizer, activation functions, regularization, and validation
    //         techniques impact model training and performance, you'll be
    //         well-equipped to tackle a wide range of ML tasks with confidence.
    //         Experimentation, practice, and continuous learning are key to honing
    //         your skills in machine learning.
    //       </Typography>
    //     </Box>
    //   </Box>
    // </>
  );
};

export default Datasets;
