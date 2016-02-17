<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type='text/javascript' src="http://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.1/jquery.xdomainrequest.min.js"></script>
 
</head>
<body>
 
<!-- <input id="getdata" type="button"  value="Send X GET"/> -->
<input id="postdata" type="button" value="Send X POST" />
 
<script>
$(document).ready(function()
{
    var contentType ="application/x-www-form-urlencoded; charset=utf-8";
 
    if(window.XDomainRequest)
        contentType = "text/plain";
 // POST Method
    $("#postdata").click(function()
    {
        $.ajax({
         url:"http://localhost:3000/data/sales/",
         data:{session:'874da200a191f87ea96758e8929f79ef',saleid:675515},
         type:"POST",
         dataType:"json",  
         // contentType:contentType,   
         success:function(data)
         {
            var pj = data[0].id;
            var pj1 = JSON.stringify(data);
            alert("Data from Server"+ pj1);
         },
         error:function(jqXHR,textStatus,errorThrown)
         {
            alert("You can not send Cross Domain AJAX requests: "+errorThrown);
         }
        });
 
    });
 // GET Method
    // $("#getdata").click(function()
    // {
    //     $.ajax(
    //     {
    //      url:"http://localhost:3000/data/sales/cd8ab76483ab5f7ddfb3a297229f6bdb/675515",
    //      dataType:"json",
    //      // contentType:contentType,
    //      success:function(data)
    //      {
    //         alert("Data from Server"+JSON.stringify(data));
    //      },
    //      error:function(jqXHR,textStatus,errorThrown)
    //      {
    //         alert("You can not send Cross Domain AJAX requests : "+errorThrown);
    //      }
    //     });
 
    // });
 
});
</script>
</body>
</html>