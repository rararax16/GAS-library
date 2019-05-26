/*****************************************************************
 *googleDriveに保存している画像をHTMLに表示できるようにする処理
 *画像をBase64方式に変換
 * DriveAPIをonにする必要あり
 *@param  {String} img_id   driveの画像ID
 *@returns {src}  imgタグで使用できるsrc
 *****************************************************************/
function get_img_base64(img_id)
{
  //idからファイルを取得
  var res = DriveApp.getFileById(img_id);

  //google認証情報を取得
  var accesstoken = ScriptApp.getOAuthToken();

  //必要な情報をまとめて、画像をbase64形式に変更
  var fetchArgs     = {};
  fetchArgs.headers = { 'Authorization': 'Bearer ' + accesstoken };
  fetchArgs.method = 'GET';
  fetchArgs.muteHttpExceptions = true;
  var image         = UrlFetchApp.fetch(res.getDownloadUrl(), fetchArgs).getContent();

  //jsonの金型
  var response = {};

  //生成したimageから画像をBase64方式へ
  var dataurl        = 'data:image/jpeg;base64,' + Utilities.base64Encode(image);
  response.image    = dataurl;

  return response.image;
}
