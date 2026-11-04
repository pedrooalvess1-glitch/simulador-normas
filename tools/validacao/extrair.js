/* Extrai, sem navegador, os dados de uma IIFE do protótipo até o fim de `const ST=[...]`.
   Uso: node extrair.js <arquivo.js>  → imprime JSON {ST, HS, OS} (funções viram {__fn: código}). */
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');

function fimDoArray(s, i) {             // i aponta para '['; devolve o índice do ']' correspondente
  let prof = 0, modo = [];               // modo: pilha de contextos de string/template
  for (; i < s.length; i++) {
    const c = s[i], topo = modo[modo.length - 1];
    if (topo === "'" || topo === '"') { if (c === '\\') i++; else if (c === topo) modo.pop(); continue; }
    if (topo === '`') { if (c === '\\') i++; else if (c === '`') modo.pop(); else if (c === '$' && s[i + 1] === '{') { modo.push('{'); i++; } continue; }
    if (c === "'" || c === '"' || c === '`') { modo.push(c); continue; }
    if (c === '/' && s[i + 1] === '*') { i = s.indexOf('*/', i + 2) + 1; continue; }
    if (c === '{' ) { if (topo === '{' || topo === '{{') modo.push('{{'); continue; }
    if (c === '}') { if (topo === '{{') modo.pop(); else if (topo === '{') modo.pop(); continue; }
    if (c === '[') prof++;
    if (c === ']' && --prof === 0) return i;
  }
  throw new Error('array sem fim');
}
const ini = src.indexOf('const ST=[');
const corpoIni = src.indexOf('{', src.indexOf('=>')) + 1;   // início do corpo da IIFE
const fim = fimDoArray(src, src.indexOf('[', ini)) + 1;
const codigo = src.slice(corpoIni, fim) + ';';

const stub = new Proxy(function () { return ''; }, {
  get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'toString' || k === 'valueOf' ? () => '' : stub),
  apply: () => '' });
const sandbox = new Proxy({}, {
  has: (t, k) => !(k in globalThis),
  get: (t, k) => (k === Symbol.unscopables ? undefined : k in t ? t[k] : stub),
  set: (t, k, v) => { t[k] = v; return true; } });
const fn = new Function('sb', 'with (sb) {' + codigo +
  ' return {ST: typeof ST !== "undefined" ? ST : null, HS: typeof HS !== "undefined" ? HS : null, OS: typeof OS !== "undefined" ? OS : null}; }');
const out = fn(sandbox);
process.stdout.write(JSON.stringify(out, (k, v) => (typeof v === 'function' ? { __fn: v.toString() } : v)));
