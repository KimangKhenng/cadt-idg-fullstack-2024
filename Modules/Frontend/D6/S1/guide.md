# D6 S1: Web Performance, Netlify Route, Env & Plugins

Watch recorded video:https://youtu.be/zNsjAwnaasY

There are tools to test web performance like Lighthouse and PageSpeed Insights, along with other relevant tools.

## 1. Lighthouse

[Lighthouse](https://developers.google.com/web/tools/lighthouse) is an open-source, automated tool for improving the quality of web pages. It audits web pages for performance, accessibility, SEO, and more. Here's how you can use it:

- **Performance**: Measures aspects like first contentful paint, time to interactive, and more. These metrics gauge how quickly your page loads and becomes interactive.
- **Accessibility**: Checks for accessibility issues like color contrast, semantic HTML usage, and keyboard navigation support.
- **Best Practices**: Evaluates adherence to web development best practices like using HTTPS, avoiding deprecated APIs, etc.
- **SEO**: Assesses the page's SEO-friendliness, including meta tags, structured data, and mobile-friendliness.

To run Lighthouse:

1. Open Google Chrome.
2. Go to the webpage you want to test.
3. Right-click, then select "Inspect" to open Chrome DevTools.
4. Click on the "Audits" tab.
5. Choose the desired options (e.g., Performance, Accessibility, SEO).
6. Click "Run audits" to generate the report.

## 2. PageSpeed Insights

[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) is another tool by Google that analyzes the content of a web page and generates suggestions to make that page faster. It provides both lab and field data, indicating how well a page performs for real users.

- **Lab Data**: Simulated testing in a controlled environment, providing insights into potential improvements.
- **Field Data**: Real-world performance metrics based on actual user experiences.

To use PageSpeed Insights:

1. Visit the PageSpeed Insights website.
2. Enter the URL of the webpage you want to test.
3. Click "Analyze" to generate the report.
4. Review the suggestions provided, categorized by opportunities, diagnostics, and passed audits.

## Other Relevant Tools

- **WebPageTest**: Offers detailed performance testing, including multi-step transactions, content blocking, and more.
- **GTmetrix**: Analyzes page performance, provides actionable insights, and offers historical data tracking.
- **Pingdom**: Tests website performance and uptime, provides performance grades, and identifies bottlenecks.
- **SpeedCurve**: Monitors performance over time, benchmarks against competitors, and offers advanced performance analytics.

## Fix `Page Not Found` on Netlify
Go to your projedt root and create `netlify.toml` if it is not already there. Add the following content to redirect.
```
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Add more configuration in Netlify
Netlify allows you to optimize your site using the `netlify.toml` configuration file. This file is used to define various settings and plugins that enhance the performance and capabilities of your site.
```
[build]
  publish = "dist/"
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-sitemap"

[[plugins]]
  package = "@netlify/plugin-lighthouse"

[build.environment]
  NODE_VERSION = "18.20.2"

[build.processing]
  skip_processing = false

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self'; style-src 'self';"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```