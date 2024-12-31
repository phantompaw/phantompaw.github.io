const scriptURL = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec';

function fetchFeedbackData() {
    const feedbackTable = document.getElementById('feedbackTable');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // 顯示 Loading 畫面
    loadingOverlay.style.display = 'flex';

    // Fetch 回饋資料
    fetch(scriptURL + '?action=fetch')
        .then(response => response.json())
        .then(data => {
            feedbackTable.innerHTML = ''; // 清空表格
            if (data && data.length > 0) {
                data.forEach((entry, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${sanitizeInput(entry.name)}</td>
                        <td>${sanitizeInput(entry.email)}</td>
                        <td>${sanitizeInput(entry.age)}</td>
                        <td>${sanitizeInput(entry.job)}</td>
                        <td>${sanitizeInput(entry.gender)}</td>
                        <td>${sanitizeInput(entry.feedback)}</td>
                        <td>${sanitizeInput(entry.other)}</td>
                        <td>
                            <button class="delete-btn" onclick="deleteFeedback(${entry.id})">刪除</button>
                        </td>
                    `;
                    feedbackTable.appendChild(row);
                });
            } else {
                feedbackTable.innerHTML = '<tr><td colspan="9">目前沒有任何回饋資料。</td></tr>';
            }
            loadingOverlay.style.display = 'none'; // 隱藏 Loading 畫面
        })
        .catch(error => {
            console.error('Error fetching feedback data:', error);
            feedbackTable.innerHTML = '<tr><td colspan="9">無法加載資料，請稍後再試。</td></tr>';
            loadingOverlay.style.display = 'none'; // 隱藏 Loading 畫面
        });
}

function deleteFeedback(id) {
    if (!confirm('您確定要刪除此回饋嗎？')) return;

    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    fetch(scriptURL + '?action=delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Success') {
                alert('回饋已成功刪除！');
                fetchFeedbackData(); // 刷新表格
            } else {
                alert(`刪除失敗: ${data.message}`);
            }
            loadingOverlay.style.display = 'none';
        })
        .catch(error => {
            console.error('Error deleting feedback:', error);
            alert('刪除過程中發生錯誤，請稍後再試。');
            loadingOverlay.style.display = 'none';
        });
}

function refreshTable() {
    fetchFeedbackData();
}

function exportData() {
    fetch(scriptURL + '?action=export')
        .then(response => response.json())
        .then(data => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'feedback-data.json';
            link.click();
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error exporting data:', error);
            alert('匯出過程中發生錯誤，請稍後再試。');
        });
}

// 初始化
document.addEventListener('DOMContentLoaded', fetchFeedbackData);
