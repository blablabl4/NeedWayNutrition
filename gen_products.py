import csv, json, re, random
import io

list1 = """Marca,Produto,Porção,Valor Energ.,Carboidratos,Proteínas,Ativo Principal / Obs
DUX,Recharge 1kg - Chocolate,50g,121 kcal,40g,10g,Whey Hidrolisado/Isolado
DUX,Recharge 1kg - Abacaxi,50g,120 kcal,40g,10g,Eletrólitos + Vitaminas
DUX,Fresh Whey 900g - Chocolate,30g,120 kcal,5.9g,20g,Whey Isolate/Concentrate
DUX,Whey Pro Conc. 900g - Choc. Branco,30g,122 kcal,5.5g,20g,WPC Puro
DUX,Fresh Whey 900g - Maracujá,30g,117 kcal,5.9g,20g,Frutas Reais Liofilizadas
DUX,Melatonina Líquida 20ml,0.21ml,0 kcal,0g,0g,0.21mg Melatonina
DUX,B-Complex - 30 caps,1 cap,0 kcal,0g,0g,"Vitaminas B1, B2, B3, B5, B6, B12"
DUX,Vitamina D3 Mini - 120 caps,1 cap,0 kcal,0g,0g,2.000 UI Vitamina D3
AMENDOPRO,Amendopro 900g (Todos os Sabores),40g,158 kcal,6g,20g,Proteína de Amendoim / Vegana
SYN,Creatina Goma (60 gomas),2 gomas,24 kcal,4g,0g,3g Creatina Monohidratada
INTEGRALMEDICA,Creamass 3kg - Chocolate,160g,609 kcal,134g,15g,3g Creatina / Hipercalórico
ADAPTOGEN,Tastywhey 900g - Choc. Suíço,35g,141 kcal,5g,24g,"Whey 3W (WPC, WPI, WPH)"
ADAPTOGEN,Panic Pré-treino 300g,10g,24 kcal,2g,4g,400mg Cafeína / 2g Beta-Alanina
FTW,DeliciusMass 3kg - Chocolate,160g,598 kcal,131g,15g,Hipercalórico (Maltodextrina)
PROBIOTICA,Purewhey 100% - 900g - Morango,33g,130 kcal,4.1g,24g,Whey Concentrado
PROBIOTICA,Creatina - 300g,3g,0 kcal,0g,0g,3g Creatina Monohidratada
SANAVITA,Creatina 300g,3g,0 kcal,0g,0g,100% Creatina Pura
EQUALIV,Magnésio Dimalato - 60 caps,2 caps,0 kcal,0g,0g,210mg Magnésio Elementar
EQUALIV,Ômega 3 Ultra - 120 caps,2 caps,18 kcal,0g,0.5g,720mg EPA / 480mg DHA
EQUALIV,Creatine Monohydrate 300g,3g,0 kcal,0g,0g,Creatina Creapure
ROCK FOODS,Pasta de Amendoim 600g (Belga/Cookies),20g,121 kcal,5.8g,4g,"Com WheyRock (Gord. Totais: 9.2g)"
KATIGUÁ,Coenzima Q10 100mg,2 caps,0 kcal,0g,0g,100mg CoQ10
KATIGUÁ,Coenzima Q10 200mg,2 caps,0 kcal,0g,0g,200mg CoQ10
KATIGUÁ,Colágeno Verisol (Pó 240g),10g,36 kcal,0g,9g,2.5g Verisol + Vitaminas
KATIGUÁ,Creatina Creapure (Sachês),3g,0 kcal,0g,0g,3g Creatina Creapure
KATIGUÁ,Magnésio Dimalato 210mg,2 caps,0 kcal,0g,0g,Suporte Muscular
KATIGUÁ,Magnésio 5 Fontes,2 caps,0 kcal,0g,0g,260mg de 5 tipos de Magnésio
KATIGUÁ,Melatonina + B6,1 cap,0 kcal,0g,0g,0.21mg Melatonina + Vit B6
KATIGUÁ,Óleo de Semente de Abóbora,2 caps,18 kcal,0g,0g,1000mg Óleo de Semente de Abóbora
KATIGUÁ,Ômega 3 Tripla Fonte,4 caps,36 kcal,0g,0.8g,1080mg EPA / 720mg DHA
KATIGUÁ,Ômega 3 IG 540 EPA 360 DHA,2 caps,18 kcal,0g,0.5g,Alta Concentração
KATIGUÁ,Multivitamínico A-Z,1 cap,0 kcal,0g,0g,100% IDR de Vitaminas e Minerais
KATIGUÁ,Vitamina C 1000mg,1 cap,0 kcal,0g,0g,1000mg Ácido Ascórbico
KATIGUÁ,Vitamina D 2000 UI,1 cap,0 kcal,0g,0g,50mcg Colecalciferol
KATIGUÁ,Acetilcisteína 600mg,1 cap,0 kcal,0g,0g,600mg NAC + Zinco + Vit C/D
KATIGUÁ,Cafeína Sports 100mg,1 cap,0 kcal,0g,0g,100mg Cafeína Anidra
KATIGUÁ,Cafeína Sports 200mg,1 cap,0 kcal,0g,0g,200mg Cafeína Anidra
KATIGUÁ,Creatina Monohidratada 300g,3g,0 kcal,0g,0g,3g Creatina Pura
CRN NUTRITION,100% Pure Whey Puretech,33g,130 kcal,4.1g,24g,Whey Concentrado 2W
CRN NUTRITION,Creatina 100% Pure - 300g,3g,0 kcal,0g,0g,3g Creatina Monohidratada
CANIBAL INC,Beta Alanina - 200g,2g,0 kcal,0g,0g,2000mg Beta-Alanina
CANIBAL INC,Creatine Monohydrate - 300g,3g,0 kcal,0g,0g,Creatina Monohidratada
CHEF,Chef Whey (Doce de Leite/Coco),32g,126 kcal,4g,28g,Zero Lactose / 7g BCAA
BODY NUTRY,Thermo Active,2 caps,0 kcal,0g,0g,420mg Cafeína
DARKNESS,Evora - 300g,5g,0 kcal,0g,0g,400mg Cafeína / 2g Beta-Alanina
FULLLIFE,Tomahawk Pré-Treino,10g,15 kcal,2g,0g,400mg Cafeína / Arginina"""

list2 = """MARCA,PRODUTO,VALOR UNITÁRIO DE VENDA
DUX,Recharge 1kg - Chocolate,R$ 99,20
DUX,RICHARGE 1KG - ABACAXI,R$ 143,84
DUX,Fresh Whey 900g - Chocolate,R$ 244,80
DUX,Whey Pro Concentrado 900g - Chocolate Branco,R$ 204,80
DUX,Fresh Whey 900g - Maracujá,R$ 244,80
DUX,Melatonina Liquida 20ml - Maracujá,R$ 35,20
DUX,B-Complex - 30 cápsulas,R$ 56,00
DUX,Vitamina D3 Mini - 120 cápsulas,R$ 57,60
AMENDOPRO,Amendopro 900g - Natural,R$ 212,34
AMENDOPRO,Amendopro 900g - Capuccino,R$ 212,34
AMENDOPRO,Amendopro 900g - Paçoca,R$ 212,34
AMENDOPRO,Amendopro 900g - Chocolate Branco,R$ 212,34
AMENDOPRO,Amendopro 900g - Chocolate,R$ 212,34
SYN,Creatina Goma - Pote 60 gomas,R$ 143,04
SYN,Creatina Goma - Sweet Caramelos,R$ 171,84
INTEGRALMEDICA,Creamass 3kg - Chocolate,R$ 80,00
ADAPTOGEN,Tastywhey 900g - Chocolate Suíço,0
ADAPTOGEN,Panic Pré-treino 300g - Ponche de frutas,R$ 96,00
FTW,DeliciusMass 3kg - Chocolate,R$ 88,00
PROBIOTICA,Purewhey 100% - 900g - Morango,R$ 179,20
PROBIOTICA,Mix Pro Creatine - 300g,0
PROBIOTICA,Creatina - 300g,R$ 65,33
SANAVITA,Creatina 300g,R$ 59,20
EQUALIV,Magnésio Dimalato - 60 cápsulas,0
EQUALIV,Ômega 3 Ultra - 120 cápsulas gel - 1000 mg,0
EQUALIV,Creatine Monohydrate 100% - 300 g,R$ 208,00
ROCK FOODS,Pasta de Amendoim 600g - Choco-Belga,R$ 55,34
ROCK FOODS,Pasta de Amendoim 600g - Choco-Branco,R$ 55,34
ROCK FOODS,Pasta de Amendoim 600g - Cookies ALLB,R$ 55,34
ROCK FOODS,Pasta de Amendoim 600g - Cookies AND,R$ 55,34
ROCK FOODS,Alfajor Proteico - Leite em Pó,0
KATIGUÁ,Coenzima Q10 100 mg - 30 cápsulas,R$ 47,20
KATIGUÁ,Coenzima Q10 200 mg - 30 cápsulas,R$ 51,18
KATIGUÁ,Colágeno Verisol + Vit. Frutas Vermelhas - 240 g,R$ 74,48
KATIGUÁ,Colágeno Verisol + Ácido Hialurônico - Frutas Vermelhas,R$ 81,94
KATIGUÁ,Colágeno Verisol + Vit. Tangerina - 240 mg,R$ 74,48
KATIGUÁ,Colágeno Verisol + Vit. Tangerina - 30 sachês,R$ 80,08
KATIGUÁ,Creatina Creapure - 30 sachês (sem sabor),R$ 115,17
KATIGUÁ,Cúrcuma + MSM - Dose Máxima,R$ 40,88
KATIGUÁ,Fast Pure Melatonina - Maracujá 200 ml,R$ 22,38
KATIGUÁ,Magnésio Dimalato - 210 mg - 60 cápsulas,R$ 28,85
KATIGUÁ,Magnésio Quelato - 210 mg - 60 cápsulas,R$ 36,34
KATIGUÁ,Magnésio Taurato - 84 mg - 60 cápsulas,R$ 38,24
KATIGUÁ,Magnésio Tripla Fonte - 500 mg - 60 cápsulas,R$ 29,68
KATIGUÁ,Magnésio 5 Fontes - Dose Máxima Biofoods - 60 cáps.,R$ 41,54
KATIGUÁ,Melatonina + B6 - 210 mcg - 120 cápsulas,R$ 25,94
KATIGUÁ,Men 40 Viking - 600 mg - 30 cápsulas,R$ 31,84
KATIGUÁ,Óleo de Semente de Abóbora,R$ 23,84
KATIGUÁ,Óleo de Semente de Abóbora - 1000 g - 60 cápsulas,R$ 35,04
KATIGUÁ,Ômega 3 Tripla Fonte 1000 mg - 120 cápsulas,R$ 27,22
KATIGUÁ,Ômega 3 Tripla Fonte 1000 mg - 180 cápsulas,R$ 36,77
KATIGUÁ,Ômega 3 Tripla Fonte 1000 mg - 240 cápsulas,R$ 47,98
KATIGUÁ,Ômega 3 Tripla Fonte 1000 mg - 60 cápsulas,R$ 19,60
KATIGUÁ,Ômega com Meg-3 540/360 + Vitamina E - 60 cápsulas,R$ 41,44
KATIGUÁ,Ômega 3 IG 50 EPA 360 DHA + Vitamina E - 60 cápsulas,R$ 44,64
KATIGUÁ,Ômega 3 IG 540 EPA 360 DHA + Biofoods - 120 cápsulas,R$ 44,64
KATIGUÁ,Ômega 3 540 EPA 360 DHA 1000 mg - 60 cápsulas,R$ 27,81
KATIGUÁ,Ômega 3 540 EPA 360 DHA 1000 mg - 120 cápsulas,R$ 46,48
KATIGUÁ,Ômega 3 540 EPA 360 DHA 1000 mg - 180 cápsulas,R$ 69,07
KATIGUÁ,Ômega 3 540 EPA 360 DHA 1000 mg - 240 cápsulas,R$ 89,60
KATIGUÁ,Própolis Verde - 30 cápsulas,R$ 25,44
KATIGUÁ,Multivitamínico A-Z - 30 cápsulas,R$ 10,45
KATIGUÁ,Picolinato de Cromo - 30 cápsulas,R$ 12,19
KATIGUÁ,Vitamina C - 1000 mg - 30 cápsulas,R$ 18,48
KATIGUÁ,Vitamina D - 2000 UI - 30 cápsulas,R$ 13,41
KATIGUÁ,Vitamina E - 400 mg - Softgel - 30 cápsulas,R$ 16,61
KATIGUÁ,Acetilcisteína 600 mg + Vit. C + D3 + Zinco - 16 cáp.,R$ 17,58
KATIGUÁ,Acetilcisteína 600 mg x 5 g - 16 sachês,R$ 17,58
KATIGUÁ,Beta Alanina 300 mg - 120 cápsulas,R$ 25,58
KATIGUÁ,Biotina Dose Máxima 500 mg - 60 cápsulas,R$ 15,98
KATIGUÁ,Metilcobalamina Dose Máxima - 60 cápsulas,R$ 17,58
KATIGUÁ,Cafeína Sports 100 mg - 120 cápsulas,R$ 35,18
KATIGUÁ,Cafeína Sports - 60 cápsulas,R$ 27,18
KATIGUÁ,Creatina Monohidratada - 300 g,R$ 39,82
KATIGUÁ,Cálcio 500 mg - 60 cápsulas,R$ 16,61
CRN NUTRITION,100% Pure Whey Puretech - Baunilha - 900g,R$ 80,00
CRN NUTRITION,100% Pure Whey Puretech - Chocolate - 900g,R$ 80,00
CRN NUTRITION,100% Pure Whey Puretech - Morango - 900g,R$ 80,00
CRN NUTRITION,Creatina 100% Pure - 300g - Puretech,R$ 48,00
CANIBAL INC,Beta Alanina - 200 g,R$ 80,46
CANIBAL INC,Creatine Monohydrate - 300 g,R$ 83,20
CHEF,Chef Whey 800g - Doce de Leite,R$ 245,36
CHEF,Whey 800g - Coco c/ Leite Condensado,R$ 245,36
BODY NUTRY,Thermo Active - 60 cápsulas - 47 g,R$ 40,00
NATURAL FOODS,Vitamina D3 - 60 cápsulas - 37 g,R$ 24,00
DARKNESS,Evora - 300 g - Laranja,R$ 35,20
FULLLIFE,Tomahawk Pré-Treino Workout - 380 g - Tangerina,R$ 89,60"""

reader1 = csv.reader(io.StringIO(list1))
next(reader1)

nutritions = {}
for parts in reader1:
    if len(parts) >= 7:
        brand = parts[0].strip()
        name = parts[1].strip()
        key = (brand.upper() + ':' + name.split('-')[0].strip().upper())
        nutritions[key] = {
            'portion': parts[2].strip(),
            'calories': parts[3].strip(),
            'carbs': parts[4].strip(),
            'protein': parts[5].strip(),
            'desc': parts[6].strip()
        }

reader2 = csv.reader(io.StringIO(list2))
next(reader2)

products = []
idx = 1
for parts in reader2:
    if len(parts) < 3: continue
    brand = parts[0].strip()
    name = parts[1].strip()
    price_str = parts[2].strip()
    
    price = 99.90
    if price_str.startswith('R$'):
        price = float(price_str.replace('R$ ', '').replace('.', '').replace(',', '.'))
            
    n_up = name.upper()
    cat = 'encapsulados'
    if 'WHEY' in n_up or 'WPC' in n_up or 'WPI' in n_up or 'RECHARGE' in n_up: cat = 'whey-protein'
    elif 'CREATINA' in n_up or 'CREATINE' in n_up: cat = 'creatina'
    elif 'TREINO' in n_up or 'PANIC' in n_up or 'ÉVORA' in n_up or 'EVORA' in n_up or 'TOMAHAWK' in n_up: cat = 'pre-treino'
    elif 'MAGNÉSIO' in n_up or 'VITAMINA' in n_up or 'CÁLCIO' in n_up or 'ÔMEGA' in n_up or 'B-COMPLEX' in n_up or 'COENZIMA' in n_up or 'MULTIVITAMÍNICO' in n_up or 'BIOTINA' in n_up or 'METILCOBALAMINA' in n_up: cat = 'vitaminas'
    elif 'COLÁGENO' in n_up: cat = 'colageno'
    elif 'THERMO' in n_up or 'CAFEÍNA' in n_up: cat = 'termogenicos'
    elif 'AMENDOIM' in n_up or 'AMENDOPRO' in n_up or 'ALFAJOR' in n_up: cat = 'saudaveis'
    elif 'MASS' in n_up: cat = 'hipercalorico'
    elif 'BETA ALANINA' in n_up or 'ACETILCISTEÍNA' in n_up or 'BCAA' in n_up: cat = 'aminoacidos'
    
    key = brand.upper() + ':' + name.split('-')[0].strip().upper()
    nutri = nutritions.get(key)
    
    if not nutri:
        nutri = {'portion': '', 'calories': '', 'carbs': '', 'protein': '', 'desc': ''}
        
    original = round(price * 1.25, 2)
    discount = round(100 - (price/original * 100)) if original > 0 else 0
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name.lower()).strip('-')

    products.append({
        'id': idx,
        'name': name,
        'slug': slug,
        'category': cat,
        'brand': brand,
        'originalPrice': original,
        'price': price,
        'discount': discount,
        'pix': None,
        'flavors': [],
        'sizes': [],
        'rating': round(random.uniform(4.5, 5.0), 1),
        'reviewCount': random.randint(30, 2500),
        'stock': random.randint(15, 120),
        'sold': random.randint(50, 5000),
        'badges': [],
        'description': nutri['desc'] if nutri['desc'] else name,
        'nutritionTable': {
            'porcao': nutri['portion'],
            'valorEnergetico': nutri['calories'],
            'carboidratos': nutri['carbs'],
            'proteinas': nutri['protein']
        },
        'images': ['img/produtos/default.jpg'],
        'isNew': False,
        'isOutlet': False,
        'tags': [cat]
    })
    idx += 1

with open('products_out.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)
print(f"Created {len(products)} products")
