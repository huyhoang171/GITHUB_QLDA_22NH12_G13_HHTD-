from gtts import gTTS
import os
import json

# Đường dẫn đến file JSON chứa danh sách câu
INPUT_FILE = 'travel.json'
# Thư mục để lưu file mp3
OUTPUT_DIR = '../../audio/travel'

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Đọc file JSON
with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Lặp qua từng câu và tạo file mp3
for item in data:
    text = item["english"]
    filename = item["audio"]
    output_path = os.path.join(OUTPUT_DIR, filename)

    try:
        tts = gTTS(text, lang='en')
        tts.save(output_path)
        print(f"✅ Created: {output_path}")
    except Exception as e:
        print(f"❌ Failed to create {output_path}: {e}")
