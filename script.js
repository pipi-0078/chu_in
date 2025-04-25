document.addEventListener('DOMContentLoaded', () => {
    // 年の選択肢を生成（令和6年まで）
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    for (let year = 2019; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        if (year === 2019) {
            option.textContent = `${year}年（令和元年・平成31年）`;
        } else {
            option.textContent = `${year}年（令和${year - 2018}年）`;
        }
        yearSelect.appendChild(option);
    }

    // 月の選択肢を生成
    const monthSelect = document.getElementById('month');
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = `${month}月`;
        monthSelect.appendChild(option);
    }

    // 日の選択肢を生成
    const daySelect = document.getElementById('day');
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = `${day}日`;
        daySelect.appendChild(option);
    }

    // 今日の日付をデフォルト値に設定
    const today = new Date();
    yearSelect.value = today.getFullYear();
    monthSelect.value = today.getMonth() + 1;
    updateDays(); // 日の選択肢を更新
    daySelect.value = today.getDate();

    // 月が変更されたときに日の選択肢を更新
    monthSelect.addEventListener('change', updateDays);

    // フォーム送信時の処理
    document.getElementById('calculationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        calculateDates();
    });
});

function updateDays() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const daySelect = document.getElementById('day');
    
    // 選択された月の日数を取得
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // 現在の選択肢をクリア
    daySelect.innerHTML = '<option value="">選択してください</option>';
    
    // 新しい選択肢を追加
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        const date = new Date(year, month - 1, day);
        const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
        option.textContent = `${day}日（${weekdays[date.getDay()]}）`;
        daySelect.appendChild(option);
    }
}

function calculateDates() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    
    const deathDate = new Date(year, month - 1, day);
    const results = document.getElementById('results');
    results.innerHTML = '';
    
    // 各中陰の日付を計算
    const calculations = [
        { name: '初七日', days: 6 },
        { name: '二七日', days: 13 },
        { name: '三七日', days: 20 },
        { name: '四七日', days: 27 },
        { name: '五七日', days: 34 },
        { name: '六七日', days: 41 },
        { name: '満中陰', days: 48 },
        { name: '百ヶ日', days: 99 }
    ];
    
    calculations.forEach(calc => {
        const date = new Date(deathDate);
        date.setDate(date.getDate() + calc.days);
        
        const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = `${calc.name}：${date.getMonth() + 1}月${date.getDate()}日（${weekdays[date.getDay()]}）`;
        results.appendChild(resultItem);
    });
    
    results.classList.add('show');
} 