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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ShowDiagrams } from '../../Components/Charts/BarChart_GoogleLib';
import CardElement from '../../Components/Cards/DatasetCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Datasets = function () {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const datasetsPerPage = 12;

  const handleClick = (event) => {
    navigate('/data/import');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: '50px',
          gap: 3,
          minHeight: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <h2>{t('learn-ai')}</h2>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
          <Typography sx={{ textIndent: '60px', fontSize: 'large' }}>
            <b>Welcome</b> to the learning page focused on essential properties
            in machine learning (ML). In this module, we'll delve into key
            properties that significantly impact the training and performance of
            ML models. Understanding these properties is fundamental for
            building effective and robust ML systems.
          </Typography>
          <Typography fontSize={'large'} mt={2}>
            Let's look at some of the characteristics of machine learning:
          </Typography>
          <h3>Epoches</h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Epochs refer to the number of times the entire dataset is passed
            forward and backward through the neural network during training.
            Increasing epochs can improve model accuracy by allowing it to learn
            from the data multiple times. However, too many epochs can lead to
            overfitting. Experiment with different epoch values to find the
            optimal balance between model performance and training time.
          </Typography>
          <h3>Batch Size</h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Batch size determines the number of training examples used in one
            iteration of training. Larger batch sizes can speed up training but
            require more memory, while smaller batch sizes can lead to more
            stable training. Adjust batch size based on hardware constraints and
            dataset characteristics to achieve optimal training performance.
          </Typography>
          <h3>Learning Rate</h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Learning rate controls the step size at which the model's parameters
            are updated during training. Proper selection of the learning rate
            is crucial for achieving fast convergence without overshooting or
            getting stuck in local minima. Experiment with different learning
            rates and consider using adaptive learning rate algorithms for
            improved performance.
          </Typography>
          <h3>Loss Function</h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Loss function quantifies the difference between predicted and actual
            values, measuring how well the model is performing. Choosing an
            appropriate loss function depends on the task at hand, such as
            regression or classification. Select a loss function tailored to the
            specific ML task and monitor its value during training to assess
            model performance.
          </Typography>
          <h3>Optimizer</h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Optimizer adjusts the model's parameters based on the gradients of
            the loss function. Different optimizers offer varying convergence
            speeds and stability, affecting the training process and final model
            performance. Experiment with various optimizers such as SGD, Adam,
            and RMSprop to find the most suitable one for your ML task.
          </Typography>
          <h3>Activation Functions</h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Activation functions introduce non-linearity into the neural
            network, enabling it to learn complex patterns. Choosing the right
            activation function impacts the model's ability to capture and
            represent data. Explore different activation functions like ReLU,
            sigmoid, and tanh to enhance the expressive power of your neural
            network.
          </Typography>
          <h3>Validation Split </h3>
          <Typography sx={{ textIndent: '60px' }} fontSize={'large'}>
            Validation split involves dividing the dataset into training and
            validation sets to evaluate the model's performance. Validation
            split helps monitor the model's generalization ability and tune
            hyperparameters effectively. Utilize validation split or
            cross-validation techniques to assess model performance and optimize
            hyperparameters for better results.
          </Typography>
          <Typography
            sx={{ textIndent: '60px' }}
            mt={2}
            mb={4}
            fontSize={'large'}
          >
            Mastering these essential properties in machine learning is vital
            for building accurate, efficient, and robust models. By
            understanding how epochs, batch size, learning rate, loss function,
            optimizer, activation functions, regularization, and validation
            techniques impact model training and performance, you'll be
            well-equipped to tackle a wide range of ML tasks with confidence.
            Experimentation, practice, and continuous learning are key to honing
            your skills in machine learning.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Datasets;
