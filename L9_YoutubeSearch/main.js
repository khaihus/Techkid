$(document).ready(function () {
    let keyword;
    let pagetoken;
    let checkLoadPage = false;
    $('#search').on('submit', function (event) {
        event.preventDefault();
        keyword = $('#keyword').val();
        $("#result-list").empty();
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            method: 'GET',
            success: function (data) {
                console.log(data);
                console.log('Nextpagetoken: ' + data.nextPageToken);
                let numberItems = data.items.length;
                for (let i = 0; i < numberItems; i++) {
                    $("#result-list").append(`
                    <a id="videoItem" class="col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true" target="_blank">
                        <img src="${data.items[i].snippet.thumbnails.medium.url}" alt="">
                        <div class="video_info">
                            <h2 class="title">${data.items[i].snippet.title}</h2>
                            <p class="description">${data.items[i].snippet.description}</p>
                            <span>View >></span>
                        </div>
                    </a>
                    <br>
                `);
                }
                pagetoken = data.nextPageToken;
            },
            error: function () {
                console.log("fail!");
            }
        });
    });
    $(window).on("scroll",function(){
        if(($(document).height() - ($(window).height()+$(window).scrollTop())<300)&&checkLoadPage==false){
            checkLoadPage = true;
            $.ajax({
                
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pagetoken}`,
                method: 'GET',
                success: function (data) {
                    $('.lds-roller').css('opacity','1');
                    console.log(data);
                    console.log('Nextpagetoken: ' + data.nextPageToken);
                    let numberItems = data.items.length;   
                    for (let i = 0; i < numberItems; i++) {
                        $("#result-list").append(`
                        <a id="videoItem" class="col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true" target="_blank">
                            <img src="${data.items[i].snippet.thumbnails.medium.url}" alt="">
                            <div class="video_info">
                                <h2 class="title">${data.items[i].snippet.title}</h2>
                                <p class="description">${data.items[i].snippet.description}</p>
                                <span>View >></span>
                            </div>
                        </a>
                        <br>
                    `);
                    }
                    checkLoadPage = false;
                    pagetoken = data.nextPageToken;
                },
                error: function () {
                    console.log("fail!");
                }
            });
            
        }
    });

});
