$(function(message){

  function buildHTML(message){
    
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message_content">`
    var html =  `<div class="messages">
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

