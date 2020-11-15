$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var salonTitleElement = document.getElementById("salon-title")
    salonTitleElement.innerText = urlParams.get("name");
    loadSalonDetails(urlParams.get("id"));
});

function loadSalonDetails(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-details.php", data, function (data, status) {
        var salonData = JSON.parse(data);
        var timeBlock = document.getElementById("time-details");
        // JS to assign salon data to home page template
        timeBlock.innerHTML += salonData[0].startDay + " - " + salonData[0].endDay + "<br/>" +
            salonData[0].startTime + " - " + salonData[0].endTime;
        var locationBlock = document.getElementById("location-details");
        locationBlock.innerHTML += '                            <li><i class="fas fa-map-marker-alt"></i> <span>' + salonData[0].streetAddress + '</span>\n' +
            '                            </li>'
        loadSalonCategories(id)
    });
}

function loadSalonCategories(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-categories.php", data, function (data, status) {
        var salonData = JSON.parse(data);
        var categoryRow = document.getElementById("category-list");
        // JS to assign category data to salon page template
        for (var i = 0; i < salonData.length; i++) {
            categoryRow.innerHTML += salonData[i].categoryName;
        }
        loadSalonImages(id);
    });
}

function loadSalonImages(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-images.php", data, function (data, status) {
        console.log("details response" + data);
        var salonData = JSON.parse(data);
        var salonHTMLrow = document.getElementById("product-list-row");
        // JS to assign salon data to home page template
        loadSalonMenu(id);
    });
}

function loadSalonMenu(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-menus.php", data, function (data, status) {
        currentOrder = new Array();
        selectedSalonMenu = JSON.parse(data);
        var salonHTMLrow = document.getElementById("menu-table");
        // JS to assign salon data to home page template
        for (var i = 0; i < selectedSalonMenu.length; i++) {
            salonHTMLrow.innerHTML += '                                        <tr class="menu-not-selected" onclick="addToCart(' + i + ')">' +
                '                                            <td>' + selectedSalonMenu[i].productDescription + '</td>\n' +
                '                                            <td>R' + selectedSalonMenu[i].price + '</td>\n' +
                '                                            <td>' + selectedSalonMenu[i].treatmentLength + 'min</td>\n' +
                '                                        </tr>'
        }
        loadSalonTechnicians(id);
    });
}

function loadSalonTechnicians(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-technicians-for-salon.php", data, function (data, status) {
        selectedSalonTechnicians = JSON.parse(data);
        var techSelect = document.getElementById("tech-select");
        for (var i = 0; i <selectedSalonTechnicians.length; i++){
            techSelect.innerHTML += '<option data-display="'+selectedSalonTechnicians[i].technicianName+'" value="'+selectedSalonTechnicians[i].id + '">'+selectedSalonTechnicians[i].technicianName+'' +
                ' '+selectedSalonTechnicians[i].technicianNumber+' </option>\n';
        }
        $('.nice-select').niceSelect('update');
    });
    $('.ft-preloader').removeClass("active");
}

function selectTime() {

}

function addToCart(index) {
    var selectedRow = document.getElementById("outside-menu-table").rows[index+1];
    if (selectedRow.classList.contains("menu-not-selected") == true) {
        currentOrder.push(selectedSalonMenu[index]);
        selectedRow.classList.replace("menu-not-selected", "menu-selected");

    } else {
        var deleteIndex = currentOrder.indexOf(selectedSalonMenu[index]);
        currentOrder.splice(deleteIndex, 1);
        selectedRow.classList.replace("menu-selected", "menu-not-selected");
    }
}

$(function(){
});
