/******************************************************
 * 指定のファルダにファイルをコピーする処理
 * DriveAPIをonにする必要あり
 * @param {JSON}
 *               {String} locate_folder_id  コピー先フォルダid
 *               {String} file_id  コピー元ファイルid
 *               {String} copy_name コピー後のファイル名
 ******************************************************/
function copy_file(get_json)
{
  //引数の情報を取得
  var json = JSON.parse(get_json)
  var locate_folder_id = json.locate_folder_id
  var file_id = json.file_id
  var copy_name = json.copy_name ;

  //ファイルオブジェクトとフォルダーオブジェクトを取得
  var file = DriveApp.getFileById(file_id) ;
  var locate_folder = DriveApp.getFolderById(locate_folder_id) ;

  //ファイルを指定フォルダにコピー
  file.makeCopy(copy_name, locate_folder);

}
