$(document).ready(function(){

	$('#go').click(function(){
		var $wikiElem = $('#posts');
		var query = $('#query').val();
		
	 	var wikiurl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=';
	    var wikiUrl = wikiurl + query;

	    var wikiRequestTimeout = setTimeout(function(){
	        $wikiElem.text('Could not load wikipedia links');
	    }, 8000);

	    $.ajax({
	        url: wikiUrl,
	        dataType: "jsonp",
	        success: function(data){
	            for (var i = 0; i <= data[1].length - 1; i++) {
	                var pageLink = '<li><a href="' + data[3][i] + '">' + data[1][i] + '</a></li>';
	                $wikiElem.append(pageLink);
	            };

	            clearTimeout(wikiRequestTimeout);
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