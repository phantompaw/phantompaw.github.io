const botApiUrl = 'https://your-bot-api-url.com'; // 替換為實際機器人 API URL
const authToken = 'YOUR_AUTH_TOKEN'; // 替換為機器人 API 的驗證 Token

// 獲取機器人狀態
function fetchBotStatus() {
    const statusDisplay = document.getElementById('botStatus');
    statusDisplay.textContent = '檢查中...';

    fetch(`${botApiUrl}/status`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                statusDisplay.textContent = '機器人在線上 ✅';
                statusDisplay.style.color = 'green';
            } else {
                statusDisplay.textContent = '機器人離線 ❌';
                statusDisplay.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching bot status:', error);
            statusDisplay.textContent = '無法檢查機器人狀態 ❌';
            statusDisplay.style.color = 'red';
        });
}

// 發送指令給機器人
function sendBotCommand(command) {
    const commandInput = document.getElementById('commandInput');
    const feedbackArea = document.getElementById('botFeedback');
    feedbackArea.textContent = '處理中...';

    fetch(`${botApiUrl}/execute`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ command }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                feedbackArea.textContent = `機器人回應: ${data.message}`;
                feedbackArea.style.color = 'green';
            } else {
                feedbackArea.textContent = `錯誤: ${data.error}`;
                feedbackArea.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error sending bot command:', error);
            feedbackArea.textContent = '指令傳送失敗 ❌';
            feedbackArea.style.color = 'red';
        });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const checkStatusButton = document.getElementById('checkBotStatus');
    const sendCommandButton = document.getElementById('sendCommand');

    // 綁定事件
    if (checkStatusButton) {
        checkStatusButton.addEventListener('click', fetchBotStatus);
    }
    if (sendCommandButton) {
        sendCommandButton.addEventListener('click', () => {
            const command = document.getElementById('commandInput').value.trim();
            if (command) {
                sendBotCommand(command);
            } else {
                alert('請輸入指令！');
            }
        });
    }

    // 自動檢查機器人狀態
    fetchBotStatus();
});
