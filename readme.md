# GoogleAppsScript(GAS)でよく使うメソッド集

GASでシステム構築する場合、よく使う関数やAPIがあります。  
私は忘れやすいので毎回毎回調べてしまっているので

この際、個人的に使うメソッドをまとめよう！という事でまとめました。

必要に応じて利用してください。

---

## メソッド一覧

**更新履歴**

2019-05-26：新規作成

---

### 【gas_method_set.js】

GAS専用のメソッド

* doGet：webアプリケーションとして使用する場合
* get_script_url：webアプリケーションのURLを取得
* get_user_info：GAS実行者のアカウント情報を取得
* format_date：日付のフォーマット方法
* sort：配列データの並び替え
* filter：配列データの絞込み
* spreadSheet_flush：スプレッドシートの内容を最新の状態に更新
* send_mail：メール送信

---

### 【js.html】

フロントからGASの処理を実行する方法

---

### 【copy_file.js】

指定のファルダにファイルをコピー方法

---

### 【create_folder.js】

指定したフォルダの中にフォルダを複数作成する方法

---

### 【create_pdf_spreadsheet.js】

スプレッドシートの特定のシートをpdfに変換する方法

---

### 【get_drive_img_base64.js】

googleDriveに保存している画像をwebアプリの画面上に表示する方法  
※Gsuiteの組織閲覧制限を回避する方法

---

### 【get_drive_name_id.js】

特定のフォルダ内の全フォルダまたは全ファイルの名称、driveIDを取得する方法

---

### 【get_form_input.js】

googleアンケートフォームに回答の内容を取得する方法  
実行するにはフォーム送信時のトリガーを設定する必要があります。
