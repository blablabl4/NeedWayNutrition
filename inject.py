import codecs
with codecs.open('js/data.js', 'r', 'utf-8') as f:
    code = f.read()
import json
with open('products_out.json', 'r', encoding='utf-8') as f:
    products = f.read()

start = code.find("products: [")
end = code.find("coupons: [", start)
end_products = code.rfind("]", start, end) + 1

if start != -1 and end != -1:
    new_code = code[:start] + "products: " + products + ",\n\n  // ── Coupons ──\n  " + code[end:]
    with codecs.open('js/data.js', 'w', 'utf-8') as f:
        f.write(new_code)
    print("Sucesso!")
else:
    print("Falhou!")
