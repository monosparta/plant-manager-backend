# Rental Planter Backend 會員植物管理系統 後端  

## 系統需求  
- Node.JS 16  
- MySql 8  
- yarn  
- pm2(選用)  

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
```

選用環境變數（含預設值）：  
```bash
# 資料庫
DEV_DB_NAME="rental-planter" # 資料庫名稱
DEV_DB_HOSTNAME="127.0.0.1" # 資料庫 Host
DEV_DB_PORT=3306 # 資料庫 Port

# Express
PORT=3000
FRONT_URL="http://localhost:3000/" # Email 內的前端網址

# MQTT
MQTT_HOST="localhost" # MQTT host
MQTT_PORT=1883 # MQTT port
MQTT_TOPIC="Plant/Data" # MQTT 接收資料 Topic

# WebSocket
SOCKET_TOPIC="Plant/Data" # Socker 傳送資料 Topic
SOCKET_REQ_DATA="lastData" # Socker 最後資料要求 Topic
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
FRONT_URL="" # Email 內的前端網址

# MQTT
MQTT_USERNAME="" # MQTT 使用者名稱
MQTT_PASSWORD="" # MQTT 密碼

# Email Service
EMAIL_SERVICE="" # Email 服務 如： "gmail" 或 "hotmail"
EMAIL_ACCOUNT="" # Email
EMAIL_PASSWORD="" # Email 密碼（Gmail 需使用應用程式密碼）
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
FRONT_URL="" # Email 內的前端網址

# MQTT
MQTT_USERNAME="" # MQTT 使用者名稱
MQTT_PASSWORD="" # MQTT 密碼

# Email Service
EMAIL_SERVICE="" # Email 服務 如： "gmail" 或 "hotmail"
EMAIL_ACCOUNT="" # Email
EMAIL_PASSWORD="" # Email 密碼（Gmail 需使用應用程式密碼）
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
```
</details>

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
