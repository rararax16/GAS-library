/**************************************************************
 * 特定のフォルダ内に複数のフォルダを作成する処理
 * DriveAPIをonにする必要あり
 * @param {JSON}
 *                {String} [locate_folder_id]    作成先フォルダID
 *                {Array} [folder_name_array]  作成ファルダ名
 **************************************************************/
function create_folder(get_json)
{
  var json = JSON.parse(get_json) ;
  var locate_folder_id  = json.locate_folder_id
  var folder_name_array = json.folder_name_array

  var locate_folder = DriveApp.getFolderById(locate_folder_id);

  folder_name_array.map(function(value)
  {
    locate_folder.createFolder(value);
  })
}
