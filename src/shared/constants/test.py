import json
import re

# Путь к файлу
json_path = 'texts.json'

# Загружаем JSON
with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Обрабатываем каждый трек
for song in data:
    text = song['text']
    # Удаляем первую строку вида "\"Название\"\n\n"
    clean_text = re.sub(r'^"[^"]*"\n\n', '', text)
    song['text'] = clean_text.strip()  # Удаляем лишние пробелы

# Сохраняем обратно
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("JSON обновлён: названия песен удалены из 'text'.")