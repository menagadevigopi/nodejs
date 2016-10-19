var data=[];
$.get('/postdata',function(datas){
	 data=datas;
	 for(i=0;i<data.length;i++){
	 var div=$("<div class='book'></div>");
	 div.append("<h3>"+data[i].name+"</h3>");
	 div.append("<p class='content'>"+data[i].content+"</p>");
	 div.append("<p class='date'>"+data[i].date+"</p>");
	 div.append("<p class='author'>"+data[i].author+"</p>");
	 $('#blogs').append(div);
}
		
});


$('#addpost').hide();

 function addpost(){
		$('#addpost').show();

		}
