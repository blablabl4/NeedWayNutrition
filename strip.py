import codecs
import re

with codecs.open('public/js/data.js', 'r', 'utf-8') as f:
    code = f.read()

code = re.sub(r'products:\s*\[.*?\n  \],\n\n  // ── Coupons ──', 'products: [],\n\n  // ── Coupons ──', code, flags=re.DOTALL)
code = re.sub(r'categories:\s*\[.*?\n  \],\n\n  // ── Objectives ──', 'categories: [],\n\n  // ── Objectives ──', code, flags=re.DOTALL)
code = re.sub(r'coupons:\s*\[.*?\n  \],\n\n  // ── Reviews \(sample\) ──', 'coupons: [],\n\n  // ── Reviews (sample) ──', code, flags=re.DOTALL)

fetch_code = """
// ── Assincrono Fetch do Banco ──
window.loadNeedwayData = async function() {
    try {
        const [prodRes, catRes, coupRes] = await Promise.all([
            fetch('/api/products'),
            fetch('/api/categories'),
            fetch('/api/coupons')
        ]);
        if (prodRes.ok) NeedwayData.products = await prodRes.json();
        if (catRes.ok) NeedwayData.categories = await catRes.json();
        if (coupRes.ok) NeedwayData.coupons = await coupRes.json();
    } catch(e) {
        console.error('Falha carregando dados da API:', e);
    }
};
"""

code = code + fetch_code

with codecs.open('public/js/data.js', 'w', 'utf-8') as f:
    f.write(code)
print("Sucesso!")
