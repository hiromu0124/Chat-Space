$(function(){
  function buildHTML(message){
    if (message.image) {
      var image=message.image
    }else{
      var image=""
    }
        var html =
        `<div class="messages" data-message-id="${message.id}">
          <div class="messages__box">
            <div class="messages__box__user">
            ${message.user_name}
            <div class="messages__box__date">
            ${message.created_at}
              <div class="messages__box__text">
              <div class="messages__text"></div>
              ${message.content}
              </div>
            </div>
            </div>
          </div>
      <img src=${image}>
        </div>`
    return html
  }
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.messages:last').data("message-id");
    function scroll(){
      $('.messeges').animate({scrollTop: $('.messeges')[0].scrollHeight}, 'fast');
      }
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messeges) { 
      var insertHTML = '';
      messeges.forEach(function (message){
        insertHTML = buildHTML(message)
      });
      $('.messages:last').append(insertHTML);
      scroll();
      })
    .fail(function () {
      alert('error');
    });
    };
  };
function scroll(){
  $('.messeges').animate({scrollTop: $('.messeges')[0].scrollHeight}, 'fast');
}
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url =$(this).attr("action");
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData , 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message)
      $('.messeges').append(html);
      $('.message__send').prop('disabled', false);
      $("form")[0].reset();
      scroll();
      
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.message__send').prop('disabled', false);
  });
});
setInterval(reloadMessages, 1000);
});