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
                    
                    var title = data.query.search[i].title;
                    // Adding click listener to dinamically added buttons (with closures)
                    (
                        function(){
                            var id=i;
                            var page=title;
                            
                            $('#read-' + id).click(function(){
                                displayPage(page);
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
    
    function displayPage(page){
        var sections_url = 'http://en.wikipedia.org/w/api.php?action=parse&prop=sections&format=json&page=' + page;
        var intro_url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + page;
        
        $.ajax({
            url: intro_url,
            dataType: "jsonp",
            success: function(data){
                // Trick: get page number using for each
                var el;
                for (el in data.query.pages){
                    // TODO: display data as "main page"
                    var title = data.query.pages[el].title;
                    var text = data.query.pages[el].extract;
                }
            }
        });
    }

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