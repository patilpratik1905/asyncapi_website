# Lighthouse Performance Audit

This directory contains the local Lighthouse performance auditing system for the AsyncAPI website.

## Overview

The Lighthouse audit script runs comprehensive performance, accessibility, best practices, and SEO audits against all pages in the application. It generates detailed reports for each page and provides a consolidated summary showing which pages need the most attention.

## Quick Start

### Prerequisites

1. Build the production site first:

   ```bash
   npm run build
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

### Run the Audit

```bash
npm run lighthouse:audit
```

This will:

- Start the production server automatically (if not already running)
- Run Lighthouse audits on all defined routes
- Generate individual HTML and JSON reports for each page
- Create a consolidated summary report
- Save all reports to `lighthouse-reports/`

## What Gets Audited

The audit runs against **47 routes** covering all major sections of the website:

- **Home & Core Pages**: Home, Finance, Newsletter, Roadmap, 404
- **Blog**: Blog index and individual posts
- **Community**: All community pages (ambassadors, board, dashboard, events, newsroom, TSC)
- **Documentation**: All doc sections (concepts, guides, migration, reference, tools, tutorials)
- **Tools**: All tool pages (CLI, Generator, GitHub Actions, Modelina, Parsers)
- **Case Studies**: Case studies index

### Adding New Routes

To audit additional pages, edit `routes.json`:

```json
{
  "routes": [
    {
      "path": "/your-new-page",
      "name": "Your New Page"
    }
  ]
}
```

## Reports Generated

After running the audit, reports are saved to `lighthouse-reports/`:

```
lighthouse-reports/
├── html/                          # Individual HTML reports
│   ├── home_2024-06-26T12-00-00.html
│   ├── docs_home_2024-06-26T12-01-00.html
│   └── ...
├── json/                          # Individual JSON reports
│   ├── home_2024-06-26T12-00-00.json
│   ├── docs_home_2024-06-26T12-01-00.json
│   └── ...
├── summary.html                   # Visual summary dashboard
└── summary.json                   # Machine-readable summary
```

### Summary Report

Open `lighthouse-reports/summary.html` in your browser to see:

- **Average Scores**: Overall performance across all pages
- **Worst Performers**: Top 10 pages needing attention (sorted by performance score)
- **Complete Table**: All pages with scores and links to detailed reports

## Understanding Scores

Lighthouse scores range from 0-100:

- **90-100** 🟢 Good - No action needed
- **50-89** 🟠 Needs Improvement - Consider optimizing
- **0-49** 🔴 Poor - Needs immediate attention

### Categories

- **Performance**: Page load speed, interactivity, visual stability
- **Accessibility**: ARIA, color contrast, semantic HTML, keyboard navigation
- **Best Practices**: HTTPS, console errors, deprecated APIs
- **SEO**: Meta tags, structured data, crawlability

## Configuration

### Base URL

By default, audits run against `http://localhost:3000`. To use a different URL:

```bash
LIGHTHOUSE_BASE_URL=http://localhost:8080 npm run lighthouse:audit
```

### Lighthouse Settings

The audit uses desktop configuration optimized for accuracy:

- **Form Factor**: Desktop
- **Screen**: 1350x940
- **Throttling**: Fast 3G simulation
- **Categories**: Performance, Accessibility, Best Practices, SEO

To modify these settings, edit `lighthouseConfig` in `audit.ts`.

## Troubleshooting

### Server Won't Start

If the production server fails to start automatically:

1. Start it manually in a separate terminal:

   ```bash
   npm start
   ```

2. Run the audit in another terminal:
   ```bash
   npm run lighthouse:audit
   ```

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
LIGHTHOUSE_BASE_URL=http://localhost:8080 npm run lighthouse:audit
```

### Chrome Launch Fails

If Chrome fails to launch:

```bash
# Install Chrome/Chromium
# On Ubuntu/Debian:
sudo apt-get install chromium-browser

# On macOS:
brew install --cask google-chrome
```

### Memory Issues

For large numbers of routes:

```bash
# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm run lighthouse:audit
```

## Interpreting Results

### Common Issues and Fixes

**Low Performance Score:**

- Large JavaScript bundles → Use bundle analyzer
- Render-blocking resources → Defer non-critical JS/CSS
- Large images → Optimize and use next/image
- Too many third-party scripts → Lazy load or remove

**Low Accessibility Score:**

- Missing alt text on images
- Insufficient color contrast
- Missing ARIA labels
- Non-semantic HTML

**Low Best Practices Score:**

- Console errors or warnings
- Insecure resources (HTTP instead of HTTPS)
- Deprecated APIs

**Low SEO Score:**

- Missing meta descriptions
- Invalid HTML
- Unreadable font sizes
- Missing viewport meta tag

## Integration with CI/CD

Currently, Lighthouse CI runs on GitHub Actions for pull requests. This local audit provides:

- **More comprehensive coverage**: Tests all routes, not just the homepage
- **Detailed reports**: Individual HTML reports for each page
- **Offline testing**: Run audits before pushing code
- **Baseline establishment**: Compare local changes against production

## Future Improvements

Potential enhancements (not yet implemented):

- [ ] Automatic route discovery from Next.js build output
- [ ] Sitemap-based route auditing
- [ ] Performance regression checks (compare against baseline)
- [ ] CI integration for comprehensive audits
- [ ] Automatic detection of newly added pages
- [ ] Historical trend tracking
- [ ] Slack/email notifications for score drops
- [ ] Parallel audit execution for faster runs
- [ ] Custom scoring thresholds per route
- [ ] Integration with bundle analyzer reports

## Files

- `audit.ts` - Main audit script
- `routes.json` - List of routes to audit (manually maintained)
- `README.md` - This documentation

## Learn More

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
