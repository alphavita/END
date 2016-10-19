$(function(){
    $.support.cors = true;
    var gridItem = $('.grid-item');
    var searchForm = $('.search-area');
    var searchButton = $('.search-button');
    var defaultQuery=['sea', 'fox', 'london','Relaxation', 'Travelling', 'africa', 'footbal', 'biathlon', 'fashion', 'circus', 'mobile', 'dog', 'Hollywood', 'flower' ];
     // var defaultQuery=['00', '1', '2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13' ];
	var rand=Math.floor(Math.random()*defaultQuery.length);
    var api = 'https://pixabay.com/api/?key=3225875-78b247f92a47a24f14259a8bd&q='+ defaultQuery[rand] +'&image_type=photo&min_width=300&min_height=200&per_page=7';
    console.log ('defaultQuery:', defaultQuery[rand]);
    var shuffle = function(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
    }
}

        $.getJSON(api, function (data) {
            var image = data.hits

            shuffle(image);

            gridItem.each(function(index){
                $(this).css({'background-image':'url(' + image[index].webformatURL + ')','background-size':'cover'})
                        .append('<p class="image-item">'+ image[index].tags +'</p>');
            })
        });
        searchButton.on('click', function(){
            if(searchForm.val().length>0){
                var query = searchForm.val();
                // console.log(query);
                var api = 'https://pixabay.com/api/?key=3225875-78b247f92a47a24f14259a8bd&q=' + query + '&image_type=photo&min_width=300&min_height=200&per_page=100';
                $.getJSON(api, function (data) {
                    var image = data.hits

                    shuffle(image);

                    $('.image-item').remove();
                    gridItem.each(function(index){
                        $(this).css({'background-image':'url(' + image[index].webformatURL + ')','background-size':'cover'})
                                .append('<p class="image-item">'+ image[index].tags +'</p>');
                    })
                });
            }
        });
        searchForm.keypress(function(e) {
            if(e.which == 13){
                if(searchForm.val().length>0){
                    var query = searchForm.val();
                    console.log(query);
                    var api = 'https://pixabay.com/api/?key=3225875-78b247f92a47a24f14259a8bd&q=' + query + '&image_type=photo&min_width=300&min_height=200&per_page=100';
                    $.getJSON(api, function (data) {
                        var image = data.hits

                        shuffle(image);
                        $('.image-item').remove();
                        gridItem.each(function(index){
                            $(this).css({'background-image':'url(' + image[index].webformatURL + ')','background-size':'cover'})
                                    .append('<p class="image-item">'+ image[index].tags +'</p>');
                        })
                    });
                }
            }
        })
})

