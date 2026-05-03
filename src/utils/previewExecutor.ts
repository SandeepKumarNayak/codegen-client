import { sanitizeCode } from './codeSanitizer'
import type { PreviewResult, StylingOption } from '@/types'

const CONSOLE_BRIDGE = `<script>
(function(){
  function post(l,a){window.parent.postMessage({type:'console',level:l,message:Array.from(a).map(x=>{try{return typeof x==='object'?JSON.stringify(x):String(x)}catch{return String(x)}}).join(' ')},'*')}
  ['log','warn','error','info'].forEach(m=>{const o=console[m].bind(console);console[m]=(...a)=>{o(...a);post(m,a)}});
  window.onerror=(m,_,__,___,e)=>{post('error',[e?e.message:m]);return false};
  window.addEventListener('unhandledrejection',e=>post('error',[e.reason?.message??String(e.reason)]));
})();
</script>`

export function buildPreviewDocument(code: string, language: string, styling?: StylingOption): string {
    const safe = sanitizeCode(code)
    const isReact = language === 'react' || language === 'jsx' || language === 'tsx'

    // Styling CDNs
    const tailwindCDN = styling === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''
    const bootstrapCDN = styling === 'bootstrap' ? `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    ` : ''

    // Base headers and bridge
    const header = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${tailwindCDN}
        ${styling === 'tailwind' ? '<script>tailwind.config = { theme: { extend: {} } }</script>' : ''}
        ${bootstrapCDN}
        ${CONSOLE_BRIDGE}
        <script type="importmap">
        {
            "imports": {
                "react": "https://esm.sh/react@18.2.0",
                "react-dom": "https://esm.sh/react-dom@18.2.0",
                "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
                "lucide-react": "https://esm.sh/lucide-react@0.263.1",
                "framer-motion": "https://esm.sh/framer-motion@10.16.4"
            }
        }
        </script>
        <style>
            * { box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
                margin: 0; 
                padding: 0; 
                min-height: 100vh; 
                background-color: #ffffff;
            }
            #root { min-height: 100vh; }
            ${styling === 'tailwind' ? '' : '.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }'}
        </style>
    `

    if (language === 'html') {
        return `<!DOCTYPE html><html><head>${header}</head><body>${safe}</body></html>`
    }

    if (isReact) {
        // Rewrite export default to a known variable so we can mount it
        let modifiedCode = safe;
        modifiedCode = modifiedCode.replace(/export\s+default\s+(function|class)(?=\s|\()/g, 'const __DefaultExport__ = $1');
        modifiedCode = modifiedCode.replace(/export\s+default\s+/g, 'const __DefaultExport__ = ');

        // Ensure imports are at the top and mounting logic is at the bottom
        return [
            '<!DOCTYPE html><html><head>',
            header,
            '</head><body><div id="root"><div style="display:flex;justify-content:center;align-items:center;height:100vh;color:#666;font-family:sans-serif;">Loading Preview...</div></div>',
            '<script type="text/plain" id="raw-code">',
            'import _React from "react";',
            'import _ReactDOM from "react-dom/client";',
            '\n/** --- AI GENERATED CODE --- **/\n',
            modifiedCode.replace(/<\/script>/gi, '<\\/script>'),
            '\n/** --- MOUNTING LOGIC --- **/\n',
            'setTimeout(() => {',
            '  try {',
            '    const rootElement = document.getElementById("root");',
            '    if (!rootElement) return;',
            '    ',
            '    let Component = null;',
            '    if (typeof __DefaultExport__ !== "undefined") Component = __DefaultExport__;',
            '    else if (typeof App !== "undefined") Component = App;',
            '    else if (typeof DefaultExport !== "undefined") Component = DefaultExport;',
            '    else if (typeof AppDefault !== "undefined") Component = AppDefault;',
            '    else {',
            '      const possible = Object.keys(typeof window !== "undefined" ? window : {}).filter(k => /^[A-Z]/.test(k) && typeof window[k] === "function" && k !== "React" && k !== "ReactDOM");',
            '      if (possible.length > 0) Component = window[possible[0]];',
            '    }',
            '    ',
            '    if (Component) {',
            '      const root = _ReactDOM.createRoot(rootElement);',
            '      root.render(_React.createElement(Component));',
            '    } else {',
            '      rootElement.innerHTML = "<div style=\'padding:20px;color:#cc0000;font-family:sans-serif;\'><h3>Mounting Error</h3><p>Could not find a component to mount. Ensure your main component has an export default.</p></div>";',
            '    }',
            '  } catch (err) { ',
            '    console.error("Mounting Error:", err); ',
            '    document.getElementById("root").innerHTML = "<pre style=\'color:red;padding:20px;\'>" + String(err) + "</pre>";',
            '  }',
            '}, 0);',
            '</script>',
            '<script>',
            '  function transpileAndMount() {',
            '    if (!window.Babel) {',
            '      document.getElementById("root").innerHTML = "<div style=\'color:red;padding:20px;\'>Failed to load Babel compiler from CDN.</div>";',
            '      return;',
            '    }',
            '    try {',
            '      const rawCode = document.getElementById("raw-code").textContent;',
            '      const transpiled = window.Babel.transform(rawCode, { filename: "preview.tsx", presets: ["typescript", "react"] }).code;',
            '      const script = document.createElement("script");',
            '      script.type = "module";',
            '      script.textContent = transpiled;',
            '      document.body.appendChild(script);',
            '    } catch (err) {',
            '      console.error("Babel transpilation error:", err);',
            '      console.log("babel err:"+err)',
            '      document.getElementById("root").innerHTML = "<pre style=\'color:green;padding:20px;\'>" + String(err) + "</pre>";',
            '    }',
            '  }',
            '</script>',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.3/babel.min.js" onload="transpileAndMount()"></script>',
            '</body></html>'
        ].join('\n')
    }

    return `<!DOCTYPE html><html><head>${header}</head><body><div id="root"></div><script type="module">${safe}</script></body></html>`
}

export function executeCode(code: string, language: string, styling?: StylingOption): PreviewResult {
    try {
        const doc = buildPreviewDocument(code, language, styling)
        const blob = new Blob([doc], { type: 'text/html' })
        return { blobUrl: URL.createObjectURL(blob), error: null }
    } catch (e) {
        return { blobUrl: null, error: (e as Error).message }
    }
}
