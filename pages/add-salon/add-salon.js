$(window).on('load', function () {
    state.window_width = $(window).width();
    if (state.window_width > 991) {
        state.stickyHeader();
    }
    $('.ft-preloader').removeClass("active");

});

function makeId() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function saveSalonDetails() {
    $('.ft-preloader').addClass("active");
    var salonId = makeId();
    var salonName = document.getElementById("salonName_field").value;
    var salonPhone = document.getElementById("salonPhone_field").value;
    var salonEmail = document.getElementById("salonEmail_field").value;
    var salonDay1 = document.getElementById("edit-day-checkbox-1").checked;
    var salonDay2 = document.getElementById("edit-day-checkbox-2").checked;
    var salonDay3 = document.getElementById("edit-day-checkbox-3").checked;
    var salonDay1Start = document.getElementById("edit-day-select-start-1").value;
    var salonDay1End = document.getElementById("edit-day-select-end-1").value;
    var salonDay2Start = document.getElementById("edit-day-select-start-2").value;
    var salonDay2End = document.getElementById("edit-day-select-end-2").value;
    var salonDay3Start = document.getElementById("edit-day-select-start-3").value;
    var salonDay3End = document.getElementById("edit-day-select-end-3").value;
    var orderNotes = document.getElementById("orderNotes").value;

    var salonDetails = {
        salonId: salonId,
        salonName: salonName,
        salonPhone: salonPhone,
        salonEmail: salonEmail,
        salonDay1: salonDay1,
        salonDay2: salonDay2,
        salonDay3: salonDay3,
        salonDay1Start: salonDay1Start,
        salonDay1End: salonDay1End,
        salonDay2Start: salonDay2Start,
        salonDay2End: salonDay2End,
        salonDay3Start: salonDay3Start,
        salonDay3End: salonDay3End,
        orderNotes: orderNotes
    };

    var menuDetails = [];

    var technicianDetails = [];

    for (var k = 1; k <= totalMenuRowCounter; k++) {
        var menuItem = {};
        var tmpDesc = document.getElementById("menu-desc-" + k);
        var tmpPrice = document.getElementById("menu-cost-" + k);
        var tmpLength = document.getElementById("menu-dur-" + k);
        if (tmpDesc != null && tmpPrice != null && tmpLength != null) {
            menuItem.productDescription = tmpDesc.value;
            menuItem.price = tmpPrice.value;
            menuItem.treatmentLength = tmpLength.value;
            menuDetails.push(menuItem);
        }
    }

    for (var k = 1; k <= totalTechRowCounter; k++) {
        var techItem = {};
        var tmpNameElement = document.getElementById("tech-name-" + k);
        var tmpNumElement = document.getElementById("tech-num-" + k);
        if (tmpNameElement != null && tmpNumElement != null) {
            techItem.technicianName = tmpNameElement.value;
            techItem.technicianNumber = tmpNumElement.value;
            technicianDetails.push(techItem);
        }
    }

    salonDetails.technicians = [];
    salonDetails.menuItems = [];
    salonDetails.menuItems = menuDetails;
    salonDetails.technicians = technicianDetails;
    console.log(salonDetails);
    $.post("http://thebeautibar.com/assets/php/add-salon.php", salonDetails, function (data, status) {
        window.location.href = '../admin/admin.html';
    });
}

// event handlers
var totalFileArray = [];
$("#file-input").change(function (e) {
    var files = Array.from(document.getElementById("file-input").files);
    for (var x = 0; x < files.length; x++) {
        if (!totalFileArray.includes(files[x])) {
            totalFileArray.push(files[x]);
            console.log(files[x]);
            var fileHTMLElement = document.getElementById("file-list");
            fileHTMLElement.innerHTML += '<li>' + files[x].name + '</li>';
        }
    }
});

function removeMenuRow(rowName) {
    if (menuRowCounter != 1) {
        var dltRowIndex = document.getElementById(rowName).rowIndex;
        document.getElementById("add-menu-table").deleteRow(dltRowIndex);
        menuRowCounter--;
    }
}

var menuRowCounter = 0;
var totalMenuRowCounter = 0;

function addMenuRow() {
    if (menuRowCounter == 0) {
        document.getElementById("add-menu-table").innerHTML += "                                    <tr>\n" +
            "                                        <th>Description</th>\n" +
            "                                        <th>Duration</th>\n" +
            "                                        <th>Cost</th>\n" +
            "                                        <td></td>\n" +
            "                                    </tr>";
    }
    menuRowCounter++;
    totalMenuRowCounter++;
    var tmpRow = document.createElement("tr");
    tmpRow.setAttribute("id", "menu-row-" + menuRowCounter);
    tmpRow.innerHTML =
        "                                        <td><input type=\"text\" id=\"menu-desc-" + menuRowCounter + "\" /></td>\n" +
        "                                        <td><input type=\"number\" onkeydown='return false' id=\"menu-dur-" + menuRowCounter + "\" step=\"30\" min=\"0\" max=\"720\"/></td>\n" +
        "                                        <td><input type=\"number\" id=\"menu-cost-" + menuRowCounter + "\" min=\"0\" max=\"20000\"/></td>\n" +
        "                                        <td>\n" +
        "                                            <button class=\"btn btn-size-sm\" id=\"minus-menu-btn\" onclick=\"removeMenuRow('menu-row-" + menuRowCounter + "')\"><i class=\"fas fa-minus\"></i>\n" +
        "                                            </button>\n" +
        "                                        </td>\n";
    document.getElementById("add-menu-table").appendChild(tmpRow);
}

function removeTechRow(rowName) {
    if (techRowCounter != 1) {
        var dltRowIndex = document.getElementById(rowName).rowIndex;
        document.getElementById("add-tech-table").deleteRow(dltRowIndex);
        techRowCounter--;
    }
}

var techRowCounter = 0;
var totalTechRowCounter = 0;

function addTechRow() {
    if (techRowCounter == 0) {
        document.getElementById("add-tech-table").innerHTML += "                                    <tr>\n" +
            "                                        <th>Name</th>\n" +
            "                                        <th>Number</th>\n" +
            "                                        <td></td>\n" +
            "                                    </tr>";
    }
    techRowCounter++;
    totalTechRowCounter++;
    var tmpRow = document.createElement("tr");
    tmpRow.setAttribute("id", "tech-row-" + techRowCounter);
    tmpRow.innerHTML = "                                    <tr>\n" +
        "                                        <td><input type=\"text\" id=\"tech-name-" + techRowCounter + "\" /></td>\n" +
        "                                        <td><input type=\"text\" id=\"tech-num-" + techRowCounter + "\" /></td>\n" +
        "                                        <td>\n" +
        "                                            <button class=\"btn btn-size-sm\" id=\"minus-tech-btn\" onclick=\"removeTechRow('tech-row-" + techRowCounter + "')\"><i class=\"fas fa-minus\"></i>\n" +
        "                                            </button>\n" +
        "                                        </td>\n" +
        "                                    </tr>";
    document.getElementById("add-tech-table").appendChild(tmpRow);
}
