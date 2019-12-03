$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      document.message_form.reset();
      var html = `<div class="messages">
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
      <img src=${message.image}>
      </div>`
    } else {
      var html = `<div class="messages">
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
      </div>`
    }
    return html
  }
  function scroll(){
    $('.messeges').animate({scrollTop: $('.messeges')[0].scrollHeight}, 'fast');
  }
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    console.log(this)
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
  })
});