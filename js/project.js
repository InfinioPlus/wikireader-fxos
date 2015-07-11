$(document).ready(function(){

	$('#go').click(function(){
		var $wikiElem = $('#search-results');
		var query = $('#query').val();
		
	 	var wikiurl = 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#query').val();

	    $.ajax({
	        url: wikiurl,
	        dataType: "jsonp",
	        success: function(data){
	            for (var i = 0; i <= data.query.search.length; i++) {
                    var element = '';
                    element += '<div class="row rw1"><div class="col-xs-12 col1 well" id="posts">';
                    element += '<h4>' + data.query.search[i].titlte +'</h4>';
                    element += '<p>' + data.query.search[i].snippet + '</p>';
                    element += '<button class="btn btn-success">Read More..</button>';
                    element += '</div></div><hr>';
                    
	                $wikiElem.append(pageLink);
	            };
	        }
	    });
	});
    
	$('#query').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#go').click();//Trigger search button click event
        }
    });
    
    var start = true;
    // $('#wrapper').hide();
    $('#wrapper').addClass("toggled");
    $('#rem-btn').click(function(){
    	if(start){
	    	start = false;
	    	$("#wrapper").toggleClass("toggled");
	    }
	    else
	    {
	    	start = true;
	    	$("#wrapper").toggleClass("toggled");
	    }
    });
});