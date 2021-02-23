$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    loadSalons();
});

function loadSalons() {
    $.get("http://thebeautibar.com/assets/php/fetch-salons.php", function (data, status) {
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
                '<td><a href="#" class="btn btn-size-sm" onclick="openConfirmDelete(' + i + ')">Delete</a></td>';
        }
    });
    $('.ft-preloader').removeClass("active");
}

function loadTechnicians() {
    var data = {salonId: id};
    $.get("http://thebeautibar.com/assets/php/fetch-all-technicians.php", data, function (data, status) {
        technicianArray = JSON.parse(data);
        var myobj = document.getElementById("no-techs-text");
        myobj.remove();
        var salonHTMLRow = document.getElementById("technicians-admin-list");

        // JS to assign salon data to home page template
        for (var i = 0; i < technicianArray.length; i++) {
            var tmpSalonName = technicianArray[i].salonName;
            var tmpSalonId = technicianArray[i].id;
            salonHTMLRow.innerHTML += '<td>' + tmpSalonName + '</td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="selectSalonToEdit(' + i + ')">Edit</a></td>\n' +
                '<td><a href="#" class="btn btn-size-sm" onclick="openConfirmDelete(' + i + ')">Delete</a></td>';
        }
    });
}

function loadOrders() {

}

function selectSalonToEdit(index) {
    window.location.href = '../salon-admin/salon-admin.html?id='+salonArray[index].id;
}
