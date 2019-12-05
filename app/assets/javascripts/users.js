$(function() {
  function  buildHTML(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
              $('#user-search-result').append(html);
  }
  function  nobuildHTML(){
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`
      $('#user-search-result').append(html);
  }
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    let input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      users.forEach(function(users) {
        var html =buildHTML(users);
      });
        if(users.length!==0){
        }else if(input.lengeth) {
        return false
        }else{
          nobuildHTML()
        }


    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });
});
$(function() {
function  buildHTML(user){
  var html = `
          <div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${user.id}'>
            <p class='chat-group-user__name'>${user.name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>
          `
  $("#chat-group-users.js-add-user").append(html)
}
$(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function(e) {
  e.preventDefault();
  var name=$(this).data('user-name');
  var id=$(this).data('user-id');
  $(this).parent().remove();
  console.log(this)
  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: name,id },
    dataType: 'json'
  })
  .done(function(users){
    console.log(users)
    $("#user-search-result").empty();
    users.forEach(function(users) {
      var html =buildHTML(users);
  });
});
});
});
$(document).on("click",".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn",function(e) {
  e.preventDefault();
  var name=$(this).data('user-name');
  var id=$(this).data('user-id');
  $(this).parent().remove();
  console.log(id,name)
  console.log(this)
$.ajax({
  type: 'GET',
  url: '/users/edit',
  data: { keyword: name,id },
  dataType: 'json'
})
.done(function(users){
  console.log(users)
  $("#user-search-result").empty();
});
});
