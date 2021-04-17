$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    techId = urlParams.get("id");
    techSalonId = urlParams.get("salonId");
    loadOpeningTimes();
    $('.ft-preloader').removeClass("active");
});

var techId;
var techSalonId;
var selectedDate = new Date();
var bookedTimes = [];
var bookedSlots = [];
var searchDate;

function loadSalonAppointments() {
    console.log("teSalonId " + techSalonId);
    console.log("techId " + techId);
    searchDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    var data = {
        salonId: techSalonId,
        appDate: searchDate,
        technicianId: techId
    };
    $.get("http://thebeautibar.com/assets/php/fetch-appointments-for-salon.php", data, function (data) {
        console.log("details response" + data);
        if (data == "No results") {
            loadUnavailableAppointments();
            return;
        }
        var salonData = JSON.parse(data);
        for (var i = 0; i < salonData.length; i++) {
            bookedTimes.push(salonData[i].startTime);
            bookedSlots.push(parseInt(salonData[i].slots));
        }
        var tmpTimeTiles = document.getElementsByClassName("admin-time-tile");

        for (var x = 0; x < bookedTimes.length; x++) {
            for (var p = 0; p < tmpTimeTiles.length; p++) {
                if (bookedTimes[x] == tmpTimeTiles[p].innerHTML.toString()) {
                    for (var z = 0; z < bookedSlots[x]; z++) {
                        tmpTimeTiles[p + z].classList.add("slot-booked");
                    }
                }
            }
        }
        loadUnavailableAppointments();
    });
}

var unavailableTimes = [];

function loadUnavailableAppointments() {
    console.log("fetching unavailable " + techSalonId);

    var data = {
        salonId: techSalonId,
        appDate: searchDate,
        technicianId: techId
    };
    $.get("http://thebeautibar.com/assets/php/fetch-unavailable-slots.php", data, function (data) {
        if (data == "No results") {
            $('.ft-preloader').removeClass("active");
            return;
        }
        var salonData = JSON.parse(data);
        for (var i = 0; i < salonData.length; i++) {
            unavailableTimes.push(salonData[i].startTime);
        }
        var tmpTimeTiles = document.getElementsByClassName("admin-time-tile");

        for (var x = 0; x < unavailableTimes.length; x++) {
            for (var p = 0; p < tmpTimeTiles.length; p++) {
                if (unavailableTimes[x] == tmpTimeTiles[p].innerHTML.toString()) {
                    tmpTimeTiles[p].classList.add("slot-unavailable");
                }
            }
        }
        $('.ft-preloader').removeClass("active");

    });
}

$("#date-selector-2").change(function () {
    $('.ft-preloader').addClass("active");
    selectedDate = new Date(document.getElementById("date-selector-2").value);
    loadSalonAppointments();
});

function loadOpeningTimes() {
    var data = {salonId: techSalonId};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-details.php", data, function (data, status) {
        var salonData = JSON.parse(data);
        var salonStartTime = salonData[0].startTime;
        var salonEndTime = salonData[0].endTime;
        var salonStartDay = salonData[0].startDay;
        var salonEndDay = salonData[0].endDay;

        var timeBlock = document.getElementById("time-details");
        // JS to assign salon data to home page template
        loadSalonTimes(salonStartTime, salonEndTime);
        loadSalonAppointments();
    });
}

var possibleTimeArray = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];

var adminTimeTiles;
function loadSalonTimes(startTime, endTime) {
    var timeStartIndex = possibleTimeArray.indexOf(startTime);
    var timeEndIndex = possibleTimeArray.indexOf(endTime);
    adminTimeTiles = possibleTimeArray.slice(timeStartIndex, timeEndIndex);
    var timeBlox = document.getElementById("time-flex-2");
    timeBlox.innerHTML = "";
    console.log("loading times "+ timeBlox.innerHTML);
    for (var i = 0; i < adminTimeTiles.length; i++) {
        timeBlox.innerHTML += '<div class="admin-time-tile" data-time-string="' + adminTimeTiles[i] + '" id="admin-time-tile-' + i + '" onclick="selectTime(' + i + ')">' + adminTimeTiles[i] + '</div>';
    }
}

var currentOrder = [];
