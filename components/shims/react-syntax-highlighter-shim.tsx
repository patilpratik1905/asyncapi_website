/**
 * Lightweight shim that replaces react-syntax-highlighter with prism-react-renderer.
 *
 * Schyma's internal Code component imports two things from react-syntax-highlighter:
 *   1. `{ Prism as SyntaxHighlighter }` — a component that renders highlighted code
 *   2. `{ prism }` from the styles sub-path — a theme/style object
 *
 * This module provides API-compatible replacements backed by prism-react-renderer
 * (already used by the project's own CodeBlock component) so that webpack can alias
 * the heavy react-syntax-highlighter away, eliminating ~2 MB of Refractor language
 * bundles from the client build.
 *
 * The component is intentionally kept simple because Schyma only ever highlights
 * JSON strings.  The full react-syntax-highlighter props surface is NOT replicated —
 * only the subset Schyma actually uses.
 */

import { Highlight } from 'prism-react-renderer';
import React from 'react';

/* ------------------------------------------------------------------ */
/*  Prism-style theme (light)                                         */
/*  Approximates the built-in "prism" theme that Schyma imports from  */
/*  react-syntax-highlighter/dist/cjs/styles/prism                    */
/* ------------------------------------------------------------------ */
const prismLightTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#ffffff'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#999988', fontStyle: 'italic' as const }
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 }
    },
    {
      types: ['string', 'attr-value'],
      style: { color: '#669900' }
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#393A34' }
    },
    {
      types: [
        'entity', 'url', 'symbol', 'number', 'boolean',
        'variable', 'constant', 'regex', 'inserted'
      ],
      style: { color: '#36acaa' }
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: { color: '#00a4db' }
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: { color: '#d73a49' }
    },
    {
      types: ['function-variable'],
      style: { color: '#6f42c1' }
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: { color: '#00009f' }
    },
    {
      types: ['property'],
      style: { color: '#990055' }
    }
  ]
};

/* ------------------------------------------------------------------ */
/*  SyntaxHighlighter — drop-in for Schyma's usage                    */
/* ------------------------------------------------------------------ */

interface SyntaxHighlighterProps {
  /** Programming language (Schyma always passes 'json') */
  language?: string;
  /** Theme/style object — ignored in this shim; we use our own theme */
  style?: Record<string, unknown>;
  /** Inline style overrides applied to the outer <pre> */
  customStyle?: React.CSSProperties;
  /** Whether to render line numbers */
  showLineNumbers?: boolean;
  /** The code string to highlight */
  children?: string;
}

function SyntaxHighlighter({
  language = 'json',
  customStyle = {},
  showLineNumbers = false,
  children = ''
}: SyntaxHighlighterProps) {
  return (
    <Highlight theme={prismLightTheme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            ...customStyle,
            overflowX: 'auto'
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {showLineNumbers && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2em',
                    textAlign: 'right',
                    paddingRight: '1em',
                    userSelect: 'none',
                    opacity: 0.5,
                    color: '#999'
                  }}
                >
                  {i + 1}
                </span>
              )}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

/* ------------------------------------------------------------------ */
/*  Exports — must match the shapes that Schyma imports               */
/*                                                                     */
/*  Schyma does:                                                       */
/*    import { Prism as SyntaxHighlighter } from 'react-syntax-…'     */
/*    import { prism } from 'react-syntax-…/dist/cjs/styles/prism'    */
/*                                                                     */
/*  The webpack aliases will point both import specifiers at this      */
/*  single file, so we export everything needed from both paths here. */
/* ------------------------------------------------------------------ */

export { SyntaxHighlighter as Prism };
export { prismLightTheme as prism };

export default SyntaxHighlighter;
