# グルメ検索システムのフロントエンド
このリポジトリはフロントエンドのものになります。
バックエンドのリポジトリはhttps://github.com/akibo567/food-search-system-server
で、フロントとバックエンド両方の起動が必要となります。

また、事前にGeolocation APIとsessionStorageの利用を許可する必要があります。


## 概要
ぐるなびAPIを用いて、現在地周辺の飲食店を検索します。

## 動作環境
Node.js v18.14.1
Python 3.9.5

## 起動方法(フロントエンド)
1. `npm i`でパッケージをインストール
2. `npm start`でアプリが`http://localhost:3000/`に起動する

## 起動方法(バックエンド)
1. `flask run`でアプリが`http://127.0.0.1:5000`に起動する

