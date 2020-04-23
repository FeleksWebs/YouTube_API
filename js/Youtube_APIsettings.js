function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          var YT_buttonID = 0
          //Api Works?
          if(!results){
           alert("API does not work. Limit of max search results within a day has been reached. ")
          }
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/Video_IFRAME.html", function(data) {
                //create ID for each video
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId ,"id":YT_buttonID}]));
                YT_buttonID++
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").height("100px"));
}

function init() {
    gapi.client.setApiKey("AIzaSyAHqHgf192P7wGvc6ZJzaT-EFEsPl5PvA8");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
