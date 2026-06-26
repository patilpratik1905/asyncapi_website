#!/usr/bin/env tsx

/**
 * Lighthouse Performance Audit Script
 *
 * This script runs Lighthouse audits against all defined routes in the application.
 * It generates individual HTML and JSON reports for each page, plus a consolidated
 * summary showing performance metrics across all pages.
 *
 * Usage:
 *   npm run lighthouse:audit
 *
 * Reports are saved to: lighthouse-reports/
 */

import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000';
const REPORTS_DIR = path.join(process.cwd(), 'lighthouse-reports');
const ROUTES_FILE = path.join(__dirname, 'routes.json');

// Lighthouse configuration
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop' as const,
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
};

interface Route {
  path: string;
  name: string;
}

interface LighthouseResult {
  route: Route;
  url: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  reportPath: string;
  jsonPath: string;
  timestamp: string;
}

/**
 * Load routes from routes.json
 */
function loadRoutes(): Route[] {
  try {
    const routesData = fs.readJsonSync(ROUTES_FILE);
    return routesData.routes;
  } catch (error) {
    console.error('❌ Error loading routes.json:', error);
    process.exit(1);
  }
}

/**
 * Check if the server is running
 */
async function checkServer(): Promise<boolean> {
  try {
    const response = await fetch(BASE_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Start the production server
 */
function startServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting production server...');
    const serverProcess = spawn('npm', ['start'], {
      stdio: 'pipe',
      shell: true,
    });

    let resolved = false;

    serverProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      console.log(output);

      // Check if server is ready
      if (
        output.includes('Accepting connections') ||
        output.includes('serving')
      ) {
        if (!resolved) {
          resolved = true;
          setTimeout(() => resolve(serverProcess), 2000);
        }
      }
    });

    serverProcess.stderr?.on('data', (data) => {
      console.error(data.toString());
    });

    serverProcess.on('error', (error) => {
      reject(error);
    });

    // Fallback timeout
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(serverProcess);
      }
    }, 5000);
  });
}

/**
 * Run Lighthouse audit for a single URL
 */
async function runLighthouseAudit(
  chrome: chromeLauncher.LaunchedChrome,
  route: Route,
): Promise<LighthouseResult | null> {
  const url = `${BASE_URL}${route.path}`;
  console.log(`\n🔍 Auditing: ${route.name} (${url})`);

  try {
    const runnerResult = await lighthouse(
      url,
      {
        port: chrome.port,
        output: ['html', 'json'],
      },
      lighthouseConfig,
    );

    if (!runnerResult) {
      console.error(`❌ Failed to get results for ${url}`);
      return null;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeRouteName = route.name
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    // Save HTML report
    const htmlReportPath = path.join(
      REPORTS_DIR,
      'html',
      `${safeRouteName}_${timestamp}.html`,
    );
    await fs.ensureDir(path.dirname(htmlReportPath));
    await fs.writeFile(htmlReportPath, runnerResult.report[0]);

    // Save JSON report
    const jsonReportPath = path.join(
      REPORTS_DIR,
      'json',
      `${safeRouteName}_${timestamp}.json`,
    );
    await fs.ensureDir(path.dirname(jsonReportPath));
    await fs.writeFile(jsonReportPath, runnerResult.report[1]);

    const lhr = runnerResult.lhr;
    const scores = {
      performance: Math.round((lhr.categories.performance?.score || 0) * 100),
      accessibility: Math.round(
        (lhr.categories.accessibility?.score || 0) * 100,
      ),
      bestPractices: Math.round(
        (lhr.categories['best-practices']?.score || 0) * 100,
      ),
      seo: Math.round((lhr.categories.seo?.score || 0) * 100),
    };

    console.log(
      `✅ Performance: ${scores.performance} | Accessibility: ${scores.accessibility} | Best Practices: ${scores.bestPractices} | SEO: ${scores.seo}`,
    );

    return {
      route,
      url,
      scores,
      reportPath: htmlReportPath,
      jsonPath: jsonReportPath,
      timestamp,
    };
  } catch (error) {
    console.error(`❌ Error auditing ${url}:`, error);
    return null;
  }
}

/**
 * Generate summary report
 */
async function generateSummaryReport(
  results: LighthouseResult[],
): Promise<void> {
  const summaryPath = path.join(REPORTS_DIR, 'summary.json');
  const summaryHtmlPath = path.join(REPORTS_DIR, 'summary.html');

  // Calculate averages
  const totals = results.reduce(
    (acc, result) => ({
      performance: acc.performance + result.scores.performance,
      accessibility: acc.accessibility + result.scores.accessibility,
      bestPractices: acc.bestPractices + result.scores.bestPractices,
      seo: acc.seo + result.scores.seo,
    }),
    { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 },
  );

  const count = results.length;
  const averages = {
    performance: Math.round(totals.performance / count),
    accessibility: Math.round(totals.accessibility / count),
    bestPractices: Math.round(totals.bestPractices / count),
    seo: Math.round(totals.seo / count),
  };

  // Sort by performance (worst first)
  const sortedByPerformance = [...results].sort(
    (a, b) => a.scores.performance - b.scores.performance,
  );

  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalPages: count,
    averages,
    results: results.map((r) => ({
      name: r.route.name,
      path: r.route.path,
      url: r.url,
      scores: r.scores,
      htmlReport: path.relative(REPORTS_DIR, r.reportPath),
      jsonReport: path.relative(REPORTS_DIR, r.jsonPath),
    })),
    worstPerformers: sortedByPerformance.slice(0, 10).map((r) => ({
      name: r.route.name,
      path: r.route.path,
      performanceScore: r.scores.performance,
    })),
  };

  // Save JSON summary
  await fs.writeJson(summaryPath, summary, { spaces: 2 });

  // Generate HTML summary
  const htmlSummary = generateHtmlSummary(summary);
  await fs.writeFile(summaryHtmlPath, htmlSummary);

  console.log('\n📊 Summary Report Generated:');
  console.log(`   JSON: ${summaryPath}`);
  console.log(`   HTML: ${summaryHtmlPath}`);
}

/**
 * Generate HTML summary report
 */
function generateHtmlSummary(summary: any): string {
  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#0cce6b';
    if (score >= 50) return '#ffa400';
    return '#ff4e42';
  };

  const renderScoreBadge = (score: number): string => {
    return `<span style="background-color: ${getScoreColor(score)}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${score}</span>`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lighthouse Audit Summary - ${new Date(summary.timestamp).toLocaleDateString()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 { color: #1a1a1a; margin-bottom: 10px; font-size: 32px; }
    h2 { color: #333; margin-top: 40px; margin-bottom: 20px; font-size: 24px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
    .meta { color: #666; font-size: 14px; margin-bottom: 30px; }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-card.performance { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .stat-card.accessibility { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
    .stat-card.best-practices { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
    .stat-card.seo { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
    .stat-label { font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
    .stat-value { font-size: 48px; font-weight: bold; margin: 10px 0; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 14px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #333;
      position: sticky;
      top: 0;
    }
    tr:hover { background-color: #f8f9fa; }
    a { color: #667eea; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .worst-performers {
      background: #fff3cd;
      border-left: 4px solid #ffa400;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .worst-performers h3 { margin-bottom: 15px; color: #856404; }
    .worst-performers ol { margin-left: 20px; }
    .worst-performers li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔦 Lighthouse Audit Summary</h1>
    <div class="meta">
      <strong>Generated:</strong> ${new Date(summary.timestamp).toLocaleString()} | 
      <strong>Base URL:</strong> ${summary.baseUrl} | 
      <strong>Total Pages:</strong> ${summary.totalPages}
    </div>

    <h2>📈 Average Scores</h2>
    <div class="stats">
      <div class="stat-card performance">
        <div class="stat-label">Performance</div>
        <div class="stat-value">${summary.averages.performance}</div>
      </div>
      <div class="stat-card accessibility">
        <div class="stat-label">Accessibility</div>
        <div class="stat-value">${summary.averages.accessibility}</div>
      </div>
      <div class="stat-card best-practices">
        <div class="stat-label">Best Practices</div>
        <div class="stat-value">${summary.averages.bestPractices}</div>
      </div>
      <div class="stat-card seo">
        <div class="stat-label">SEO</div>
        <div class="stat-value">${summary.averages.seo}</div>
      </div>
    </div>

    <div class="worst-performers">
      <h3>⚠️ Pages Needing Most Attention (Lowest Performance Scores)</h3>
      <ol>
        ${summary.worstPerformers
          .map(
            (p: any) => `
          <li><strong>${p.name}</strong> (${p.path}) - Performance: ${renderScoreBadge(p.performanceScore)}</li>
        `,
          )
          .join('')}
      </ol>
    </div>

    <h2>📋 All Pages</h2>
    <table>
      <thead>
        <tr>
          <th>Page</th>
          <th>Path</th>
          <th style="text-align: center;">Performance</th>
          <th style="text-align: center;">Accessibility</th>
          <th style="text-align: center;">Best Practices</th>
          <th style="text-align: center;">SEO</th>
          <th>Reports</th>
        </tr>
      </thead>
      <tbody>
        ${summary.results
          .map(
            (r: any) => `
          <tr>
            <td><strong>${r.name}</strong></td>
            <td><code>${r.path}</code></td>
            <td style="text-align: center;">${renderScoreBadge(r.scores.performance)}</td>
            <td style="text-align: center;">${renderScoreBadge(r.scores.accessibility)}</td>
            <td style="text-align: center;">${renderScoreBadge(r.scores.bestPractices)}</td>
            <td style="text-align: center;">${renderScoreBadge(r.scores.seo)}</td>
            <td>
              <a href="${r.htmlReport}" target="_blank">HTML</a> | 
              <a href="${r.jsonReport}" target="_blank">JSON</a>
            </td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Main execution
 */
async function main() {
  console.log('🔦 AsyncAPI Lighthouse Audit');
  console.log('============================\n');

  // Clean and create reports directory
  await fs.emptyDir(REPORTS_DIR);
  await fs.ensureDir(path.join(REPORTS_DIR, 'html'));
  await fs.ensureDir(path.join(REPORTS_DIR, 'json'));

  // Load routes
  const routes = loadRoutes();
  console.log(`📋 Loaded ${routes.length} routes to audit\n`);

  // Check if server is running, start if not
  let serverProcess: any = null;
  const isServerRunning = await checkServer();

  if (!isServerRunning) {
    console.log('⚠️  Server not detected at', BASE_URL);
    serverProcess = await startServer();

    // Wait for server to be fully ready
    let retries = 10;
    while (retries > 0) {
      if (await checkServer()) {
        console.log('✅ Server is ready!\n');
        break;
      }
      retries--;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (retries === 0) {
      console.error('❌ Server failed to start');
      process.exit(1);
    }
  } else {
    console.log('✅ Server is already running\n');
  }

  // Launch Chrome
  console.log('🌐 Launching Chrome...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });

  try {
    // Run audits
    const results: LighthouseResult[] = [];

    for (const route of routes) {
      const result = await runLighthouseAudit(chrome, route);
      if (result) {
        results.push(result);
      }
      // Small delay between audits
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Generate summary
    await generateSummaryReport(results);

    console.log('\n✅ All audits complete!');
    console.log(`\n📁 Reports saved to: ${REPORTS_DIR}`);
    console.log(`   - HTML reports: ${path.join(REPORTS_DIR, 'html')}`);
    console.log(`   - JSON reports: ${path.join(REPORTS_DIR, 'json')}`);
    console.log(`   - Summary: ${path.join(REPORTS_DIR, 'summary.html')}`);
  } finally {
    // Cleanup
    await chrome.kill();
    if (serverProcess) {
      console.log('\n🛑 Stopping server...');
      serverProcess.kill();
    }
  }
}

// Run the audit
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
