$(document).ready(function(){
    var search_html = '';

    $('#go').click(function(){	
        // clearing cached html data
        search_html = '';
        
        var wikiurl = 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#query').val();

        $.ajax({
            url: wikiurl,
            dataType: "jsonp",
            success: function(data){
                $('#search-results').empty();
                
                for (var i = 0; i <= data.query.search.length; i++) {
                    // Building HTML based on search results
                    var element = '';
                    element += '<div class="row rw1"><div class="col-xs-12 col1 well" id="posts">';
                    element += '<h4>' + data.query.search[i].title +'</h4>';
                    element += '<p>' + data.query.search[i].snippet + '</p>';
                    element += '<a href="#" class="btn btn-success" id="read-' + i + '">Read More..</a>';
                    element += '</div></div><hr>';
                    
                    search_html += element;

                    $('#search-results').append(element);
                    
                    // Adding click listener to dinamically added buttons (with closures)
                    (
                        function(){
                            var id=i;
                            $('#read-' + id).click(function(){
                                alert('Called read-' + id);
                            });
                        }
                    )();
                };
            }
        });
    });

    $('#query').keypress(function(e){
        // Enter key pressed
        if(e.which == 13){
            // Trigger search button click event
            $('#go').click();
        }
    });

    var start = true;
    // $('#wrapper').hide();
    $('#wrapper').addClass("toggled");
    $('#rem-btn').click(function(){
        if(start){
            start = false;
            $("#wrapper").toggleClass("toggled");
        } else{
            start = true;
            $("#wrapper").toggleClass("toggled");
        }
    });
    
});