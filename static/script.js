$(document).ready(function(){ 
  console.log("hitting delete button");
 
  $('.delete-btn').click(function(e){

  e.preventDefault();
  console.log($(this).attr('href'));
  var url = $(this).attr('href');
  console.log(url);
  var well = $(this).parent(); 
  console.log(well);
  $.ajax({
    url:url,
    method: 'DELETE'
  }).done(function(data){
  console.log("done", data);
    if (data.msg === 'success'){
      well.fadeOut(1000, function(){
        well.remove();
        });
      } else {
        console.log('data', data);
      }
    })
  });
}); 