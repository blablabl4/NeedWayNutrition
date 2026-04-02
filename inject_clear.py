with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

new_code = code.replace(
    "const prodOverride = localStorage.getItem('needway-products-override');",
    "localStorage.removeItem('needway-products-override');\n  const prodOverride = null;"
)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_code)
print("Cache force clear injected!")
