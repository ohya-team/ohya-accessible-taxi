# ohya-accessible-taxi
## gulp使用說明
### 第一次使用 gulp 前，請先在終端機中 keyin "npm install"或點選npm script中的安裝套件，將 gulp 裡的套件一鍵安裝！
### 在載入 nav 請在各自的 html 頁面中 keyin "@@include('layout/header.html')"
### 在載入 footer 請在各自的 html 頁面中 keyin "@@include('layout/footer.html')"
## 開發流程
### 第一步:先按開發
### 第二步:按webpack 編譯js development版

## 打包流程
### 第一步:先按打包上線
### 第二步:按webpack 編譯js production版

## 注意事項
### js檔名請用小駝峰命名,"-"在webpack.config.js無法被讀到 轉檔會有問題。
### 圖檔請不要用大寫命名(ftp會自動把大寫轉小寫)。
### 原則上建議載套件盡量用npm載，直接抓min檔會比較webpack難編譯。
### 開發跟webpack編譯js兩個終端機都要開，如果沒開webpack編譯js， 會無法編譯js
### 如果新增js檔，請按照下圖範例新增入口至webpack.config.js檔裡(如果沒新增，會讀不到新增的js檔)。
![範例圖片](/dev/images/mdEx1.png)
### 有寫vue的請在在js檔裡加這三行，已便程式了解是否要進行開發模式。
![範例圖片](/vue_env.png)
## 額外說明
### 1.jquery是全域皆可使用，想要用vue的請先加
### 2.後臺參考模板:http://secondtruth.github.io/startmin/pages/panels-wells.html
``` 
import Vue  from 'vue';
``` 




