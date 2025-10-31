// ===== APP.JS - AzizbekID Documentation Interactive Features =====

class DocsApp {
    constructor() {
        this.currentSection = 'getting-started';
        this.content = {};
        this.init();
    }

    init() {
        this.loadContent();
        this.renderSidebar();
        this.renderContent();
        this.attachEventListeners();
        this.restoreTheme();
        this.setupScrollSpy();
        setTimeout(() => Prism.highlightAll(), 100);
    }

    loadContent() {
        this.sidebarItems = [
            { id: 'getting-started', title: 'Getting Started' },
            { id: 'quick-example', title: 'Quick Example' },
            { id: 'api-reference', title: 'API Reference' },
            { id: 'guides', title: 'Guides' },
            { id: 'live-example', title: 'Live Example' },
            { id: 'migration', title: 'Migration' },
            { id: 'faq', title: 'FAQ' },
            { id: 'changelog', title: 'Changelog' },
            { id: 'contributing', title: 'Contributing' },
            { id: 'support', title: 'Support' }
        ];
        this.content = this.getContentMap();
    }

    codeBlock(code, language = 'javascript', label = 'code') {
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        
        return `
            <div class="code-block-wrapper">
                <div class="code-block-header">
                    <span class="code-block-label">${label}</span>
                    <button class="copy-btn" onclick="copyToClipboard(this, \`${escapedCode.replace(/`/g, '\\`')}\`)">
                        📋 Copy
                    </button>
                </div>
                <pre><code class="language-${language}">${escapedCode}</code></pre>
            </div>
        `;
    }

    getContentMap() {
        return {
            'getting-started': `
                <h1>Getting Started</h1>
                <p>Install the AzizbekID SDK via CDN or as an ES module. Fast, lightweight, and secure authentication in seconds.</p>

                <h2>Installation</h2>

                <h3>Via CDN (UMD)</h3>
                <p>The simplest way to get started. Add this script tag to your HTML:</p>
                ${this.codeBlock(
                    `<script src="https://cdn.jsdelivr.net/npm/azizbekid@latest/dist/azizbekid.umd.js"><\/script>
<script>
  // Use the SDK directly (clean default export)
  AzizbekID.AzizbekID.init({
    backendUrl: 'https://auth.example.com',
    appOrigin: window.location.origin,
    appName: 'My App'
  });
<\/script>`,
                    'html',
                    'cdn-setup.html'
                )}

                <h3>Via Package Manager (ESM)</h3>
                <p>For bundled projects, install from npm:</p>
                ${this.codeBlock(
                    `npm install azizbekid`,
                    'bash',
                    'install.sh'
                )}

                <p>Then import and initialize:</p>
                ${this.codeBlock(
                    `import AzizbekID from 'azizbekid';

AzizbekID.AzizbekID.init({
    backendUrl: 'https://auth.example.com',
    appOrigin: window.location.origin,
    appName: 'My App'
});`,
                    'javascript',
                    'esm-import.js'
                )}

                <h2>Checking the Global</h2>
                <p>After loading, verify the SDK is available:</p>
                ${this.codeBlock(
                    `console.log(window.AzizbekID);
// Output: { init: [Function], signIn: [Function], ...}`,
                    'javascript',
                    'check-global.js'
                )}

                <div class="info-box">
                    <p><strong>Note on UMD wrapping:</strong> If you see <code>window.AzizbekID.AzizbekID</code>, check the Guides section for details on default vs named exports.</p>
                </div>

                <h2>Quick Troubleshooting</h2>
                <ul>
                    <li><strong>"init is not a function"</strong> → Ensure the script loads before calling init(). Use async/defer attributes.</li>
                    <li><strong>CORS errors</strong> → Verify backendUrl and appOrigin match your auth server configuration.</li>
                    <li><strong>Popup blocked</strong> → Some browsers block popups by default. See the FAQ section.</li>
                </ul>
            `,

            'quick-example': `
                <h1>Quick Example</h1>
                <p>Get a working sign-in flow up and running in under 2 minutes.</p>

                <h2>Full Login Flow</h2>
                <p>Here's a complete, copy-paste example:</p>
                ${this.codeBlock(
                    `<!-- HTML -->
<button id="loginBtn">Sign In with AzizbekID</button>
<pre id="result"><\/pre>

<script src="https://cdn.jsdelivr.net/npm/azizbekid@latest/dist/azizbekid.umd.js"><\/script>
<script>
  // Initialize SDK
  AzizbekID.AzizbekID.init({
    backendUrl: 'https://auth.example.com',
    appOrigin: window.location.origin
  });

  // Handle login
  document.getElementById('loginBtn').addEventListener('click', async () => {
    try {
      const user = await AzizbekID.AzizbekID.AzizbekID.signIn();
      document.getElementById('result').textContent = 
        'Logged in: ' + JSON.stringify(user, null, 2);
    } catch (err) {
      document.getElementById('result').textContent = 
        'Error: ' + err.message;
    }
  });
<\/script>`,
                    'html',
                    'full-example.html'
                )}

                <h2>What's Happening</h2>
                <ul>
                    <li><strong>init()</strong> → Registers configuration on the SDK and prepares for auth requests.</li>
                    <li><strong>signIn()</strong> → Opens a popup window, initiates OAuth flow with your backend, and returns a User object.</li>
                    <li><strong>postMessage</strong> → Secure communication between popup and parent via origin validation.</li>
                </ul>

                <div class="success-box">
                    <p>After successful sign-in, you receive a User object with id, name, email, and optional token fields.</p>
                </div>
            `,

            'api-reference': `
                <h1>API Reference</h1>
                <p>Complete reference for AzizbekID SDK methods and types.</p>

                <h2>init(config)</h2>
                <p>Initialize the SDK with your app configuration. Must be called once before signIn().</p>

                <h3>Parameters</h3>
                ${this.codeBlock(
                    `interface InitConfig {
  backendUrl: string;      // URL of your auth backend
  appOrigin: string;       // Your app's origin (usually window.location.origin)
  appName?: string;        // Optional friendly name for logging
}`,
                    'typescript',
                    'init-config.ts'
                )}

                <h3>Returns</h3>
                <p><code>void</code></p>

                <h3>Throws</h3>
                <p>Throws an error if required parameters are missing.</p>

                <h3>Example</h3>
                ${this.codeBlock(
                    `try {
  AzizbekID.AzizbekID.init({
    backendUrl: 'https://auth.example.com',
    appOrigin: 'https://myapp.com'
  });
} catch (e) {
  console.error('Init failed:', e.message);
}`,
                    'javascript',
                    'init-example.js'
                )}

                <h2>signIn()</h2>
                <p>Trigger the OAuth sign-in flow. Opens a popup and waits for user authentication.</p>

                <h3>Parameters</h3>
                <p>None</p>

                <h3>Returns</h3>
                ${this.codeBlock(
                    `Promise<User>

interface User {
  id: string;           // Unique user ID
  name: string;         // User's full name
  email: string;        // User's email address
  token?: string;       // Optional JWT token
}`,
                    'typescript',
                    'user-type.ts'
                )}

                <h3>Throws</h3>
                <p>Rejects if popup is blocked, origin validation fails, or auth is cancelled.</p>

                <h3>Example</h3>
                ${this.codeBlock(
                    `const user = await AzizbekID.AzizbekID.signIn();
console.log('Welcome, ' + user.name);`,
                    'javascript',
                    'signin-example.js'
                )}

                <h2>Implementation Details</h2>
                <ul>
                    <li>Uses <code>window.open()</code> to spawn a popup at your backend's auth URL.</li>
                    <li>Validates all postMessage events by origin to prevent XSS.</li>
                    <li>Communicates result via <code>window.postMessage</code> with event name <code>azizbekid:auth</code>.</li>
                    <li>Returns after user closes popup or auth completes.</li>
                </ul>

                <div class="warning-box">
                    <p><strong>Important:</strong> Popup blockers may prevent signIn() from succeeding. Recommend calling signIn() directly from a user gesture (click event).</p>
                </div>
            `,

            'guides': `
                <h1>Guides</h1>
                <p>Detailed guides for advanced scenarios and best practices.</p>

                <h2>Vite Build Configuration</h2>
                <p>To bundle AzizbekID as a UMD library with proper default export, use this Vite config:</p>
                ${this.codeBlock(
                    `import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'AzizbekID',
      formats: ['umd', 'es'],
      fileName: (format) => format === 'es' 
                ? 'azizbekid.js' 
                : 'azizbekid.umd.js'
    },
    rollupOptions: {
      output: {
        exports: 'default'
      }
    }
  }
});`,
                    'javascript',
                    'vite.config.js'
                )}

                <h2>UMD vs ESM Export Strategies</h2>

                <h3>Default Export (Recommended)</h3>
                <p>Export SDK as default to avoid double-wrapping:</p>
                ${this.codeBlock(
                    `// src/index.js
export default {
  init: (config) => { ... },
  signIn: async () => { ... }
};`,
                    'javascript',
                    'default-export.js'
                )}

                <p>Result: <code>window.AzizbekID</code> (clean)</p>

                <h3>Named Export (Legacy)</h3>
                <p>If forced to use named exports, update consumers:</p>
                ${this.codeBlock(
                    `// Accessing it correctly
const SDK = window.AzizbekID?.AzizbekID || window.AzizbekID;
SDK.init({ ... });`,
                    'javascript',
                    'named-export-access.js'
                )}

                <h2>Testing Locally</h2>
                <p>When testing on localhost, use exact origin matching:</p>
                ${this.codeBlock(
                    `AzizbekID.AzizbekID.init({
  backendUrl: 'http://localhost:3000',
  appOrigin: 'http://localhost:5173'  // Vite dev server
});`,
                    'javascript',
                    'local-testing.js'
                )}

                <div class="info-box">
                    <p><strong>Tip:</strong> Localhost origins are matched exactly. <code>http</code> and <code>https</code> are treated as different.</p>
                </div>

                <h2>CI/CD Testing with Puppeteer</h2>
                <p>Automate sign-in flow testing in headless browsers:</p>
                ${this.codeBlock(
                    `const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173');

await page.evaluate(() => {
  return AzizbekID.AzizbekID.init({
    backendUrl: 'http://localhost:3000',
    appOrigin: 'http://localhost:5173'
  });
});

const popup = await new Promise(resolve => {
  page.on('popup', resolve);
});

const user = await page.evaluate(() => AzizbekID.AzizbekID.signIn());
console.log('Test passed:', user);`,
                    'javascript',
                    'puppeteer-test.js'
                )}
            `,

            'live-example': `
                <h1>Live Example</h1>
                <p>Test the SDK directly in your browser. The example below loads a mock SDK if the real one is unavailable.</p>

                <div class="live-example-container">
                    <div class="live-example-controls">
                        <button class="live-example-btn" onclick="document.getElementById('liveFrame').contentWindow.location.reload()">
                            ↻ Reload
                        </button>
                        <button class="live-example-btn" onclick="window.open('examples/live-example.html', '_blank')">
                            ⬈ Open in New Tab
                        </button>
                    </div>
                    <iframe id="liveFrame" class="live-example-frame" src="examples/live-example.html"></iframe>
                </div>

                <h2>What You're Testing</h2>
                <ul>
                    <li>SDK initialization with mock backend</li>
                    <li>Sign-in button triggering OAuth flow</li>
                    <li>Popup-to-parent communication via postMessage</li>
                    <li>User data display on success</li>
                </ul>

                <div class="info-box">
                    <p>The live example uses a mock SDK fallback for demonstration. In production, replace with your real backend URL.</p>
                </div>
            `,

            'migration': `
                <h1>Migration Guide</h1>
                <p>Upgrading from older versions? Here's how to migrate from named exports to default exports.</p>

                <h2>Before: Named Export (Old)</h2>
                ${this.codeBlock(
                    `// Old SDK export style
export const AzizbekID = {
  init: (config) => { ... },
  signIn: async () => { ... }
};`,
                    'javascript',
                    'old-export.js'
                )}

                <p>Usage: <code>window.AzizbekID.AzizbekID.AzizbekID.init()</code></p>

                <h2>After: Default Export (New)</h2>
                ${this.codeBlock(
                    `// New SDK export style (recommended)
export default {
  init: (config) => { ... },
  signIn: async () => { ... }
};`,
                    'javascript',
                    'new-export.js'
                )}

                <p>Usage: <code>window.AzizbekID.AzizbekID.init()</code></p>

                <h2>Migration Steps</h2>
                <ol>
                    <li>Update your bundler config to set <code>exports: 'default'</code>.</li>
                    <li>If you have a wrapper layer, update all references: <code>const SDK = window.AzizbekID.AzizbekID</code> → <code>const SDK = window.AzizbekID</code></li>
                    <li>Test thoroughly across all browser environments.</li>
                    <li>Roll out gradually (feature flag recommended).</li>
                </ol>

                <h2>Temporary Compatibility</h2>
                <p>If you need to support both old and new, use a safe fallback:</p>
                ${this.codeBlock(
                    `const SDK = window.AzizbekID?.AzizbekID || window.AzizbekID;
if (!SDK) throw new Error('AzizbekID SDK not loaded');
SDK.init({ ... });`,
                    'javascript',
                    'compat-fallback.js'
                )}

                <div class="success-box">
                    <p>All v0.3.0+ releases use default exports. Support for named exports ends at v0.2.x.</p>
                </div>
            `,

            'faq': `
                <h1>Frequently Asked Questions</h1>

                <h2>Q: "init is not a function" — what's wrong?</h2>
                <p><strong>A:</strong> This usually means the SDK hasn't loaded yet. Check that:</p>
                <ul>
                    <li>The script tag is present and loads successfully (check Network tab).</li>
                    <li>You're not calling init() before the script finishes loading.</li>
                    <li>Use <code>&lt;script defer&gt;</code> or <code>&lt;script async&gt;</code> to ensure proper execution order.</li>
                </ul>

                <h2>Q: Why does the SDK use a popup instead of redirect?</h2>
                <p><strong>A:</strong> Popups keep users on your app during auth, improving UX and reducing friction. Redirects interrupt the flow and require complex state management. Popups are the OAuth standard for SPAs.</p>

                <h2>Q: My popup is being blocked. How do I fix it?</h2>
                <p><strong>A:</strong> Most browsers block popups that aren't triggered by a direct user gesture (click/tap). Ensure you call <code>AzizbekID.AzizbekID.signIn()</code> from a click handler, not from page load or async code.</p>

                <h2>Q: How do I test locally with localhost origins?</h2>
                <p><strong>A:</strong> Exact match your dev URLs:</p>
                ${this.codeBlock(
                    `AzizbekID.AzizbekID.init({
  backendUrl: 'http://localhost:3000',
  appOrigin: 'http://localhost:5173'
});`,
                    'javascript',
                    'localhost-test.js'
                )}

                <h2>Q: What if I need to call signIn() multiple times?</h2>
                <p><strong>A:</strong> You can call signIn() as many times as needed. Each call opens a fresh popup and auth flow.</p>

                <h2>Q: How do I handle token expiration?</h2>
                <p><strong>A:</strong> The returned User object may include a token with expiry. Implement your own refresh logic by listening to token expiry and calling signIn() again when needed, or use a token refresh endpoint on your backend.</p>

                <h2>Q: Can I use AzizbekID in React/Vue/Angular?</h2>
                <p><strong>A:</strong> Absolutely! The SDK is framework-agnostic. Call it from event handlers or hooks—no special integration needed.</p>
            `,

            'changelog': `
                <h1>Changelog</h1>
                <p>Version history and release notes.</p>

                <h2>v0.3.0 — 2025-10-31</h2>
                <ul>
                    <li><strong>Added:</strong> Live example iframe with mock SDK fallback</li>
                    <li><strong>Added:</strong> Complete API documentation</li>
                    <li><strong>Fixed:</strong> UMD export handling in Vite builds</li>
                    <li><strong>Improved:</strong> Error messages for missing configuration</li>
                </ul>

                <h2>v0.2.0 — 2025-09-20</h2>
                <ul>
                    <li><strong>Added:</strong> signIn() method with popup flow</li>
                    <li><strong>Added:</strong> postMessage origin validation</li>
                    <li><strong>Added:</strong> User object return type</li>
                </ul>

                <h2>v0.1.0 — 2025-08-01</h2>
                <ul>
                    <li><strong>Added:</strong> Initial init() configuration</li>
                    <li><strong>Added:</strong> Alpha SDK release</li>
                </ul>
            `,

            'contributing': `
                <h1>Contributing</h1>
                <p>We welcome contributions to the AzizbekID SDK! Follow these guidelines to get started.</p>

                <h2>Getting Started</h2>
                <ul>
                    <li>Fork the repository on GitHub</li>
                    <li>Clone your fork locally</li>
                    <li>Create a new branch: <code>git checkout -b feature/your-feature</code></li>
                    <li>Install dependencies: <code>npm install</code></li>
                </ul>

                <h2>Development</h2>
                <ul>
                    <li><strong>Code style:</strong> We use Prettier and ESLint. Run <code>npm run lint</code> before committing.</li>
                    <li><strong>Tests:</strong> Write tests for new features. Run <code>npm test</code> to verify.</li>
                    <li><strong>Commits:</strong> Use conventional commits: <code>feat:</code>, <code>fix:</code>, <code>docs:</code>, etc.</li>
                </ul>

                <h2>Pull Requests</h2>
                <ol>
                    <li>Push to your fork</li>
                    <li>Open a PR against the main repository</li>
                    <li>Describe your changes clearly</li>
                    <li>Link any related issues</li>
                    <li>Wait for review and address feedback</li>
                </ol>

                <h2>License & Code of Conduct</h2>
                <p>By contributing, you agree that your code will be licensed under the MIT License. Please also read and follow our Code of Conduct.</p>

                ${this.codeBlock(
                    `MIT License

Copyright (c) 2025 AzizbekID Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy...`,
                    'text',
                    'LICENSE'
                )}
            `,

            'support': `
                <h1>Support</h1>
                <p>Need help? We're here to assist you.</p>

                <h2>Contact</h2>
                <p><strong>Email:</strong> <a href="mailto:support@azizbekid.dev">support@azizbekid.dev</a></p>
                <p><strong>GitHub Issues:</strong> <a href="https://github.com/azizbekid/sdk/issues" target="_blank">Report bugs or request features</a></p>

                <h2>Common Issues & Solutions</h2>

                <h3>Issue: "Failed to initialize SDK"</h3>
                <ul>
                    <li>Verify backendUrl is correct and accessible</li>
                    <li>Check that appOrigin matches your app's actual origin</li>
                    <li>Ensure no network errors in browser console</li>
                </ul>

                <h3>Issue: "Origin mismatch"</h3>
                <ul>
                    <li>Popup and parent must have same origin for postMessage</li>
                    <li>Use exact URLs: <code>http://localhost:5173</code> ≠ <code>http://127.0.0.1:5173</code></li>
                </ul>

                <h3>Issue: "User data not received"</h3>
                <ul>
                    <li>Check browser console for errors</li>
                    <li>Verify popup wasn't blocked</li>
                    <li>Ensure backend properly sends user data in postMessage</li>
                </ul>

                <h2>Best Practices for Bug Reports</h2>
                <ul>
                    <li>Include SDK version: <code>console.log(AzizbekID.version)</code></li>
                    <li>Provide browser and OS information</li>
                    <li>Share relevant console logs and errors</li>
                    <li>Include minimal code reproduction</li>
                    <li>Describe expected vs actual behavior</li>
                </ul>

                <div class="info-box">
                    <p>Response time is typically 24-48 hours during business days. For urgent issues, please mark your email as URGENT in the subject line.</p>
                </div>
            `
        };
    }

    renderSidebar() {
        const nav = document.getElementById('sidebarNav');
        nav.innerHTML = this.sidebarItems
            .map(item => `
                <a 
                    href="#${item.id}" 
                    class="nav-item ${item.id === this.currentSection ? 'active' : ''}" 
                    onclick="app.navigateTo('${item.id}'); return false;"
                >
                    ${item.title}
                </a>
            `)
            .join('');
    }

    renderContent() {
        const inner = document.getElementById('contentInner');
        inner.innerHTML = this.content[this.currentSection] || '<h1>Page not found</h1>';
        setTimeout(() => Prism.highlightAll(), 50);
    }

    navigateTo(sectionId) {
        this.currentSection = sectionId;
        window.history.pushState(null, '', `#${sectionId}`);
        this.renderSidebar();
        this.renderContent();
        document.getElementById('contentInner').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    attachEventListeners() {
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (this.sidebarItems.find(item => item.id === hash)) {
                this.currentSection = hash;
                this.renderSidebar();
                this.renderContent();
            }
        });

        const hash = window.location.hash.slice(1);
        if (hash && this.sidebarItems.find(item => item.id === hash)) {
            this.currentSection = hash;
        }
    }

    toggleTheme() {
        document.body.classList.toggle('alt-theme');
        const isDark = document.body.classList.contains('alt-theme');
        localStorage.setItem('theme-pref', isDark ? 'dark' : 'light');
        this.updateThemeIcon();
    }

    restoreTheme() {
        const saved = localStorage.getItem('theme-pref');
        if (saved === 'dark') {
            document.body.classList.add('alt-theme');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const isDark = document.body.classList.contains('alt-theme');
        document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
    }

    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            const sections = this.sidebarItems.map(item => item.id);
            let current = sections[0];

            for (const section of sections) {
                const element = document.querySelector(`#${section}`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top < 200) {
                        current = section;
                    }
                }
            }

            if (current !== this.currentSection) {
                this.currentSection = current;
                this.renderSidebar();
            }
        });
    }
}

// ===== GLOBAL FUNCTIONS =====

function copyToClipboard(button, text) {
    const decoded = text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

    navigator.clipboard.writeText(decoded).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);

        showToast('Code copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy. Try manually selecting the code.');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== INITIALIZE APP ON LOAD =====

document.addEventListener('DOMContentLoaded', () => {
    window.app = new DocsApp();
});