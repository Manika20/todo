
$("#courses").hide();
$("#button").click(function(e)
{
   e.preventDefault();
  
    $("#outer").hide();
    $.get("https://api.codingninjas.in/api/v3/courses",function(data)
    {
      var arr = data.data.courses.slice(0,12);
      console.log(arr);
      for(var i=0;i<arr.length;i++)
      {
        console.log(arr[i].classroom_icon_url);
            $('#courses').append('<div class="course"><img src=" '+arr[i].classroom_icon_url +'"  "/><div class="name">'+ arr[i].title+'</div><div class="type">'+arr[i].level+'</div></div>')
            
      }
     

    })
    $("#courses").show();

})
