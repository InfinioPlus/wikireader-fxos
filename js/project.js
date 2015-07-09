$(document).ready(function(){

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
    var start = true;
    $('#rem-btn').click(function(){
    	if(start){
	    	$('#rem-btn').removeClass('btn-danger').addClass('btn-warning');
	    	$('#glyph').removeClass('glyphicon-remove-circle').addClass('glyphicon-align-justify');
	    	start = false;
	    }
	    else
	    {
	    	$('#rem-btn').removeClass('btn-warning').addClass('btn-danger');
	    	$('#glyph').removeClass('glyphicon-align-justify').addClass('glyphicon-remove-circle');	
	    	start = true;
	    }
    });
    
		

});