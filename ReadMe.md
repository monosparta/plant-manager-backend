# Rental Planter Backend 會員植物管理系統 後端  

## 系統需求  
- Node.JS 16  
- MySql 8  
- Mosquitto
- yarn  
- pm2(選用)  

## API 文件
- 參見 [API.md](https://github.com/monosparta/rental-planter-backend/blob/main/doc/API.md)

## 資料庫 ER Model
![ERModel](https://user-images.githubusercontent.com/10269287/188054625-69d28d64-bbcf-438b-90f7-9260b7eaab04.png)

## 部屬  

1. 將本專案 Clone 下來  
```bash
git clone https://github.com/monosparta/rental-planter-backend.git
```
2. 安裝相依  
```bash
cd rental-planter-backend
yarn
```
3. 設定環境變數（可寫在專案跟目錄下的 `.env` 檔案中）  
<details>
<summary> Dev 環境 </summary>
必要環境變數：  

```bash
# 資料庫
DEV_DB_USERNAME="" # 使用者名稱
DEV_DB_PASSWORD="" # 密碼

# Json Web Token
JWT_SECRECT=""

# MQTT
MQTT_USERNAME="" # MQTT 使用者名稱
MQTT_PASSWORD="" # MQTT 密碼

# Email Service
EMAIL_SERVICE="" # Email 服務 如： "gmail" 或 "hotmail"
EMAIL_ACCOUNT="" # Email
EMAIL_PASSWORD="" # Email 密碼（Gmail 需使用應用程式密碼）
EMAIL_WHITELIST="1" # 將此變數設定為 1 啟用電子郵件白名單模式（Dev 環境建議啟用）

# Membership 
USE_FAKE_MEMBER="1" # 將此變數設定為 1 強制啟用假會員模式（不會呼叫 API）（Dev 環境建議啟用）
```

選用環境變數（含預設值）：  
```bash
# 資料庫
DEV_DB_NAME="rental-planter" # 資料庫名稱
DEV_DB_HOSTNAME="127.0.0.1" # 資料庫 Host
DEV_DB_PORT=3306 # 資料庫 Port

# Express
PORT=3000
FRONT_URL="http://localhost:3000" # Email 內的前端網址，不含最後的 /

# MQTT
MQTT_HOST="localhost" # MQTT host
MQTT_PORT=1883 # MQTT port
MQTT_TOPIC="Plant/Data" # MQTT 接收資料 Topic

# WebSocket
SOCKET_TOPIC="Plant/Data" # Socker 傳送資料 Topic
SOCKET_REQ_DATA="lastData" # Socker 最後資料要求 Topic

# Membership 
MEMBER_API_URL=""   # 會員 API 完整網址，如未設定則會啟用假會員模式
```
</details>

<details>
<summary> Stage 環境 </summary>
必要環境變數：  

```bash
# 指定執行環境，請勿更改
NODE_ENV="stage"

# 資料庫
STAGE_DB_USERNAME="" # 使用者名稱
STAGE_DB_PASSWORD="" # 密碼

# Json Web Token
JWT_SECRECT=""

# Express
FRONT_URL="" # Email 內的前端網址，不含最後的 /

# MQTT
MQTT_USERNAME="" # MQTT 使用者名稱
MQTT_PASSWORD="" # MQTT 密碼

# Email Service
EMAIL_SERVICE="" # Email 服務 如： "gmail" 或 "hotmail"
EMAIL_ACCOUNT="" # Email
EMAIL_PASSWORD="" # Email 密碼（Gmail 需使用應用程式密碼）

# Membership 
MEMBER_API_URL=""   # 會員 API 完整網址，如未設定則會啟用假會員模式
```

選用環境變數（含預設值）：  
```bash
# 資料庫
STAGE_DB_NAME="rental-planter" # 資料庫名稱
STAGE_DB_HOSTNAME="127.0.0.1" # 資料庫 Host
STAGE_DB_PORT=3306 # 資料庫 Port

# Express
PORT=3000

# MQTT
MQTT_HOST="localhost" # MQTT host
MQTT_PORT=1883 # MQTT port
MQTT_TOPIC="Plant/Data" # MQTT 接收資料 Topic

# WebSocket
SOCKET_TOPIC="Plant/Data" # Socker 傳送資料 Topic
SOCKET_REQ_DATA="lastData" # Socker 最後資料要求 Topic
EMAIL_WHITELIST="1" # 將此變數設定為 1 啟用電子郵件白名單模式

# Membership 
USE_FAKE_MEMBER="1" # 將此變數設定為 1 強制啟用假會員模式（不會呼叫 API）
```
</details>

<details>
<summary> Production 環境 </summary>
必要環境變數：  

```bash
# 指定執行環境，請勿更改
NODE_ENV="production"
# 資料庫
PROD_DB_USERNAME="" # 使用者名稱
PROD_DB_PASSWORD="" # 密碼
PROD_DB_HOSTNAME="" # 資料庫 Host
PROD_DB_PORT=3306 # 資料庫 Port

# Json Web Token
JWT_SECRECT=""

# Express
FRONT_URL="" # Email 內的前端網址，不含最後的 /

# MQTT
MQTT_USERNAME="" # MQTT 使用者名稱
MQTT_PASSWORD="" # MQTT 密碼

# Email Service
EMAIL_SERVICE="" # Email 服務 如： "gmail" 或 "hotmail"
EMAIL_ACCOUNT="" # Email
EMAIL_PASSWORD="" # Email 密碼（Gmail 需使用應用程式密碼）

# Membership 
MEMBER_API_URL=""   # 會員 API 完整網址
```

選用環境變數（含預設值）：  
```bash
# 資料庫
PROD_DB_NAME="rental-planter" # 資料庫名稱

# Express
PORT=3000

# MQTT
MQTT_HOST="localhost" # MQTT host
MQTT_PORT=1883 # MQTT port
MQTT_TOPIC="Plant/Data" # MQTT 接收資料 Topic

# WebSocket
SOCKET_TOPIC="Plant/Data" # Socker 傳送資料 Topic
SOCKET_REQ_DATA="lastData" # Socker 最後資料要求 Topic
EMAIL_WHITELIST="1" # 將此變數設定為 1 啟用電子郵件白名單模式

# Membership 
USE_FAKE_MEMBER="1" # 將此變數設定為 1 強制啟用假會員模式（不會呼叫 API）
```
</details>

> 如果有啟用電子郵件白名單，可將白名單電子郵件寫在根目錄的 `mailWhitelist.json` 內，格式為 string[]。在白名單內的電子郵件會寄出，否則輸出在 console 內。  
> 假會員資料在 `fakeMemberShip.json`，程式第一次啟動會自動生成。

4. 套用資料表  
```bash
yarn migrate:up
```
5. 填入假資料（非 Production 才要用）  
```bash
yarn seed:up
```
6. 建置  
```bash
yarn build:clean
```
7. 執行  
直接執行：  
```bash
yarn start
```
或使用 pm2 執行：  
```bash
pm2 reload ecosystem.config.json
```
8. 預設管理員帳號（登入後會跳轉修改密碼頁面）：
```bash
USERNAME: root@rental.planter
PASSWORD: root
```
