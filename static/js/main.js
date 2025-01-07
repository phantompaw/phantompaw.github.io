const { createApp } = Vue;

createApp({
    data() {
        return {
            message: ''
        };
    },
    methods: {
        async sendMessage() {
            const response = await fetch('/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: this.message })
            });

            const result = await response.json();
            alert(result.message);
        }
    }
}).mount('#app');
window.onload = function() {
    // 假設你有一個 API 可以獲取 Discord 機器人狀態
    fetch('https://your-api-endpoint.com/status')
        .then(response => response.json())
        .then(data => {
            const statusText = data.status;  // 假設 API 返回 { "status": "online" }
            document.getElementById('bot-status-text').textContent = statusText;
        })
        .catch(error => {
            console.error('Error fetching bot status:', error);
            document.getElementById('bot-status-text').textContent = '無法獲取狀態';
        });
};
