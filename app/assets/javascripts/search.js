$(function(){
  $(document).on("click",".user-search-add",function(){
    var user_id = $(this).data('user-id');
    var user_name =$(this).data(user-name);
    selectUser(user_id, user_name);
    $(this).parent().remove();
  })

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })


  var search_list = $("#user-search-result");

  var select_list = $("#chat-group-users");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}"  data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function selectUser(user_id, user_name){
    var html =`<div class="chat-group-user clearfix">
                <input name='chat_group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${ user_name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove'>削除</a>
              </div>`
                
    select_list.append(html);
  }
  
 $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function() {
      alert(error);
    })
  });
});


