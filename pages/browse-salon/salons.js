$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    $.get("http://thebeautibar.com/assets/php/fetch-salons.php", function (data, status) {
        console.log("data fetched");
        var salonData = JSON.parse(data);
        var salonHTMLrow = document.getElementById("browse-salon-row");
        salonArray = salonData;
        // JS to assign salon data to home page template
        for (var i = 0; i < salonArray.length; i++) {
            var tmpSalonName = salonArray[i].salonName;
            var tmpAddress = salonArray[i].streetAddress;
            salonHTMLrow.innerHTML += '                                        <div class="col-xl-4 col-sm-6 mb--50">\n' +
                '                                            <div class="ft-product">\n' +
                '                                                <div class="product-inner">\n' +
                '                                                    <div class="product-image">\n' +
                '                                                        <figure class="product-image--holder">\n' +
                '                                                            <img onclick="selectSalon('+i+')" src="../../assets/img/products/prod-04-270x300.jpg" alt="Product">\n' +
                '                                                        </figure>\n' +
                '                                                        <div class="product-action">\n' +
                '                                                        </div>\n' +
                '                                                    </div>\n' +
                '                                                    <div class="product-info">\n' +
                '                                                        <div class="product-category">\n' +
                '                                                            <strong>'+tmpSalonName+'</strong>\n' +
                '                                                        </div>\n' +
                '                                                        <h3 class="product-title"><i class="fas fa-map-marker-alt"></i> ' + tmpAddress + '</h3>\n' +
/*                '                                                        <div class="product-info-bottom">\n' +
                '                                                            <div class="product-price-wrapper">\n' +
                '                                                                <span class="money">$150</span>\n' +
                '                                                            </div>\n' +
                '                                                            <a href="../../cart.html" class="add-to-cart pr--15">\n' +
                '                                                                <i class="la la-plus"></i>\n' +
                '                                                                <span>Book</span>\n' +
                '                                                            </a>\n' +
                '                                                        </div>\n' +*/
                '                                                    </div>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                        </div>\n';
        }
        ;
        getLocation();
        $('.ft-preloader').removeClass("active");
        console.log(window.location.href);
    });
});

var slots;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log(position.coords.latitude);
    $('.ft-preloader').removeClass("active");
}

function selectSalon(index) {
    console.log("selected index " + index);
    window.location.href = '../salon-details/salon.html?name='+salonArray[index].salonName+'&id='+salonArray[index].id;
}

