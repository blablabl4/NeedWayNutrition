import codecs

with codecs.open('public/js/data.js', 'r', 'utf-8') as f:
    text = f.read()

idx_start = text.find("products: [\n")
idx_end = text.find("  // ── Coupons ──")
if idx_start != -1 and idx_end != -1:
    # go back slightly to delete the bracket
    end_bracket = text.rfind("],", idx_start, idx_end)
    if end_bracket != -1:
        text = text[:idx_start] + "products: [],\n\n" + text[idx_end:]


idx_start = text.find("coupons: [\n")
idx_end = text.find("  // ── Reviews", idx_start)
if idx_start != -1 and idx_end != -1:
    end_bracket = text.rfind("],", idx_start, idx_end)
    if end_bracket != -1:
        text = text[:idx_start] + "coupons: [],\n\n" + text[idx_end:]


idx_start = text.find("categories: [\n")
idx_end = text.find("  // ── Objectives", idx_start)
if idx_start != -1 and idx_end != -1:
    end_bracket = text.rfind("],", idx_start, idx_end)
    if end_bracket != -1:
        text = text[:idx_start] + "categories: [],\n\n" + text[idx_end:]


with codecs.open('public/js/data.js', 'w', 'utf-8') as f:
    f.write(text)
print("Stripped!")
