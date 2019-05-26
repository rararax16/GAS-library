/******************************************************************************
 * Driveフォルダ内のフォルダまたはファイルの名称とDriveIDを取得
 * DriveAPIをonにする必要あり
 * @param  {JSON}
 *                {String} folder_id   参照するフォルダID
 *                {Number} get_type  [0]:フォルダ情報を取得    [1]:ファイル情報を取得
 *                {Number} sort		  [0]:降順    [1]:昇順
 * @returns {JSON}  result
 *                    {
 *                        {String} name : フォルダまたはファイルの名称
 *                        {String} id    : googleDriveに保存しているid
 *                    }
 *******************************************************************************/
function get_drive_name_id(get_json)
{
  //引数の情報を取得
  var json = JSON.parse(get_json)
  var folder_id = json.folder_id ;
  var get_type = json.get_type ;
  var sort = json.sort ;

  //引数のフォルダIDからフォルダーオブジェクトを取得
  var folder_obj = DriveApp.getFolderById(folder_id);

  //フォルダまたは、ファイル情報を保持する変数
  var  folder_contents = "";

  //フォルダ内のフォルダ情報を取得するか、ファイル情報を取得するか
  switch (get_type)
  {
    //フォルダ情報を取得
    case 0 :
      folder_contents = folder_obj.getFolders();
    break;

    //ファイル情報を取得
    case 1 :
      folder_contents = folder_obj.getFiles();
    break;
  }


  //結果を格納する変数
  var result = [];

  //フォルダまたはファイルの結果を取得できた場合、フォルダ名、DriveIDの順で変数に格納する
  if(folder_contents != "")
  {

    while(folder_contents.hasNext())
    {
      var content = folder_contents.next() ;

      var content_name = content.getName() ;
      var content_id = content.getId()

      //var set_array = [content_name, content_id] ;
      //result.push(set_array) ;
      var set_array = [content_name, content_id] ;
      result.push(set_array) ;
    }

  }

  //名前の [0]降順 [1]昇順 に並び替える
  switch(sort)
  {
    case 0 :
      result.sort(function(a, b){
        if( a > b ) return -1;
        if( a < b ) return 1;
        return 0;
      })
    break;

    case 1 :
      result.sort(function(a, b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
      })
    break;
  }

  //JSON形式に変換
  var set_json = {"result" : []} ;
  result.map(function(array)
  {
    var _json = {
      "name" : array[0]
      ,"id" : array[0]
    } ;
    set_json.result.push(_json) ;
  })

  var result_json = JSON.stringify(set_json)
  return result_json
}
