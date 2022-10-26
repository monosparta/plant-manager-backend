# Generate OpenAPI Markdown

1. Install Widdershins
```
npm i -g widdershins
```
2. Generate temp document
```
widdershins API.yaml -o temp.md --omitHeader -c
```
3. Example of an API entry and fill from temp.md accordingly to 
```Markdown

---
<span id="{{anchor point here}}"></span>

## `{{API method here}} {{API Path here}}`
*{{Description here}}*

> 需要 [Header](#header)

#### 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
{{Parameters table here}}

### Body
> Content Type: `application/json`

{{json body here}}

#### Body 參數

|Name|In|Type|Required|Description|
|---|---|---|---|---|
{{body table here}}

### 回應

|Status|Meaning|Description|Schema|
|---|---|---|---|
{{Responses table here}}

#### 回應參數

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
{{Response Schema table here}}

#### 範例回應：

> 200 Response

{{json body here}}

```