const fs = require('fs');

// 1. 讀取並解析 JSON 檔案
const raw = fs.readFileSync('salesData.json', 'utf-8');
const data = JSON.parse(raw);

// 2. 計算總收入
const totalRevenue = data.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);


// 3. 統計各商品售出數量
const itemCount = {};
data.forEach(item => {
  if (itemCount[item.product]) {
    itemCount[item.product] += item.quantity;
  } else {
    itemCount[item.product] = item.quantity;
  }
});

// 4. 找出最高售出數量
const maxCount = Math.max(...Object.values(itemCount));

// 5. 找出所有並列最暢銷商品
const bestSellers = Object.entries(itemCount)
  .filter(([product, count]) => count === maxCount)
  .map(([product]) => product);

// 6. 組合報告內容
let report = '';
report += '========== 銷售分析報告 ==========\n';
report += `分析交易筆數：${data.length} 筆\n`;
report += `總收入：NT$ ${totalRevenue.toLocaleString()}\n`;
report += '\n---------- 各商品售出數量 ----------\n';

Object.entries(itemCount).forEach(([product, count]) => {
  report += `${product}：${count} 件\n`;
});

report += '\n---------- 最暢銷商品 ----------\n';
report += `${bestSellers.join('、')}：各售出 ${maxCount} 件\n`;
report += '===================================\n';

// 7. 輸出到 report.txt
fs.writeFileSync('report.txt', report, 'utf-8');

// 8. 同時在終端機顯示
console.log(report);
console.log('✅ 報告已成功輸出至 report.txt');