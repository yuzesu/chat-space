$(function(message){

  function buildHTML(message){
    
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message_content">`
    var html =  `<div class="messages" data-message-id="${message.id}">
                    <p class="character">
                      ${message.name}
                        <span class="date">
                          ${message.date}
                        </span>
                    </p>
                      <p class="message">
                        ${message.content}
                    </p>
                    <p class="message_content">
                      ${imagehtml}
                    </p>
                  </div>`;
    return html;
  }

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.messages:last').data("message-id")
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: "json",
        data: {last_id: last_message_id}
      })
      .done(function(messages){
        var insertHtml = '';
        messages.forEach(function(message){
          insertHtml = buildHTML(message);
          $('.message_area').append(insertHtml);
        })
        getScroll();
      })
      .fail(function(){
        alert('error')
      });
    }
  };
  setInterval(reloadMessages, 5000);

  function getScroll() {
    $('.message_area').animate({ scrollTop: $('.message_area')[0].scrollHeight });
  }


  $('#new_form').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: './messages',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      getScroll();
      var html = buildHTML(data);
      $('.message_area').append(html);
      $('#new_form')[0].reset("");
      $('.message_form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });
});

