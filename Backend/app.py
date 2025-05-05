from flask import Flask, request, jsonify
import whisper
import os
from flask_cors import CORS # Import CORS

app = Flask(__name__)
CORS(app) # Kích hoạt CORS cho toàn bộ ứng dụng

# Load Whisper model
# Cân nhắc load model nhỏ hơn (tiny, base) nếu chỉ test để nhanh hơn
try:
    model = whisper.load_model("tiny")
    print("Whisper model loaded successfully.")
except Exception as e:
    print(f"Error loading Whisper model: {e}")
    # Có thể thoát ứng dụng hoặc xử lý khác nếu model không load được
    exit()


@app.route('/transcribe', methods=['POST'])
def transcribe():
    # Kiểm tra xem model đã load thành công chưa
    if not model:
         return jsonify({"error": "Whisper model not loaded."}), 500

    if 'audio' not in request.files:
        print("Request received without 'audio' file.")
        return jsonify({"error": "No audio file provided in the 'audio' field."}), 400

    audio_file = request.files['audio']
    print(f"Received file: {audio_file.filename}")

    # Tạo thư mục uploads nếu chưa có
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    # Tạo đường dẫn file an toàn hơn (tránh lỗi tên file)
    safe_filename = f"uploaded_{os.urandom(8).hex()}{os.path.splitext(audio_file.filename)[1]}"
    audio_path = os.path.join(upload_folder, safe_filename)

    try:
        print(f"Saving audio to: {audio_path}")
        audio_file.save(audio_path)
        print("Audio saved successfully.")

        print("Starting transcription...")
        # Đảm bảo đường dẫn là đúng
        result = model.transcribe(audio_path, fp16=False) # Thêm fp16=False nếu không có GPU hoặc gặp lỗi CUDA
        transcription_text = result['text']
        print(f"Transcription result: {transcription_text}")

        return jsonify({"transcription": transcription_text})

    except Exception as e:
        print(f"Error during transcription or file handling: {e}")
        # Ghi log lỗi chi tiết hơn nếu cần
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        # Xóa file sau khi xử lý xong
        if os.path.exists(audio_path):
            try:
                os.remove(audio_path)
                print(f"Removed temporary file: {audio_path}")
            except Exception as remove_error:
                print(f"Error removing temporary file {audio_path}: {remove_error}")


if __name__ == '__main__':
    print("Starting Flask server...")
    # Đảm bảo chạy trên 0.0.0.0 để có thể truy cập từ mạng LAN
    app.run(host='0.0.0.0', port=5000, debug=True) # Giữ nguyên host='0.0.0.0'