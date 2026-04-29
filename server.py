from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# <-- PASTE your new API key here, between the quotes (do NOT share it publicly) -->
client = OpenAI(api_key="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")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"reply": "Please send a message."})

    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini-tts",
            messages=[{"role": "user", "content": user_message}]
        )
        reply = resp.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        print("SERVER ERROR:", e)
        return jsonify({"reply": "⚠️ Server error. Check terminal."})

@app.route("/")
def index():
    return send_file("code.html")

@app.route("/<path:filename>")
def serve_static(filename):
    return send_file(filename)

if __name__ == "__main__":
    app.run(debug=True)
@app.route("/<path:favicon.ico>")
def serve_static(filename):
    if filename == "favicon.ico":
        return "", 204   # empty response, no error
    return send_file("favicon.ico")

