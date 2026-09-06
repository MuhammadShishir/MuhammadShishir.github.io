const fs = require('fs');
const path = require('path');

function compileHTML() {
  const srcPath = path.join(__dirname, 'index.html');
  const distPath = path.join(__dirname, 'dist', 'index.html');

  if (!fs.existsSync(srcPath)) return;

  let html = fs.readFileSync(srcPath, 'utf8');

  // Replaces <!-- include components/filename.html --> directives
  html = html.replace(/<!--\s*include\s+([^\s]+)\s*-->/g, (match, componentPath) => {
    const fullComponentPath = path.join(__dirname, componentPath);
    if (fs.existsSync(fullComponentPath)) {
      return fs.readFileSync(fullComponentPath, 'utf8');
    }
    console.warn(`[Warning] Component not found: ${componentPath}`);
    return match;
  });

  fs.mkdirSync(path.dirname(distPath), { recursive: true });
  fs.writeFileSync(distPath, html);
  console.log(`[${new Date().toLocaleTimeString()}] Compiled HTML to ./dist/index.html`);
}

compileHTML();

// Watch root index.html and components folder
fs.watch(__dirname, { recursive: true }, (eventType, filename) => {
  if (filename && (filename === 'index.html' || filename.startsWith('components'))) {
    compileHTML();
  }
});