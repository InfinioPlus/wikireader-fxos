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
        
        displayIntro(intro_url);
        makeSidebar(intro_url, sections_url, page);
    }
    
    function displayIntro(intro_url){
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
    
    function makeSidebar(intro_url, sections_url, page){
        $('#sidebar-content').empty();
        
        var section_ids = [];
        var sidebar_html = '<li class="sidebar-brand"><a href="#" class="sd">Wikipedia</a></li>';
        
        // Adding main page (intro section)
        sidebar_html += '<li>';
        sidebar_html += '   <a href="#" id="intro-section>Main</a>"';
        sidebar_html += '</li>';
        
        $.ajax({
            url: sections_url,
            dataType: "jsonp",
            success: function(data){
                for (var i=0; i<data.parse.sections.length; i++){
                    var section_id = 'section-' + data.parse.sections[i].index;
                    
                    sidebar_html += '<li>';
                    sidebar_html += '   <a href="#" id="' + section_id + '">' + data.parse.sections[i].number + ' ' + data.parse.sections[i].line + '</a>';
                    sidebar_html += '</li>';
                    
                    section_ids.push(section_id);
                }
                
                $('#sidebar-content').append(sidebar_html);
                addAjaxCalls(page, section_ids);
            }
        });
    }
    
    function addAjaxCalls(page, section_ids){
        for (var i=0; i<section_ids.length; i++){
            (
                function(){
                    var id = section_ids[i];
                    var section_page = page;
                    var index = section_ids[i].split('-')[1];
                    
                    $('#' + id).click(function(){
                        var section_url = 'https://en.wikipedia.org/w/api.php?format=json&action=parse&prop=text&disabletoc=true&disableeditsection=true&page=' + section_page + '&section=' + index;
                        
                        $.ajax({
                            url: section_url,
                            dataType: "jsonp",
                            success: function(data){
                                // Trick: get element identifier using for each
                                var el;
                                for (el in data.parse.text){
                                    // TODO: display data
                                    var html = data.parse.text[el];
                                    alert(html);
                                }
                            }
                        });
                    });
                }
            )();
        }
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