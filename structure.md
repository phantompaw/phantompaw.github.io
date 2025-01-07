techphantompaw/
│
├── bot/                            # Discord 機器人相關程式
│   ├── .env                        # .env
│   └── discordbot.js               # bot
│
└── phantompaw.github.io/           # GitHub Pages 靜態網站
    │
    ├── static/                     # 靜態資源目錄
    │   ├── css/                    # 樣式表
    │   │   ├── bootstrap.css       # 引用樣式庫 (若使用)
    │   │   └── style.css           # 自訂樣式表
    │   ├── img/                    # 圖片素材
    │   │   └── Phantom-Paw.jpg
    │   └── js/                     # JavaScript 檔案
    │       ├── botIntegration.js   # 與機器人互動腳本
    │       ├── FeedbookPost.js     # 回饋表單提交腳本
    │       ├── FeedbookGet.js      # 回饋內容管理get腳本
    │       ├── admin.js            # 登入處理
    │       ├── loading.js          # loading動畫處理
    │       ├── jquery.js           # jquery
    │       ├── jquery-ui.min.js    # jquery UI
    │       ├── themeToggle.js      # 主題切換腳本
    │       └── main.js             # 自定義腳本
    │
    ├── app.py                      # Flask 後端服務
    ├── index.html                  # 靜態首頁 (GitHub Pages)
    ├── manage.html                 # 回饋管理
    ├── feedback.html               # 用戶回饋
    ├── README.md                   # 專案說明文件
    ├── requirements.txt            # Python 套件依賴
    └── structure.md                # 資料夾結構描述文件