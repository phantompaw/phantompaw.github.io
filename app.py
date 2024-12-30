from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# 全域變數
BOT_STATUS_URL = "http://localhost:5000/bot_status"  # Bot 狀態 API

@app.route("/bot_status", methods=["GET"])
def bot_status():
    """檢查 Discord Bot 狀態"""
    try:
        response = requests.get(BOT_STATUS_URL)
        bot_status = response.json()
        return jsonify({"online": bot_status["online"]})
    except Exception as e:
        return jsonify({"online": False, "error": str(e)}), 500

@app.route("/submit_form", methods=["POST"])
def submit_form():
    """處理表單提交並檢查 Bot 狀態"""
    form_data = request.json
    try:
        # 檢查 Bot 是否在線
        bot_online = requests.get(BOT_STATUS_URL).json().get("online", False)
        if not bot_online:
            return jsonify({"message": "Bot 未上線，表單已儲存，但未通知管理員。"})

        # 呼叫 Discord Bot 的通知功能
        notify_url = "http://localhost:5000/notify_admin"
        requests.post(notify_url, json=form_data)
        return jsonify({"message": "表單提交成功，管理員已收到通知。"})

    except Exception as e:
        return jsonify({"message": f"發生錯誤：{str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
