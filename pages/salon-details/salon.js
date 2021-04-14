var possibleTimeArray = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
var timeTiles;
var tmpAppointment = {};
var totalTime = 0;

$(window).on('load', function () {
    // $( "#datepicker" ).datepicker();
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var salonTitleElement = document.getElementById("salon-title");
    salonTitleElement.innerText = urlParams.get("name");
    var dateControl = document.querySelector('input[type="date"]');
    dateControl.value = Date.now().toString();
    dateControl.min = Date.now().toString();
    dateControl.max = (Date.now() + 7).toString();
    console.log("date control" + dateControl.min);
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
        loadSalonTimes(id,salonData[0].startTime, salonData[0].endTime);
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

function loadSalonTimes(salonIndex,startTime, endTime) {
    var timeStartIndex = possibleTimeArray.indexOf(startTime);
    var timeEndIndex = possibleTimeArray.indexOf(endTime);
    timeTiles = possibleTimeArray.slice(timeStartIndex, timeEndIndex);
    var timeBlox = document.getElementById("time-flex");
    for (var i = 0; i < timeTiles.length; i++) {
        timeBlox.innerHTML += '<div class="time-tile" id="time-tile-'+i+'" onclick="selectTime('+i+')"> '+ timeTiles[i] + '</div>';
    }
}

var selectedDate;
function loadSalonAppointments(salonIndex) {
/*    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var searchDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    var data = {
        appDate: searchDate,
        salonId: urlParams.get("id"),
        technicianId: selectedTech
    };*/
    loadUnavailableAppointments(salonIndex);

    /*    $.get("http://thebeautibar.com/assets/php/fetch-salon-images.php", data, function (data, status) {
            console.log("details response" + data);
            var salonData = JSON.parse(data);
            var salonHTMLrow = document.getElementById("product-list-row");
            // JS to assign salon data to home page template
            loadUnavailableAppointments(salonIndex);
        });*/
}

function loadUnavailableAppointments(salonIndex) {
    $('.ft-preloader').removeClass("active");
/*    $.get("http://thebeautibar.com/assets/php/fetch-salon-images.php", data, function (data, status) {
        console.log("details response" + data);
        var salonData = JSON.parse(data);
        var salonHTMLrow = document.getElementById("product-list-row");
        // JS to assign salon data to home page template
        $('.ft-preloader').removeClass("active");
    });*/
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
        for (var i = 0; i < selectedSalonTechnicians.length; i++) {
            techSelect.innerHTML += '<option data-display="' + selectedSalonTechnicians[i].technicianName + '" value="' + selectedSalonTechnicians[i].id + '">' + selectedSalonTechnicians[i].technicianName + '' +
                ' ' + selectedSalonTechnicians[i].technicianNumber + ' </option>\n';
        }
        $('.nice-select').niceSelect('update');
        loadSalonAppointments(id);
    });

}

function selectTime(index) {
    console.log("selected time " + timeTiles[index]);
    slots = this.calculateSlots();
    var selectedBox = document.getElementById("time-tile-" + index);
    var boxArray = [];
    boxArray.push(selectedBox);
    for (var i = 1; i < this.slots; i++) {
        selectedBox = document.getElementById("time-tile-" + (index + i));
        boxArray.push(selectedBox);
    }
    for (var i = 0; i < boxArray.length; i++) {
        if (boxArray[i].classList.contains("slot-booked")) {
            return;
        }
    }
    console.log("slots "+slots);
    tmpAppointment.startTime = this.timeTiles[index];
    tmpAppointment.endTime = this.timeTiles[index + this.slots];
    for (var i = 0; i < this.timeTiles.length; i++) {
        var tmpBox = document.getElementById("time-tile-" + i);
        if (tmpBox.classList.contains("slot-booked") || tmpBox.classList.contains("slot-unavailable")) {
            continue;
        }
        tmpBox.style.background = "#FFC0CB";
        tmpBox.style.color = "#000000";

        tmpBox.classList.replace("slot-selected", "not-booked");
    }
    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].style.background = "#80304d";
        boxArray[i].style.color = "#ffffff";

        boxArray[i].classList.replace("not-booked", "slot-selected");
    }


}

var selectedTech;

$("#tech-select").change(function () {
    var selectedBox = document.getElementById("tech-select");
    selectedTech = selectedBox.selectedIndex;
    console.log("Handler for .change(). selectedTech id "+selectedTech);
});

function calculateSlots() {
    return this.totalTime / 30;
}

function addToCart(index) {
    var selectedRow = document.getElementById("outside-menu-table").rows[index + 1];
    if (selectedRow.classList.contains("menu-not-selected") == true) {
        this.totalTime = parseInt(this.totalTime) + parseInt(selectedSalonMenu[index].treatmentLength);
        console.log("total time "+this.totalTime);
        currentOrder.push(selectedSalonMenu[index]);
        selectedRow.classList.replace("menu-not-selected", "menu-selected");
        console.log("currentOrder "+currentOrder.toString());
    } else {
        this.totalTime = parseInt(this.totalTime) - parseInt(selectedSalonMenu[index].treatmentLength);
        var deleteIndex = currentOrder.indexOf(selectedSalonMenu[index]);
        currentOrder.splice(deleteIndex, 1);
        console.log("currentOrder deleted "+currentOrder.toString());
        selectedRow.classList.replace("menu-selected", "menu-not-selected");
    }
}

