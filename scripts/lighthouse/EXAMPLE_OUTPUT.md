# Example Lighthouse Audit Output

This document shows sample output from running the Lighthouse audit.

## Console Output

```bash
$ npm run lighthouse:audit

> @asyncapi/website@0.1.0 lighthouse:audit
> tsx scripts/lighthouse/audit.ts

🔦 AsyncAPI Lighthouse Audit
============================

📋 Loaded 47 routes to audit

⚠️  Server not detected at http://localhost:3000
🚀 Starting production server...

   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │   Serving!                                         │
   │                                                    │
   │   - Local:    http://localhost:3000                │
   │   - Network:  http://192.168.1.100:3000           │
   │                                                    │
   │   Copied local address to clipboard!               │
   │                                                    │
   └────────────────────────────────────────────────────┘

✅ Server is ready!

🌐 Launching Chrome...

🔍 Auditing: Home (http://localhost:3000/)
✅ Performance: 92 | Accessibility: 98 | Best Practices: 100 | SEO: 100

🔍 Auditing: 404 Error Page (http://localhost:3000/404)
✅ Performance: 95 | Accessibility: 100 | Best Practices: 100 | SEO: 100

🔍 Auditing: Finance (http://localhost:3000/finance)
✅ Performance: 78 | Accessibility: 96 | Best Practices: 92 | SEO: 100

🔍 Auditing: Newsletter (http://localhost:3000/newsletter)
✅ Performance: 89 | Accessibility: 98 | Best Practices: 100 | SEO: 100

🔍 Auditing: Roadmap (http://localhost:3000/roadmap)
✅ Performance: 65 | Accessibility: 95 | Best Practices: 92 | SEO: 100

🔍 Auditing: Blog Index (http://localhost:3000/blog)
✅ Performance: 73 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Case Studies Index (http://localhost:3000/casestudies)
✅ Performance: 88 | Accessibility: 98 | Best Practices: 100 | SEO: 100

🔍 Auditing: Community Home (http://localhost:3000/community)
✅ Performance: 91 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Community Ambassadors (http://localhost:3000/community/ambassadors)
✅ Performance: 82 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Community Board (http://localhost:3000/community/board)
✅ Performance: 94 | Accessibility: 98 | Best Practices: 100 | SEO: 100

🔍 Auditing: Community Dashboard (http://localhost:3000/community/dashboard)
✅ Performance: 58 | Accessibility: 94 | Best Practices: 92 | SEO: 100

🔍 Auditing: Community Events (http://localhost:3000/community/events)
✅ Performance: 86 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Community Events & Updates (http://localhost:3000/community/events-and-updates)
✅ Performance: 71 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Community Newsroom (http://localhost:3000/community/newsroom)
✅ Performance: 62 | Accessibility: 95 | Best Practices: 92 | SEO: 100

🔍 Auditing: Community TSC (http://localhost:3000/community/tsc)
✅ Performance: 93 | Accessibility: 98 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Home (http://localhost:3000/docs)
✅ Performance: 87 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Concepts (http://localhost:3000/docs/concepts)
✅ Performance: 90 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs AsyncAPI Document (http://localhost:3000/docs/concepts/asyncapi-document)
✅ Performance: 88 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Application Concept (http://localhost:3000/docs/concepts/application)
✅ Performance: 91 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Channel Concept (http://localhost:3000/docs/concepts/channel)
✅ Performance: 89 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Message Concept (http://localhost:3000/docs/concepts/message)
✅ Performance: 92 | Accessibility: 98 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Server Concept (http://localhost:3000/docs/concepts/server)
✅ Performance: 90 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Guides (http://localhost:3000/docs/guides)
✅ Performance: 89 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Message Validation Guide (http://localhost:3000/docs/guides/message-validation)
✅ Performance: 85 | Accessibility: 95 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Migration (http://localhost:3000/docs/migration)
✅ Performance: 91 | Accessibility: 97 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Migrating to v3 (http://localhost:3000/docs/migration/migrating-to-v3)
✅ Performance: 83 | Accessibility: 95 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Reference (http://localhost:3000/docs/reference)
✅ Performance: 90 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Spec v3.0.0 (http://localhost:3000/docs/reference/specification/v3.0.0)
✅ Performance: 54 | Accessibility: 93 | Best Practices: 92 | SEO: 100

🔍 Auditing: Docs Tools (http://localhost:3000/docs/tools)
✅ Performance: 88 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs CLI Tool (http://localhost:3000/docs/tools/cli)
✅ Performance: 81 | Accessibility: 94 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Generator Tool (http://localhost:3000/docs/tools/generator)
✅ Performance: 86 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Tutorials (http://localhost:3000/docs/tutorials)
✅ Performance: 89 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Getting Started Tutorial (http://localhost:3000/docs/tutorials/getting-started)
✅ Performance: 87 | Accessibility: 95 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Create AsyncAPI Document (http://localhost:3000/docs/tutorials/create-asyncapi-document)
✅ Performance: 84 | Accessibility: 95 | Best Practices: 100 | SEO: 100

🔍 Auditing: Docs Community (http://localhost:3000/docs/community)
✅ Performance: 88 | Accessibility: 96 | Best Practices: 100 | SEO: 100

🔍 Auditing: Tools Index (http://localhost:3000/tools)
✅ Performance: 79 | Accessibility: 95 | Best Practices: 100 | SEO: 100

🔍 Auditing: Tools CLI (http://localhost:3000/tools/cli)
✅ Performance: 76 | Accessibility: 94 | Best Practices: 100 | SEO: 100

🔍 Auditing: Tools Generator (http://localhost:3000/tools/generator)
✅ Performance: 72 | Accessibility: 93 | Best Practices: 92 | SEO: 100

🔍 Auditing: Tools GitHub Actions (http://localhost:3000/tools/github-actions)
✅ Performance: 80 | Accessibility: 95 | Best Practices: 100 | SEO: 100

🔍 Auditing: Tools Modelina (http://localhost:3000/tools/modelina)
✅ Performance: 68 | Accessibility: 93 | Best Practices: 92 | SEO: 100

🔍 Auditing: Tools Parsers (http://localhost:3000/tools/parsers)
✅ Performance: 77 | Accessibility: 94 | Best Practices: 100 | SEO: 100

📊 Summary Report Generated:
   JSON: /path/to/lighthouse-reports/summary.json
   HTML: /path/to/lighthouse-reports/summary.html

✅ All audits complete!

📁 Reports saved to: /path/to/lighthouse-reports
   - HTML reports: /path/to/lighthouse-reports/html
   - JSON reports: /path/to/lighthouse-reports/json
   - Summary: /path/to/lighthouse-reports/summary.html

🛑 Stopping server...
```

## Summary JSON Structure

The `summary.json` file contains:

```json
{
  "timestamp": "2024-06-26T15:30:45.123Z",
  "baseUrl": "http://localhost:3000",
  "totalPages": 47,
  "averages": {
    "performance": 82,
    "accessibility": 96,
    "bestPractices": 98,
    "seo": 100
  },
  "results": [
    {
      "name": "Home",
      "path": "/",
      "url": "http://localhost:3000/",
      "scores": {
        "performance": 92,
        "accessibility": 98,
        "bestPractices": 100,
        "seo": 100
      },
      "htmlReport": "html/home_2024-06-26T15-30-00-000Z.html",
      "jsonReport": "json/home_2024-06-26T15-30-00-000Z.json"
    },
    {
      "name": "Docs Spec v3.0.0",
      "path": "/docs/reference/specification/v3.0.0",
      "url": "http://localhost:3000/docs/reference/specification/v3.0.0",
      "scores": {
        "performance": 54,
        "accessibility": 93,
        "bestPractices": 92,
        "seo": 100
      },
      "htmlReport": "html/docs_spec_v3_0_0_2024-06-26T15-32-15-000Z.html",
      "jsonReport": "json/docs_spec_v3_0_0_2024-06-26T15-32-15-000Z.json"
    }
    // ... 45 more results
  ],
  "worstPerformers": [
    {
      "name": "Docs Spec v3.0.0",
      "path": "/docs/reference/specification/v3.0.0",
      "performanceScore": 54
    },
    {
      "name": "Community Dashboard",
      "path": "/community/dashboard",
      "performanceScore": 58
    },
    {
      "name": "Community Newsroom",
      "path": "/community/newsroom",
      "performanceScore": 62
    },
    {
      "name": "Roadmap",
      "path": "/roadmap",
      "performanceScore": 65
    },
    {
      "name": "Tools Modelina",
      "path": "/tools/modelina",
      "performanceScore": 68
    },
    {
      "name": "Community Events & Updates",
      "path": "/community/events-and-updates",
      "performanceScore": 71
    },
    {
      "name": "Tools Generator",
      "path": "/tools/generator",
      "performanceScore": 72
    },
    {
      "name": "Blog Index",
      "path": "/blog",
      "performanceScore": 73
    },
    {
      "name": "Tools CLI",
      "path": "/tools/cli",
      "performanceScore": 76
    },
    {
      "name": "Tools Parsers",
      "path": "/tools/parsers",
      "performanceScore": 77
    }
  ]
}
```

## Summary HTML Preview

The `summary.html` file displays:

### Header Section

```
🔦 Lighthouse Audit Summary
Generated: 6/26/2024, 3:30:45 PM | Base URL: http://localhost:3000 | Total Pages: 47
```

### Average Scores (Colored Cards)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Performance  │  │Accessibility │  │Best Practices│  │     SEO      │
│      82      │  │      96      │  │      98      │  │     100      │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### Worst Performers (Warning Box)

```
⚠️ Pages Needing Most Attention (Lowest Performance Scores)

1. Docs Spec v3.0.0 (/docs/reference/specification/v3.0.0) - Performance: 54
2. Community Dashboard (/community/dashboard) - Performance: 58
3. Community Newsroom (/community/newsroom) - Performance: 62
4. Roadmap (/roadmap) - Performance: 65
5. Tools Modelina (/tools/modelina) - Performance: 68
6. Community Events & Updates (/community/events-and-updates) - Performance: 71
7. Tools Generator (/tools/generator) - Performance: 72
8. Blog Index (/blog) - Performance: 73
9. Tools CLI (/tools/cli) - Performance: 76
10. Tools Parsers (/tools/parsers) - Performance: 77
```

### Complete Table

```
Page                  | Path               | Perf | A11y | BP  | SEO | Reports
---------------------|--------------------| -----|------|-----|-----|----------
Home                 | /                  |  92  |  98  | 100 | 100 | HTML | JSON
404 Error Page       | /404               |  95  | 100  | 100 | 100 | HTML | JSON
Finance              | /finance           |  78  |  96  |  92 | 100 | HTML | JSON
Newsletter           | /newsletter        |  89  |  98  | 100 | 100 | HTML | JSON
Roadmap              | /roadmap           |  65  |  95  |  92 | 100 | HTML | JSON
...
```

## Individual Page Report Example

Each page gets its own detailed HTML report with:

### Overview Section

- Performance score: 54/100
- First Contentful Paint: 2.1s
- Largest Contentful Paint: 4.8s
- Total Blocking Time: 850ms
- Cumulative Layout Shift: 0.12
- Speed Index: 3.6s

### Opportunities

- Reduce unused JavaScript (potential savings: 420 KB)
- Properly size images (potential savings: 180 KB)
- Eliminate render-blocking resources (potential savings: 0.8s)
- Reduce server response times (TTFB: 1.2s)

### Diagnostics

- Minimize main-thread work: 3.2s
- JavaScript execution time: 2.1s
- Avoid enormous network payloads: Total size 3.2 MB
- Largest network payload: react-bundle.js (1.2 MB)

### Accessibility Issues

- Some elements don't have sufficient color contrast
- Links do not have a discernible name (3 occurrences)

### Best Practices Issues

- Uses deprecated APIs (1 occurrence)
- Browser errors logged to console (2 errors)

## File Structure After Audit

```
lighthouse-reports/
├── summary.html                                    # 42 KB
├── summary.json                                    # 15 KB
├── html/
│   ├── home_2024-06-26T15-30-00-000Z.html         # 2.1 MB
│   ├── 404_error_page_2024-06-26T15-30-15-000Z.html
│   ├── finance_2024-06-26T15-30-30-000Z.html
│   ├── newsletter_2024-06-26T15-30-45-000Z.html
│   └── ... (43 more HTML files)
└── json/
    ├── home_2024-06-26T15-30-00-000Z.json         # 890 KB
    ├── 404_error_page_2024-06-26T15-30-15-000Z.json
    ├── finance_2024-06-26T15-30-30-000Z.json
    ├── newsletter_2024-06-26T15-30-45-000Z.json
    └── ... (43 more JSON files)
```

**Total Size:** ~150-200 MB for all reports

## Performance Insights Example

From the worst performing page (Docs Spec v3.0.0):

**Key Issues Identified:**

1. **Large JavaScript Bundle** (1.8 MB)
   - React and dependencies: 450 KB
   - Visualization libraries: 620 KB
   - Code highlighting: 280 KB (❗ This is what your optimization targets!)
   - Other dependencies: 450 KB

2. **Unoptimized Images** (8 images, 420 KB total)
   - Could save 180 KB with proper compression

3. **Render-Blocking Resources**
   - 3 CSS files blocking render (85 KB)
   - 2 font files not optimized (120 KB)

4. **Long Tasks on Main Thread**
   - Initial JavaScript parsing: 680ms
   - React hydration: 420ms
   - Syntax highlighting initialization: 310ms

**Recommended Actions:**

1. ✅ Replace react-syntax-highlighter (your current PR!)
2. Lazy-load visualization components
3. Optimize images with next/image
4. Defer non-critical CSS
5. Preload critical fonts
