import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  Link,
  Alert,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CodeBlock from '../../Components/CodeBlock';
import { useNavigate } from 'react-router-dom';

export default function LearnSetup() {
  const pipInstallCommand = `pip install "tensorflow<2.11" numpy pandas`;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenUrl = (url) => {
    window.electronAPI.openUrl(url);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        p: 3,
        pb: 0,
      }}
    >
      <Typography variant="h4">{t('setup')}</Typography>
      <Typography variant="p">{t('setup-introduction')}</Typography>
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'border.main' }}
        value={value}
        onChange={handleChange}
      >
        <Tab label={'CPU'} value={0} />
        <Tab label={'GPU'} value={1} />
      </Tabs>
      <Box
        display={value == 0 ? 'flex' : 'none'}
        sx={{ flexDirection: 'column', gap: 3 }}
      >
        <Typography variant="p">
          {t('cpu-introduction')}{' '}
          <span style={{ fontWeight: 'bold' }}>6.{t('gpu-setup')}</span>.
        </Typography>
        <Box>
          <Typography variant="h5">1. {t('system-requirements')}</Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
            }}
          >
            <ListItem>Windows 7 {t('or-higher')} (64-bit)</ListItem>
          </List>
        </Box>
        <Box>
          <Typography variant="h5">
            {`2. Install Python (Python 3.8 – 3.11)`}
          </Typography>
          <Typography variant="p">
            {t('python-version')}
            <Link
              sx={{ cursor: 'pointer' }}
              onClick={() => handleOpenUrl('https://www.python.org/downloads/')}
            >
              {t('official-python-website')}.
            </Link>
            {t('check-python-path')}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5">3. {t('open-command-prompt')}</Typography>
          <Typography variant="p">
            {t('press')} <span style={{ fontWeight: 'bold' }}>Win + R</span>,
            {t('type-cmd')} <span style={{ fontWeight: 'bold' }}>cmd</span>{' '}
            {t('press-enter')}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5">4. {t('create-virtual-env')}</Typography>
          <CodeBlock language={'bash'} code={`python -m venv tf`} />
        </Box>

        <Box>
          <Typography variant="h5">5. {t('activate-virtual-env')}</Typography>
          <Typography variant="p">{t('active-virtual-env')}</Typography>
          <CodeBlock language={'bash'} code={`tf\\Scripts\\activate`} />
        </Box>

        <Box>
          <Typography variant="h5">
            6. {t('install-necessary-libraries')}
          </Typography>
          <Typography variant="p">{t('once-activated-env')}</Typography>
          <CodeBlock language={'bash'} code={pipInstallCommand} />
        </Box>

        <Typography variant="h5">7. {t('select-python-executable')}</Typography>

        <List
          sx={{
            listStyleType: 'disc',
            pl: 2,
            '& .MuiListItem-root': {
              display: 'list-item',
            },
          }}
        >
          <ListItem>Go to the settings on the bottom left</ListItem>
          <ListItem>
            Select the path to the python executable of the environment you just
            created
          </ListItem>
        </List>
        <Box>
          <Typography variant="p">
            If you dont know what the path to the environment is you can run
          </Typography>
          <CodeBlock language={'bash'} code={`where python`} />
        </Box>
        <Alert variant="filled" severity="info" sx={{ color: 'text.contrast' }}>
          By default the path should be:
          C:\Users\name-of-your-user\tf\Scripts\python.exe
        </Alert>
      </Box>
      <Box
        display={value == 1 ? 'flex' : 'none'}
        sx={{ flexDirection: 'column', gap: 3 }}
      >
        <Box>
          <Typography variant="h5">1. System requirements</Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
            }}
          >
            <ListItem>Windows 7 or higher (64-bit)</ListItem>
          </List>
        </Box>
        <Box>
          <Typography variant="h5">
            2. Install Microsoft Visual C++ Redistributable
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
            }}
          >
            <ListItem>
              {'Go to the '}
              <Link
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  handleOpenUrl(
                    'https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170',
                  )
                }
              >
                {'Microsoft Visual C++ downloads'}
              </Link>
              {/* <Button onClick={handleOpenUrl}>button</Button> */}
            </ListItem>
            <ListItem>
              Scroll down the page to the Visual Studio 2015, 2017 and 2019
              section.
            </ListItem>
            <ListItem>
              Download and install the Microsoft Visual C++ Redistributable for
              Visual Studio 2015, 2017 and 2019 for your platform.
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography variant="h5">3. Install Miniconda</Typography>
          <Typography variant="p">
            Download the{' '}
            <Link
              href={
                'https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe'
              }
            >
              Miniconda Windows Installer
            </Link>
            . Double-click the downloaded file and follow the instructions on
            the screen.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">4. Open Anaconda Prompt</Typography>
          <Typography variant="p">
            Press <span style={{ fontWeight: 'bold' }}>Win</span>, type{' '}
            <span style={{ fontWeight: 'bold' }}>Anaconda Prompt</span> and
            press Enter to open the Anaconda Prompt.
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Typography variant="h5">5. Create a conda environment</Typography>
          <Box>
            <Typography variant="p">
              Create a new conda environment named tf by running the following
              command
            </Typography>
            <CodeBlock
              language="bash"
              code={`conda create --name tf python=3.9`}
            />
          </Box>

          <Box>
            <Typography variant="p">Activate the environment</Typography>
            <CodeBlock
              language="bash"
              code={`conda deactivate
conda activate tf`}
            />
          </Box>

          <Box>
            <Typography variant="p">Update pip</Typography>
            <CodeBlock language="bash" code={`pip install --upgrade pip`} />
          </Box>
          <Box>
            <Typography variant="p">Download tensorflow</Typography>
            <CodeBlock language="bash" code={pipInstallCommand} />
          </Box>
          <Typography variant="h5">6. GPU setup</Typography>
          <Box>
            <Typography variant="p">
              Run the following command in order to setup GPU support
            </Typography>
            <CodeBlock
              language="bash"
              code={`conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0`}
            />
          </Box>

          <Typography variant="h5">
            7. Selecting the python executable
          </Typography>

          <List
            sx={{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
            }}
          >
            <ListItem>Go to the settings on the bottom left</ListItem>
            <ListItem>
              Select the path to the python executable of the environment you
              just created
            </ListItem>
          </List>
          <Box>
            <Typography variant="p">
              If you dont know what the path to the environment is you can run
            </Typography>
            <CodeBlock language={'bash'} code={`conda info --envs`} />
          </Box>

          <Alert
            variant="filled"
            severity="info"
            sx={{ color: 'text.contrast' }}
          >
            By default the path should be:
            C:\Users\name-of-your-user\miniconda3\envs\tf\python.exe
          </Alert>
        </Box>
      </Box>
      <Box width={'100%'} mb={3}>
        <Typography variant="p">
          If followed the instructions to this point the enviornment should be
          set up and you should have the ability to train your own models. You
          can close everything you had to open and can proceed with the{' '}
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/learn/tutorial')}
          >
            Tutorial
          </Link>{' '}
          which will guide you on how to create and use your own models . In
          case you faced any issues you can check the full{' '}
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenUrl('https://www.tensorflow.org/install')}
          >
            Tensorflow installation guide
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
