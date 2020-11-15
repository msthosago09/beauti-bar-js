$(window).on('load', function(){
    state.window_width = $(window).width();
    if(state.window_width  > 991){
        state.stickyHeader();
    }
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var salonTitleElement = document.getElementById("salon-title")
    salonTitleElement.innerText = urlParams.get("name");
    $('.ft-preloader').removeClass("active");
});
