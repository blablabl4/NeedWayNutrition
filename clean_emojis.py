import os
import re

directory = r"C:\Users\Isaque\Desktop\NeedWay"
# Specific targets provided by user screenshots & general emojis common in these files
targets = [
    '😴', '🆕', '⚠️', '🔬', '🚀', '🤝', '💬', '✉️', '📝', '📊', 
    '🚚', '📍', '♡', '👤', '🚪', '🛒', '✓', '🏠', '💰', '1️⃣', 
    '2️⃣', '3️⃣', '4️⃣', '5️⃣', '©', '⚙️', '🌟', '⏱️', '📅', '✓', '🔍', '♡'
]

cleaned_count = 0
files_touched = []

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('.html', '.js')) and not 'node_modules' in root and not '.git' in root:
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            original = content
            for t in targets:
                content = content.replace(t, '')
                
            # Extra cleanup
            content = content.replace('  ', ' ')
            
            if original != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                cleaned_count += 1
                files_touched.append(file)
                print(f"Cleaned {file}")

print(f"Processed and cleaned {cleaned_count} files.")
print("Files:", ", ".join(files_touched))
