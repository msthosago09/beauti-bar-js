var possibleTimeArray = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
var timeTiles;
var tmpAppointment = {};
var totalTime = 0;

var salonId;
$(window).on('load', function () {
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
    salonId = urlParams.get("id");
    loadSalonDetails(salonId);
});

var tmpSelectedSalon;

function loadSalonDetails(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-details.php", data, function (data, status) {
        var salonData = JSON.parse(data);
        tmpSelectedSalon = salonData[0];
        var timeBlock = document.getElementById("time-details");
        // JS to assign salon data to home page template
        timeBlock.innerHTML += salonData[0].startDay + " - " + salonData[0].endDay + "<br/>" +
            salonData[0].startTime + " - " + salonData[0].endTime;
        loadSalonTimes(id, salonData[0].startTime, salonData[0].endTime);
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

function loadSalonTimes(salonIndex, startTime, endTime) {
    var timeStartIndex = possibleTimeArray.indexOf(startTime);
    var timeEndIndex = possibleTimeArray.indexOf(endTime);
    timeTiles = possibleTimeArray.slice(timeStartIndex, timeEndIndex);
    var timeBlox = document.getElementById("time-flex");
    for (var i = 0; i < timeTiles.length; i++) {
        timeBlox.innerHTML += ' <div class="text-center time-tile" data-time-string="' + timeTiles[i] + '" id="time-tile-' + i + '" onclick="selectTime(' + i + ')">' + timeTiles[i] + '</div>';
    }
}

var selectedDate = new Date();
var bookedTimes = [];
var bookedSlots = [];
var searchDate;
function loadSalonAppointments(sId) {
    searchDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    var data = {
        appDate: searchDate,
        salonId: sId,
        technicianId: selectedTech
    };
    $.get("http://thebeautibar.com/assets/php/fetch-appointments-for-salon.php", data, function (data) {
        if (data == "No results") {
            loadUnavailableAppointments(sId);
            return;
        }
        var salonData = JSON.parse(data);
        for (var i = 0; i < salonData.length; i++) {
            bookedTimes.push(salonData[i].startTime);
            bookedSlots.push(parseInt(salonData[i].slots));
        }
        var tmpTimeTiles = document.getElementsByClassName("time-tile");

        for (var x = 0; x < bookedTimes.length; x++) {
            for (var p = 0; p < tmpTimeTiles.length; p++) {
                if (bookedTimes[x] == tmpTimeTiles[p].innerHTML.toString()) {
                    for (var z = 0; z < bookedSlots[x]; z++) {
                        tmpTimeTiles[p + z].classList.add("slot-booked");
                    }
                }
            }
        }
        loadUnavailableAppointments(sId);
    });
}

function loadUnavailableAppointments(sId) {
    var data = {
        appDate: searchDate,
        salonId: sId,
        technicianId: selectedTech
    };
    $.get("http://thebeautibar.com/assets/php/fetch-unavailable-slots.php", data, function (data) {
        if (data == "No results") {
            document.getElementById("time-needed").innerHTML = "<p>Time needed: " + totalTime + " min";
            $('.ft-preloader').removeClass("active");
            return;
        }
        var salonData = JSON.parse(data);
        for (var i = 0; i < salonData.length; i++) {
            bookedTimes.push(salonData[i].startTime);
        }
        var tmpTimeTiles = document.getElementsByClassName("time-tile");

        for (var x = 0; x < bookedTimes.length; x++) {
            for (var p = 0; p < tmpTimeTiles.length; p++) {
                if (bookedTimes[x] == tmpTimeTiles[p].innerHTML.toString()) {
                    tmpTimeTiles[p].classList.add("slot-booked");
                }
            }
        }
        $('.ft-preloader').removeClass("active");
    });
}

function loadSalonImages(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-images.php", data, function (data, status) {
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
        $('.ft-preloader').removeClass("active");
    });

}
var timeSlots;
function selectTime(index) {
    timeSlots = this.calculateSlots();
    var selectedBox = document.getElementById("time-tile-" + index);
    var boxArray = [];
    boxArray.push(selectedBox);
    for (var i = 1; i < this.timeSlots; i++) {
        selectedBox = document.getElementById("time-tile-" + (index + i));
        boxArray.push(selectedBox);
    }
    for (var i = 0; i < boxArray.length; i++) {
        if (boxArray[i].classList.contains("slot-booked")) {
            return;
        }
    }
    tmpAppointment.startTime = this.timeTiles[index];
    tmpAppointment.endTime = this.timeTiles[index + this.timeSlots];
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
    selectedTech = selectedBox.options[selectedBox.selectedIndex].value;
});

$("#date-selector").change(function () {
    $('.ft-preloader').addClass("active");
    selectedDate = new Date(document.getElementById("date-selector").value);
    loadSalonAppointments(salonId);
});

function calculateSlots() {
    return this.totalTime / 30;
}

var cost = 0;
function addToCart(index) {
    var selectedRow = document.getElementById("outside-menu-table").rows[index + 1];
    if (selectedRow.classList.contains("menu-not-selected") == true) {
        this.totalTime = parseInt(this.totalTime) + parseInt(selectedSalonMenu[index].treatmentLength);
        cost += parseInt(selectedSalonMenu[index].price);
        currentOrder.push(selectedSalonMenu[index]);
        selectedRow.classList.replace("menu-not-selected", "menu-selected");
    } else {
        this.totalTime = parseInt(this.totalTime) - parseInt(selectedSalonMenu[index].treatmentLength);
        var deleteIndex = currentOrder.indexOf(selectedSalonMenu[index]);
        cost -= parseInt(selectedSalonMenu[index].price);
        currentOrder.splice(deleteIndex, 1);
        selectedRow.classList.replace("menu-selected", "menu-not-selected");
    }
}

function createOrder() {
    buildAppointment();
}

function buildAppointment() {
    var traceId = 0;
    // generateOrderId();
    var appointment = {};
    $.get("http://thebeautibar.com/assets/php/get-order-id.php", function (data,status) {
        var orderIdData = JSON.parse(data);
        traceId = parseInt(orderIdData[0].autoIncrement);

        cost = 0;
        var treatmentString = "";
        var totalLength = 0;
        for(var i =0; i < currentOrder.length; i ++) {
            cost += parseInt(currentOrder[i].price);
            treatmentString += currentOrder[i].productDescription;
            totalLength += parseInt(currentOrder[i].treatmentLength);
            if (i != (currentOrder.length - 1)) {
                treatmentString += ", "
            }
        }

        appointment.salonName = tmpSelectedSalon.salonName;
        appointment.salonId = tmpSelectedSalon.id;
        appointment.endTime = tmpAppointment.endTime;
        appointment.startTime = tmpAppointment.startTime;
        appointment.technicianId = selectedTech;
        appointment.orderItems = treatmentString;
        appointment.cost = cost;
        appointment.slots = timeSlots;
        appointment.traceId = traceId;
        appointment.appStatus = "AWAITING_PAYMENT";
        appointment.duration = totalLength;
        appointment.appointmentDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
        appointment.userId = 'DefaultTestUser';
        $.post("../../assets/php/add-appointment.php", appointment, function (data2,status2) {
            postToPayfast(appointment);
        });
    });
}

function postToPayfast(appt) {
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = "https://sandbox.payfast.co.za/eng/process";

    var hiddenField = document.createElement('input');
    hiddenField.name = 'merchant_id';
    hiddenField.value = payfastPayload.merchantId.toString();
    form.appendChild(hiddenField);

    var hiddenField2 = document.createElement('input');
    hiddenField2.name = 'merchant_key';
    hiddenField2.value = payfastPayload.merchantKey;
    form.appendChild(hiddenField2);

    var hiddenField3 = document.createElement('input');
    hiddenField3.name = 'name_first';
    hiddenField3.value = "TestName";
    form.appendChild(hiddenField3);

    var hiddenField4 = document.createElement('input');
    hiddenField4.name = 'name_last';
    hiddenField4.value = "TestSurname"
    form.appendChild(hiddenField4);

    var hiddenField5 = document.createElement('input');
    hiddenField5.name = 'email_address';
    hiddenField5.value = "u13062060@tuks.co.za"
    form.appendChild(hiddenField5);

    var hiddenField6 = document.createElement('input');
    hiddenField6.name = 'm_payment_id';
    hiddenField6.value = payfastPayload.mPaymentId;
    form.appendChild(hiddenField6);

    var hiddenField7 = document.createElement('input');
    hiddenField7.name = 'amount';
    hiddenField7.value = (cost).toString();
    form.appendChild(hiddenField7);

    var hiddenField8 = document.createElement('input');
    hiddenField8.name = 'item_name';
    hiddenField8.value = appt.orderItems;
    form.appendChild(hiddenField8);

    var hiddenField9 = document.createElement('input');
    hiddenField9.name = 'cancel_url';
    hiddenField9.value = 'http://thebeautibar.com/pages/failed/failed.html?id='+appt.traceId;
    form.appendChild(hiddenField9);

    var hiddenField10 = document.createElement('input');
    hiddenField10.name = 'return_url';
    hiddenField10.value = 'http://thebeautibar.com/pages/success/success.html?id='+appt.traceId;
    form.appendChild(hiddenField10);

    document.body.appendChild(form);
    form.submit();
}
var payfastPayload =  {
    merchantId: 10017174,
    merchantKey:  "675g0eirbfi4l",
    nameFirst:  "Scott",
    nameLast: "Test",
    emailAddress: "scott@gmail.com",
    mPaymentId: "A124G"
}
