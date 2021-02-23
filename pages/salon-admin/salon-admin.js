$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    loadSalonToEdit(urlParams.get("id"));

});

function loadSalonInformation() {
    $.get("http://thebeautibar.com/assets/php/fetch-salons.php", function (data, status) {
        salonArray = JSON.parse(data);
        var salonHTMLRow = document.getElementById("salons-admin-list");

        // JS to assign salon data to home page template
        for (var i = 0; i < salonArray.length; i++) {
            var tmpSalonName = salonArray[i].salonName;
            var tmpSalonId = salonArray[i].id;
            salonHTMLRow.innerHTML += '<td>' + tmpSalonName + '</td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="selectSalonToEdit(' + i + ')">Edit</a></td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="openConfirmDelete(' + i + ')">Delete</a></td>';
        }
    });
}

function loadTechnicians() {

}

function loadOrders() {

}

function loadSalonToEdit(id) {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-salon-details.php", data, function (data, status) {
        salonData = JSON.parse(data);
        console.log("salonData " + salonData[0].salonName);
        document.getElementById("salonName_field").value = salonData[0].salonName;
        document.getElementById("orderNotes").value = salonData[0].salonDescription;
        document.getElementById("salonPhone_field").value = salonData[0].phoneNumber;
        document.getElementById("salonEmail_field").value = salonData[0].emailAddress;
        $('.ft-preloader').removeClass("active");
    });
}

function updateSalonDetails() {
    console.log("start update salon");
    var salonName = document.getElementById("salonName_field").value;
    var salonDesc = document.getElementById("orderNotes").value;
    var salonPhone = document.getElementById("salonPhone_field").value;
    var salonEmail = document.getElementById("salonEmail_field").value;
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var salonId = urlParams.get("id");
    console.log("about to upload");
    console.log("desc " + salonDesc);
    console.log("email " + salonEmail);
    var data = {
        salonId: salonId,
        salonName: salonName,
        salonDesc: salonDesc,
        emailAddress: salonEmail,
        phoneNumber: salonPhone
    };
    var checkBoxArray = document.getElementsByName("edit-day-checkbox");
    var openingTimesArray = document.getElementsByName("edit-day-select-start");
    var closingTimesArray = document.getElementsByName("edit-day-select-end");

    var nonWorkDays = [];
    for (var i = 0; i < closingTimesArray.length; i++) {
        if (!checkBoxArray[i].checked) {
            nonWorkDays.push(i);
        }
    }

    var openingArrayData = [];
    var closingArrayData = [];
    var daysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    for (var i = 0; i < closingTimesArray.length; i++) {
        openingArrayData.push(openingTimesArray[i].value);
        closingArrayData.push(closingTimesArray[i].value);
    }
    console.log("opening area " + openingArrayData[0])


    for (var x = 0; x < nonWorkDays.length; x++) {
        openingArrayData[nonWorkDays[x]] = "0";
        closingArrayData[nonWorkDays[x]] = "0";
    }

    var tradingHoursData = {
        openingTimesArray: JSON.stringify(openingArrayData),
        closingTimesArray: JSON.stringify(closingArrayData),
        workingDaysArray: JSON.stringify(daysArray),
        salonId: salonId
    };

    $('.ft-preloader').addClass("active");
    $.get("http://thebeautibar.com/assets/php/update-salon.php", data, function () {
        console.log("salonData updated");
        // $('.ft-preloader').removeClass("active");
        $.get("http://thebeautibar.com/assets/php/save-salon-trading-hours.php", tradingHoursData, function () {
            console.log("trading hours updated");
            // $('.ft-preloader').removeClass("active");
            // window.location.href = '../admin/admin.html';
        });
    });
}
