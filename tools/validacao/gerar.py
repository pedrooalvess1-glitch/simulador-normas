#!/usr/bin/env python3
"""Gera docs/VALIDACAO_DO_CONTEUDO.md: o registro de tudo o que o software pergunta e responde,
para o usuário conferir e validar.

Fontes:
  - prototipo/dist/simulador-nr10-offline.html, aberto num Chromium headless (Playwright):
    banco de questões (QB), base REF, cartões e amostras do gerador do Treino;
  - prototipo/historia.js e prototipo/missao.js, lidos por tools/validacao/extrair.js (Node):
    passos interativos (achar objeto, caça a não conformidades, sequências, marcar e ordenar)
    e os 27 objetos da cena da História;
  - os documentos de docs/: trechos rotulados [INTERPRETAÇÃO].
Situação de cada entrada: tools/validacao/status.json ({"V-xxxxxx": {"situacao": "...", "nota": "..."}}).
Cada ID é um hash do conteúdo: se o texto mudar, o ID muda e a entrada volta a "a validar".

Uso (na raiz do repositório): python3 tools/validacao/gerar.py
Precisa de Node e do Playwright para Python com Chromium.
"""
import hashlib, html, json, pathlib, re, subprocess

RAIZ = pathlib.Path(__file__).resolve().parents[2]
HTML = RAIZ / 'prototipo/dist/simulador-nr10-offline.html'
SAIDA = RAIZ / 'docs/VALIDACAO_DO_CONTEUDO.md'
STATUS = json.loads((RAIZ / 'tools/validacao/status.json').read_text(encoding='utf-8'))
AMOSTRAS_POR_GERADOR = 4

ALERTAS = [  # (rótulo, regex) — heurística para priorizar a revisão; não substitui a leitura
    ('mecanismo físico', r'curto|backfeed|eleva a tens|realimenta|induz|residual|forma arco|arco nos contatos|'
                         r'abertura sob carga|descarregad|capacitor|corrente de carga|mecanismo'),
    ('prática de campo', r'\[PRÁTICA\]|vermelh|\bverde\b|\bLED\b|grampos? primeiro|primeiro as fases|'
                         r'por último a barra|fase a fase|só quem colocou'),
    ('outra norma ou concessionária', r'NR-35|NR-18|NR-12|NBR|ASTM|\bIEC\b|30 ?mA|Inmetro|concessionária|ANEEL'),
    ('interpretação rotulada', r'\[INTERPRETAÇÃO\]|\[INFERÊNCIA\]'),
]


def limpo(t):
    t = re.sub(r'<br\s*/?>', ' ', str(t or ''))
    t = re.sub(r'<[^>]+>', '', t)
    return re.sub(r'\s+', ' ', html.unescape(t)).strip()


def ident(*partes):
    return 'V-' + hashlib.sha1(json.dumps(partes, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:6]


# ---------------------------------------------------------------- coleta no navegador
SEMENTE = """(()=>{let s=20261213;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);
t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};})();"""


def coletar_navegador():
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        nav = p.chromium.launch()
        pag = nav.new_page()
        pag.route(re.compile(r'https?://(fonts\.googleapis|fonts\.gstatic|cdnjs)\..*'), lambda r: r.abort())
        pag.add_init_script(SEMENTE)
        pag.goto(HTML.as_uri())
        pag.wait_for_function('typeof QB!=="undefined" && QB.list.length>0 && window.__treino')
        dados = pag.evaluate("""n => {
          const nomes = {}; (window.MODS || (typeof MODS!=='undefined' ? MODS : [])).forEach(m => nomes[m.id] = m.name);
          const gen = {}; const T = window.__treino;
          Object.keys(T.GEN).forEach(k => { const vistos = {}; const lista = [];
            for (let i = 0; i < 400 && lista.length < n; i++) { const q = T.GEN[k].f();
              if (!vistos[q.q]) { vistos[q.q] = 1; lista.push({q: q.q, o: q.o, a: q.a, x: q.x, r: q.r}); } }
            gen[k] = {nome: T.GEN[k].n, amostras: lista}; });
          return {qb: QB.list.map(q => ({id: q.id, mod: q.mod, q: q.q, o: q.o, a: q.a, x: q.x, r: q.r || []})),
                  ref: Object.keys(REF), nomes, gen, fc: T.FC};
        }""", AMOSTRAS_POR_GERADOR)
        nav.close()
    return dados


def extrair_st(arquivo):
    out = subprocess.run(['node', str(RAIZ / 'tools/validacao/extrair.js'), str(RAIZ / 'prototipo' / arquivo)],
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


# ---------------------------------------------------------------- entradas
class Registro:
    def __init__(self, ref):
        self.ref = set(ref)
        self.secoes = []

    def secao(self, titulo, intro):
        self.secoes.append({'titulo': titulo, 'intro': intro, 'itens': []})

    def entrada(self, titulo, linhas, refs, chave, rastreio=True):
        # os alertas olham só o que o simulador afirma: alternativas erradas (✘ ou sem ✔) ficam de fora
        afirma = [l for l in linhas if not re.match(r'\s+- (?!\*\*✔)', l)]
        texto = ' '.join(afirma)
        alertas = [rot for rot, rx in ALERTAS if re.search(rx, texto, re.I)]
        refs = [r for r in (refs or []) if r]
        if rastreio and not refs:
            alertas.append('sem item citado')
        faltam = [r for r in refs if r not in self.ref] if rastreio else []
        if faltam:
            alertas.append('item fora da base: ' + ', '.join(faltam))
        i = ident(chave, linhas, refs)
        st = STATUS.get(i, {})
        self.secoes[-1]['itens'].append({'id': i, 'titulo': titulo, 'linhas': linhas, 'refs': refs,
                                         'alertas': alertas, 'situacao': st.get('situacao', 'a validar'),
                                         'nota': st.get('nota', '')})


def alternativas(o, a):
    return ['  - ' + ('**✔** ' if k == a else '') + chr(65 + k) + ') ' + limpo(t) for k, t in enumerate(o)]


def montar(d, hist, mis):
    R = Registro(d['ref'])
    nomes = d['nomes']

    R.secao('1. Banco de questões do Treino',
            'Questões dos módulos, listas de classificação convertidas e decisões de escolha única da Missão e da '
            'História. São as que aparecem no Simulado e na Revisão.')
    for q in d['qb']:
        mod = nomes.get(q['mod'], q['mod'])
        R.entrada(f"{mod}", ['- **Pergunta:** ' + limpo(q['q']), '- **Alternativas** (✔ = resposta do simulador):']
                  + alternativas(q['o'], q['a']) + ['- **Explicação:** ' + (limpo(q['x']) or '—')], q['r'], ('qb', q['mod']))

    HS = hist['HS']
    R.secao('2. História: passos interativos (OS 0731)',
            'Passos em que o aluno clica nos objetos da cena. As questões de escolha da História estão na seção 1.')
    for s in hist['ST']:
        ty = s.get('ty')
        if ty == 'find':
            alvo = ', '.join(HS.get(k, {}).get('t', k) for k in s['alvo'])
            ok = s.get('ok', {})
            R.entrada(f"{s['f']} · achar o objeto",
                      ['- **Situação:** ' + limpo(s['n']), '- **Tarefa:** ' + limpo(s.get('p')),
                       '- **Resposta do simulador:** ' + alvo,
                       '- **Explicação:** ' + limpo(ok.get('t')) + '. ' + limpo(ok.get('b'))], ok.get('r'), ('find',))
        elif ty == 'hunt':
            for k, v in s['alvos'].items():
                R.entrada(f"{s['f']} · não conformidade",
                          ['- **Objeto:** ' + HS.get(k, {}).get('t', k), '- **Não conformidade:** ' + limpo(v['t']),
                           '- **Explicação:** ' + limpo(v['b'])], v.get('r'), ('hunt',))
        elif ty == 'seq':
            passos = ['  ' + str(n + 1) + '. (' + a['k'] + ') ' + limpo(a['t']) + (': ' + limpo(a['b']) if a.get('b') else '')
                      for n, a in enumerate(s['acts'])]
            R.entrada(f"{s['f']} · sequência do {s['ref']}", ['- **Sequência do simulador:**'] + passos, [s['ref']], ('seq',))
            fonte = (s.get('esp') or {}).get('__fn', '')
            for t, b, r in re.findall(r"\{t:'((?:[^'\\]|\\.)*)',b:'((?:[^'\\]|\\.)*)'(?:,r:\[([^\]]*)\])?", fonte):
                R.entrada(f"{s['f']} · erro de ordem", ['- **Erro:** ' + limpo(t), '- **Explicação:** ' + limpo(b)],
                          re.findall(r"'([^']+)'", r), ('esp',))

    R.secao('3. Missão: passos de marcar e de ordenar (OS 0457)',
            'As decisões de escolha única da Missão estão na seção 1.')
    for s in mis['ST']:
        if s.get('ty') == 'm':
            itens = ['  - ' + ('**✔** ' if it['c'] else '✘ ') + limpo(it['t']) for it in s['items']]
            R.entrada(f"Missão · {s['t']}", ['- **Pergunta:** ' + limpo(s['q']), '- **Marcações do simulador** (✔ = marcar):']
                      + itens + ['- **Explicação:** ' + limpo(s.get('x'))], s.get('r'), ('m',))
        elif s.get('ty') == 'o':
            itens = ['  ' + str(n + 1) + '. ' + limpo(t) for n, t in enumerate(s['items'])]
            R.entrada(f"Missão · {s['t']}", ['- **Pergunta:** ' + limpo(s['q']), '- **Ordem do simulador:**'] + itens
                      + ['- **Explicação:** ' + limpo(s.get('x'))], s.get('r'), ('o',))

    R.secao('4. História: objetos da cena', 'O que cada objeto é e quais itens se aplicam a ele ("Explorar a cena").')
    for k, v in HS.items():
        R.entrada(f"Objeto · {limpo(v['t'])}", ['- **Texto do simulador:** ' + limpo(v['b'])], v.get('r'), ('hs', k))

    R.secao('5. Cartões de fatos do Treino', 'Frente e verso, como aparecem no Treino.')
    for c in d['fc']:
        R.entrada(f"Cartão · {c[0]}", ['- **Frente:** ' + limpo(c[1]), '- **Verso:** ' + limpo(c[2])], c[3], ('fc',))

    R.secao('6. Gerador de questões do Treino',
            f'O gerador sorteia valores a cada uso. Abaixo, até {AMOSTRAS_POR_GERADOR} amostras de cada tipo, com sorteio fixo; '
            'validar as amostras valida a regra do tipo (tabelas em `prototipo/treino.js`).')
    for k, g in d['gen'].items():
        for q in g['amostras']:
            R.entrada(f"Gerador · {g['nome']}", ['- **Pergunta:** ' + limpo(q['q']), '- **Alternativas** (✔ = resposta do simulador):']
                      + alternativas(q['o'], q['a']) + ['- **Explicação:** ' + limpo(q['x'])], q['r'], ('gen', k))

    R.secao('7. Interpretações nos documentos de planejamento',
            'Trechos de `docs/` e do `CLAUDE.md` rotulados [INTERPRETAÇÃO]: leituras do agente sobre a NR-10 que viram regra do projeto.')
    arquivos = sorted((RAIZ / 'docs').glob('*.md')) + [RAIZ / 'CLAUDE.md']
    for arq in arquivos:
        if arq.name in ('VALIDACAO_DO_CONTEUDO.md', 'CONFERENCIA_ITENS.md') or arq.name.startswith('_'):  # gerados e modelos
            continue
        for n, linha in enumerate(arq.read_text(encoding='utf-8').splitlines(), 1):
            if '[INTERPRETAÇÃO' in linha:
                texto = limpo(re.sub(r'[*`|]', ' ', linha))
                R.entrada(f"{arq.relative_to(RAIZ)}", ['- **Trecho:** ' + texto],
                          sorted(set(re.findall(r'\b10(?:\.\d+)+\b', texto))), ('doc', arq.name), rastreio=False)
    return R


def escrever(R):
    todos = [e for s in R.secoes for e in s['itens']]
    cont = {}
    for e in todos:
        cont[e['situacao']] = cont.get(e['situacao'], 0) + 1
    al = {}
    for e in todos:
        for a in e['alertas']:
            a = a.split(':')[0]
            al.setdefault(a, []).append(e['id'])
    L = ['# Validação do conteúdo do software',
         '',
         '> **Gerado por `tools/validacao/gerar.py` — não edite à mão.** Reúne tudo o que o software pergunta e a resposta que ele',
         '> dá, para o usuário conferir contra a NR-10. As respostas e explicações foram escritas pelo agente: são **inferências**',
         '> até serem validadas. Hoje a fonte é o protótipo (Trilha 1); o projeto Godot entra aqui quando tiver conteúdo.',
         '>',
         '> **Como validar:** diga na conversa, por exemplo, "V-1a2b3c ok" ou "V-1a2b3c errado: a resposta certa é …".',
         '> O agente grava a situação em `tools/validacao/status.json` e gera este arquivo de novo. Se o texto de uma entrada',
         '> mudar, o ID muda e ela volta a "a validar".',
         '>',
         '> **Alertas** (heurística por palavras, para priorizar): *mecanismo físico* = explicação física do porquê de um item;',
         '> *prática de campo* = detalhe que não vem da NR-10; *outra norma* = menção a norma fora da NR-10; *interpretação',
         '> rotulada* = trecho já marcado como leitura do simulador; *sem item citado* e *item fora da base* = falha de rastreio.',
         '',
         '## Resumo',
         '',
         '| Seção | Entradas |', '|---|---|']
    L += [f"| {s['titulo']} | {len(s['itens'])} |" for s in R.secoes]
    L += [f"| **Total** | **{len(todos)}** |", '',
          'Situação: ' + ' · '.join(f'{k}: {v}' for k, v in sorted(cont.items())), '',
          '**Revisar primeiro** (entradas com alerta):', '']
    for a, ids in al.items():
        L.append(f'- *{a}* ({len(ids)}): ' + ', '.join(ids))
    for s in R.secoes:
        L += ['', '---', '', '## ' + s['titulo'], '', s['intro']]
        for e in s['itens']:
            sit = e['situacao'] + (f" — {e['nota']}" if e['nota'] else '')
            L += ['', f"### {e['id']} · {e['titulo']}"] + e['linhas']
            L.append('- **Itens citados:** ' + (' · '.join(e['refs']) if e['refs'] else '—'))
            if e['alertas']:
                L.append('- **Alertas:** ' + ' · '.join(e['alertas']))
            L.append(f'- **Situação:** {sit}')
    SAIDA.write_text('\n'.join(L) + '\n', encoding='utf-8')
    print(f'{SAIDA.relative_to(RAIZ)}: {len(todos)} entradas, {sum(1 for e in todos if e["alertas"])} com alerta')


if __name__ == '__main__':
    d = coletar_navegador()
    escrever(montar(d, extrair_st('historia.js'), extrair_st('missao.js')))
