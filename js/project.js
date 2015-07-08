$(document).ready(function(){
	
$.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=google&prop=text&format=json&callback=?', function(json) {
            $('#posts').html(json.parse.text['*']);
            $("#posts").find("a:not(.references a)").attr("href", function(){ return "http://www.wikipedia.org" + $(this).attr("href");});
            $("#posts").find("a").attr("target", "_blank");
        });
		

});