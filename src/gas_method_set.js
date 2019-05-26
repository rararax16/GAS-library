 /***************************************************************
 *webアプリケーションとして使用する場合の決まりのやり方
 ***************************************************************/
function doGet(e)
{
    var htmlName = "index" ;

    /*+++++++++++++++++++++++++++++++++
     + [addMetaTag] : metaタグ
     + [setTitle] : webブラウザのタイトル名
     +++++++++++++++++++++++++++++++++*/
    return HtmlService.createTemplateFromFile(htmlName).evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,initial-scale=1.0')
        .setTitle("GoogleAppsScript")
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/***********************************************
 *WEBアプリケーションのURLを取得
 **********************************************/
function get_script_url()
{
  var url = ScriptApp.getService().getUrl();
}

 /*****************************************************************
 * GAS実行者のアドレス、フルネームを取得
 *****************************************************************/
function get_user_info()
{
  //メールアドレス
  var email = Session.getActiveUser().getEmail() ;

  //苗字
  var last_name = ContactsApp.getContact(email).getFullName() ;

  //名前
  var first_name = ContactsApp.getContact(email).getGivenName() ;

  //苗字名前
  var full_name = ContactsApp.getContact(email).getFullName() ;

}

/***********************************************
 *日付のフォーマット
 **********************************************/
function format_date()
{
  var date = new Date() ;

  //フォーマット
  var now = Utilities.formatDate(date, "JST", "yyyy/MM/dd HH:mm") ;
}

/***********************************************
 * 配列の並び替え
 **********************************************/
function sort()
{
  //テストデータ
  var data = [1, 7, 3, 2, 9, 5, 0, 4, 6] ;

  //昇順
  data.sort(function(a , b)
  {
    if( a[3] > b[3] ) return -1;
    if( a[3] < b[3] ) return 1;
    return 0;
  })

  //降順
  data.sort(function(a , b)
  {
    if( a[3] > b[3] ) return -1;
    if( a[3] < b[3] ) return 1;
    return 0;
  })
}

/***********************************************
 * 配列の絞り込み
 **********************************************/
function filter()
{
  //テストデータ
  var data = [1, 7, 3, 2, 9, 5, 0, 4, 6] ;

  //絞り込み（例：５以上のみに絞り込み）
  var data_filter = data.filter(function(val)
  {
    var result = false ;
    if(val >= 5)
    {
      result = true ;
    }

    return result
  })
}

/************************************************************************
 * スプレッドシートの再描画
 * GASでpdf作成時、動的にシートのセルを更新し作成する際に必須
 * このメソッドを実行しないと更新が反映されずにpdfを作成する可能性あり
 ************************************************************************/
function spreadSheet_flush()
{
  SpreadsheetApp.flush();
}

/***************************************
 * メールの送信
 **************************************/
function send_mail()
{

  //googleDriveのファイルを添付する場合に使用
  var drive_file = DriveApp.getFileById("xxxxxxxxxxx").getBlob()

  //メール送信実行
  MailApp.sendEmail(
    {
      to  : "xxxxx@xxx.ne.jp"    //複数指定の場合は配列
      ,name : "送信名変更"       //送信者名を変更
      ,cc  : "yyyyy@yyy.ne.jp"   //複数指定の場合は配列
      ,bcc : "yyyyy@yyy.ne.jp"   //複数指定の場合は配列
      ,subject : "件名"
      ,body : "本文"
      ,htmlBody : "<p>装飾文字</p>"                        //htmlが表示できない場合、[body]が表示される
      ,attachments: [drive_file.setName("添付ファイル名")]    //googleDriveに保存しているファイルを添付
      ,noReply : false            //返信不可のメールを送信したい場合は[true]  noreply@[ドメイン] で送信 nameは無効になる
    }
  )
}
