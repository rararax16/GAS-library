/**********************************************************
 * スプレッドシートの特定のシートをpdfに変換し保存する処理
 * @param {JSON}
 *                {String} locate_folder_id　 :  pdf保存先フォルダ
 *                {String} sheet_id    : スプレッドシートid
 *                {String} sheet_name : シート名
 *                {String} pdf_name   : 保存後のpdf
 **********************************************************/
function create_pdf_spreadsheet(get_json)
{
  //引数の情報を取得
  var json = JSON.parse(get_json);
  var locate_folder_id = json.locate_folder_id ;
  var sheet_id = json.sheet_id ;
  var sheet_name = json.sheet_name ;
  var pdf_name  = json.pdf_name ;

  //フォルダオブジェクトを取得
  var folder = DriveApp.getFolderById(locate_folder_id);

  //スピレッドシートオブジュエクトを取得
  var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

  //スプレッドシートの内容を最新に更新
  SpreadsheetApp.flush();

  //pdf作成URL
  var url = "https://docs.google.com/spreadsheets/d/" + sheet_id + "/export?" ;

  //pdf作成情報
  var opts = {
    exportFormat: "pdf",
    format:        "pdf",
    size:           "A4",
    portrait:       "true",
    fitw:           "true",
    sheetnames:   "false",
    printtitle:      "false",
    pagenumbers: "false",
    gridlines:      "false",
  };

  var url_ext = [];

  // 上記のoptsのオプション名と値を「=」で繋げて配列url_extに格納
  for( optName in opts )
  {
    url_ext.push( optName + "=" + opts[optName] );
  }

  // url_extの各要素を[&]で結合
  var options = url_ext.join("&");

  //pdfに出力するURL　ローカル保存を行う場合、このURLを返す
  var export_url = url + options

  //google認証情報を取得
  var token = ScriptApp.getOAuthToken();

  // PDF作成
  var response = UrlFetchApp.fetch(export_url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
  });

  //作成したpdfの名前を設定
  var blob = response.getBlob().setName(pdf_name + '.pdf');

  //　PDFを指定したフォルダに保存
  folder.createFile(blob);

return export_url

}
