$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    loadSalons();
});

function loadSalons() {
    $.get("../../assets/php/fetch-salons.php", function (data, status) {
        salonArray = JSON.parse(data);
        var myobj = document.getElementById("no-salons-text");
        myobj.remove();
        var salonHTMLRow = document.getElementById("salons-admin-list");

        // JS to assign salon data to home page template
        for (var i = 0; i < salonArray.length; i++) {
            var tmpSalonName = salonArray[i].salonName;
            var tmpSalonId = salonArray[i].id;
            salonHTMLRow.innerHTML += '<td>' + tmpSalonName + '</td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="selectSalonToEdit(' + i + ')">Edit</a></td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="selectSalonToDelete(' + i + ')" data-toggle="modal" data-target="#deleteModal">Delete</a></td>';
        }
    });
    loadTechnicians();
}

var salonDeleteId;

var techSalonId;

function loadTechnicians() {
    $.get("../../assets/php/fetch-all-technicians.php", function (data, status) {
        technicianArray = JSON.parse(data);
        console.log("techArray " + technicianArray);
        var myobj = document.getElementById("no-techs-text");
        myobj.remove();
        var salonHTMLRow = document.getElementById("technicians-admin-list");

        // JS to assign salon data to home page template
        for (var i = 0; i < technicianArray.length; i++) {
            var tmpSalonName = technicianArray[i].technicianName;
            var techId = technicianArray[i].id;
            var techSalonId = technicianArray[i].salonId;
            salonHTMLRow.innerHTML += '<td>' + tmpSalonName + '</td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="openTechSchedule(\'' + techId + '\', \'' + techSalonId + '\')">View</a></td>';
        }
        $('.ft-preloader').removeClass("active");
    });
}

function loadOrders() {

}

function deleteSalon() {
    console.log("deleteing " + salonDeleteId);
    // $('.ft-preloader').addClass("active");
    var data = {salonId: salonArray[salonDeleteId].id};
    $.post("../../assets/php/delete-salon.php", data, function (data, status) {
        window.location.reload();
    });
}

function selectSalonToDelete(id) {
    salonDeleteId = id;
}

function openTechSchedule(techId, techSalonId) {
    window.location.href = '../technicians/schedule.html?id=' + techId + '&salonId=' + techSalonId;
}

function selectSalonToEdit(index) {
    window.location.href = '../salon-admin/salon-admin.html?id=' + salonArray[index].id;
}
