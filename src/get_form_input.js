/**************************************************************************
 * googleフォームに回答内容を取得
 * 対象のフォームのスクリプトに埋め込み、トリガー（フォーム送信時）に設定する必要あり
 * @param e 質問内容と回答内容　等
 * @returns {JSON}
 *                {String} title : アンケートタイトル
 *                {String} address : 回答者アドレス
 *                {String} response
 *                        {
 *                          {String} question : 質問内容
 *                          {String or Arrays} anser : 回答内容  (チェックボックスのみ配列)
 *                        }
 **************************************************************************/
function get_form_input(e)
{
  //googleフォームの内容をアクセス
  FormApp.getActiveForm();

  //タイトル、回答アドレスを格納
  var result_json ={
    "title" : e.source.getTitle()
    ,"address" : e.response.getRespondentEmail()
    ,"response" : []
  }

  //質問、回答一覧を取得
  var itemResponses = e.response.getItemResponses();

  //各、質問内容と回答内容を格納
  itemResponses.forEach(function(itemResponse, index)
  {
    var set_array = {
      "question" : itemResponse.getItem().getTitle()
      ,"anser" : itemResponse.getResponse()
    }
    result_json.response.push(set_array) ;
  })

  return JSON.stringify(result_json);
}
