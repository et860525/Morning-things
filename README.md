# ☕ Morning Things

## Weather component
![layered-architecture.png](https://github.com/et860525/Morning-things/blob/main/cover.png)

## News component
![layered-architecture.png](https://github.com/et860525/Morning-things/blob/main/api-news.png)

打開網站就能看到今天一早所有的大小事的專案。

This project that covers all the significant events of today from early morning.

## Task Lists

- [ ] NavBar
  - [x] Brand
	- [ ] Router
- [x] Weather Card
  - [x] Real API from [氣象資料開放平台](https://opendata.cwb.gov.tw/index)
- [ ] News
- [ ] Auth

## Project Setup

```sh
npm install
```

### Add You API_KEY

- If you don't have API KEY: Click [氣象資料開放平台](https://opendata.cwb.gov.tw/index) and sign up.

- If you have API Key: Create a file `.env` in root

```text
VITE_API_KEY=<Your API KEY>
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
