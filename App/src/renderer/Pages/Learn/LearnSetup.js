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
  const pipInstallCommand = `pip install tensorflow numpy pandas`;
  const { t } = useTranslation();
  const navigate = useNavigate();
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
            {`2.`} {t('install')} {`Python (Python 3.11.5)`}
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
          <ListItem>{t('select-python-executable-subinfo-1')}</ListItem>
          <ListItem>{t('select-python-executable-subinfo-2')}</ListItem>
        </List>
        <Box>
          <Typography variant="p">{t('do-not-run-python-env')}</Typography>
          <CodeBlock language={'bash'} code={`where python`} />
        </Box>
        <Alert variant="filled" severity="info" sx={{ color: 'text.contrast' }}>
          {t('default-path-text')}
          C:\Users\name-of-your-user\tf\Scripts\python.exe
        </Alert>
      </Box>
      <Box
        display={value == 1 ? 'flex' : 'none'}
        sx={{ flexDirection: 'column', gap: 3 }}
      >
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
            2. {t('install-microsoft-visual-redistributable')}
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
              {t('go-to')}
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
            </ListItem>
            <ListItem>{t('install-VS-subinstruction-1')}</ListItem>
            <ListItem>{t('install-VS-subinstruction-2')}</ListItem>
          </List>
        </Box>
        <Box>
          <Typography variant="h5">3. {t('install')} Miniconda</Typography>
          <Typography variant="p">
            {t('download')}
            <Link
              href={
                'https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe'
              }
            >
              Miniconda Windows Installer
            </Link>
            . {t('double-click-instruction')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">4. {t('open')} Anaconda Prompt</Typography>
          <Typography variant="p">
            {t('press')} <span style={{ fontWeight: 'bold' }}>Win</span>,
            {t('type-cmd')}
            <span style={{ fontWeight: 'bold' }}>Anaconda Prompt</span>{' '}
            {t('press-enter-gpu')}
            Anaconda Prompt.
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Typography variant="h5">5.{t('create-conda-env')}</Typography>
          <Box>
            <Typography variant="p">
              {t('create-conda-env-instruction-1')}
            </Typography>
            <CodeBlock
              language="bash"
              code={`conda create --name tf python=3.9`}
            />
          </Box>

          <Box>
            <Typography variant="p">{t('activate-env')}</Typography>
            <CodeBlock
              language="bash"
              code={`conda deactivate
conda activate tf`}
            />
          </Box>

          <Box>
            <Typography variant="p">{t('update')} pip</Typography>
            <CodeBlock language="bash" code={`pip install --upgrade pip`} />
          </Box>
          <Box>
            <Typography variant="p">{t('download')} tensorflow</Typography>
            <CodeBlock language="bash" code={pipInstallCommand} />
          </Box>
          <Typography variant="h5">6. GPU {t('setup')}</Typography>
          <Box>
            <Typography variant="p">
              {t('run-following-command-gpu')}
            </Typography>
            <CodeBlock
              language="bash"
              code={`conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0`}
            />
          </Box>

          <Typography variant="h5">
            7. {t('select-python-executable')}
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
            <ListItem>{t('select-python-executable-subinfo-1')}</ListItem>
            <ListItem>{t('select-python-executable-subinfo-2')}</ListItem>
          </List>
          <Box>
            <Typography variant="p">{t('do-not-run-python-env')}</Typography>
            <CodeBlock language={'bash'} code={`conda info --envs`} />
          </Box>

          <Alert
            variant="filled"
            severity="info"
            sx={{ color: 'text.contrast' }}
          >
            {t('default-path-text')}
            C:\Users\name-of-your-user\miniconda3\envs\tf\python.exe
          </Alert>
        </Box>
      </Box>
      <Box width={'100%'} mb={3}>
        <Typography variant="p">
          {t('instructions-conclusion')}
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/learn/tutorial')}
          >
            {t('tutorial')}
          </Link>
          {t('instructions-conclusion-rest-part')}{' '}
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenUrl('https://www.tensorflow.org/install')}
          >
            Tensorflow{t('installation-guide')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
