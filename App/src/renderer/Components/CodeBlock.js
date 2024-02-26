import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';
import hljs from 'highlight.js';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card } from '@mui/material';

const CodeBlock = ({ language, code }) => {
  const codeRef = useRef(null);
  const theme = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '100%',
        pre: {
          background: theme.palette.background.main,
          color: theme.palette.text.main,
          padding: '1.25em',
        },
        'pre code.hljs': {
          display: 'block',
          overflowX: 'auto',
        },
        'code.hljs': {
          padding: '3px 5px',
        },
        '.hljs-meta, .hljs-comment': {
          color: theme.palette.mode === 'light' ? '#292e42' : '#565f89',
        },
        '.hljs-tag, .hljs-doctag, .hljs-selector-id, .hljs-selector-class, .hljs-regexp, .hljs-template-tag, .hljs-selector-pseudo, .hljs-selector-attr, .hljs-variable.language_, .hljs-deletion':
          {
            color: theme.palette.mode === 'light' ? '#7e3653' : '#f7768e',
          },
        '.hljs-variable, .hljs-template-variable, .hljs-number, .hljs-literal, .hljs-type, .hljs-params, .hljs-link':
          {
            color: theme.palette.mode === 'light' ? '#ad4b27' : '#ff9e64',
          },
        '.hljs-built_in, .hljs-attribute': {
          color: theme.palette.mode === 'light' ? '#8d5630' : '#e0af68',
        },
        '.hljs-selector-tag': {
          color: theme.palette.mode === 'light' ? '#0f596f' : '#2ac3de',
        },
        '.hljs-keyword, .hljs-title.function_, .hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-subst, .hljs-property':
          {
            color: theme.palette.mode === 'light' ? '#295fad' : '#7dcfff',
          },
        '.hljs-selector-tag': {
          color: theme.palette.mode === 'light' ? '#1b6b63' : '#73daca',
        },
        '.hljs-quote, .hljs-string, .hljs-symbol, .hljs-bullet, .hljs-addition':
          {
            color: theme.palette.mode === 'light' ? '#4d692e' : '#9ece6a',
          },
        '.hljs-code, .hljs-formula, .hljs-section': {
          color: theme.palette.mode === 'light' ? '#1f4a7c' : '#7aa2f7',
        },
        '.hljs-name, .hljs-keyword, .hljs-operator, .hljs-keyword, .hljs-char.escape_, .hljs-attr':
          {
            color: theme.palette.mode === 'light' ? '#5c3485' : '#bb9af7',
          },
        '.hljs-punctuation': {
          color: theme.palette.mode === 'light' ? '#666e8a' : '#c0caf5',
        },
        '.hljs-emphasis': {
          fontStyle: 'italic',
        },
        '.hljs-strong': {
          fontWeight: 'bold',
        },
      }}
    >
      <Button
        onClick={copyToClipboard}
        sx={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          zIndex: '1',
        }}
      >
        {t('copy')}
      </Button>
      <pre>
        <code ref={codeRef} className={language}>
          {code}
        </code>
      </pre>
    </Card>
  );
};

export default CodeBlock;
