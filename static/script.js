$(document).ready(function(){ 
   $('.delete-btn').click(function(e){

  e.preventDefault();
  var url = $(this).attr('href');
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