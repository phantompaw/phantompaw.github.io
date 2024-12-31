document.addEventListener("DOMContentLoaded", () => {
    const percentageText = document.getElementById("percentage");
    const progressBar = document.getElementById("progress-box");
    const loading = document.getElementById("loading");
    let percentage = 0;

    const interval = setInterval(() => {
        percentage += 1;
        percentageText.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;

        if (percentage >= 100) {
            clearInterval(interval);
            $(loading).slideUp(500, 'swing');
            setTimeout(() => {
                $("body").css("overflow-y", "auto");
            }, 50);
            console.log("Loading Complete");
        }
    }, 20); // 每 20 毫秒更新一次
});
