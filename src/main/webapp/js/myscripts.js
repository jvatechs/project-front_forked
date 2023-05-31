$(document).ready(function () {
    // Initial data load
    fetchData();

    // Bind change event for selector
    $("#selector").change(function () {
        currentPage = 0;
        fetchData();
    });

    // Attach the click event to a parent element using event delegation
    $("#pagesButtons").on("click", ".pageButton", function () {
        var page = $(this).text() - 1;
        fetchData(page);

        // Remove the active class from all buttons
        $(".pageButton").removeClass("active");

        // Add the active class to the clicked button
        $(this).addClass("active");
    });

    // Edit button event handler

    $("#mainTable").on("click", ".editButton", function () {
        var row = $(this).closest("tr");
        var id = row.find("td:first").text(); // Assuming the ID is in the first column
        // Handle the edit action for the corresponding record
        console.log("Edit button clicked for ID: " + id);
    });


// Call the function to populate the drop-down lists
    populateDropdowns();

    $("#createAccountButton").click(function () {
        createAccount();
    });

});

var tableId = "#mainTable";
var currentPage = 0; // Variable to keep track of the current page

function populateTable(data, pageSize, page) {
    // Clear existing table rows
    $(tableId + " tbody").empty();

    var buttonValue = parseInt(page);


    if (!isNaN(buttonValue)) {
        currentPage = buttonValue;
    }


    // Iterate over the data and append rows to the table
    $.each(data, function (index, player) {
        console.log(index);
        var row = $("<tr>").appendTo($(tableId + " tbody"));
        // $("<td>").text((currentPage - 1) * pageSize + index + pageSize + 1).appendTo(row);
        $("<td>").text(player.id).appendTo(row);
        $("<td>").text(player.name).appendTo(row);
        $("<td>").text(player.title).appendTo(row);
        $("<td>").text(player.race).appendTo(row);
        $("<td>").text(player.profession).appendTo(row);
        $("<td>").text(player.level).appendTo(row);
        $("<td>").text(player.birthday).appendTo(row);
        $("<td>").text(player.banned).appendTo(row);


// Edit icon column
        var editIcon = $("<i>").addClass("fas fa-edit");
        var editButton = $("<button>")
            .addClass("editButton")
            .append(editIcon)
            .on("click", function () {
                var row = $(this).closest("tr");
                var id = row.find("td:first").text(); // Assuming the ID is in the first column
                editAccount(row, id);
            });
        $("<td>").append(editButton).appendTo(row);


// Delete icon column
        var deleteIcon = $("<i>").addClass("fas fa-trash-alt");
        var deleteButton = $("<button>")
            .addClass("deleteButton")
            .append(deleteIcon)
            .on("click", function () {
                var row = $(this).closest("tr");
                var id = row.find("td:first").text(); // Assuming the ID is in the first column
                deleteAccount(id);
            });
        $("<td>").append(deleteButton).appendTo(row);

        console.log("Added account")
    });

    // Call the getTotalAccountCount function to calculate the number of pages
    getTotalAccountCount();
}


// Function to handle the AJAX request and populate the table
function fetchData(page) {
    var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
    var url = "/rest/players?pageNumber=" + (page || 0) + "&pageSize=" + pageSize;
    console.log(url);
    console.log(page);

    $.ajax({
        type: "GET", url: url, success: function (data) {
            console.log(data);
            populateTable(data, pageSize, page);
        }, error: function (xhr, status, error) {
            console.log("Request failed: " + error);
        }
    });
}

function getTotalAccountCount() {
    var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
    var url = "/rest/players/count";

    $.ajax({
        type: "GET", url: url, success: function (response) {
            var totalAccounts = parseInt(response);
            var totalPages = Math.ceil(totalAccounts / pageSize);


            console.log("Total accounts: " + totalAccounts);
            console.log("Total pages: " + totalPages);

            // Clear existing pagination buttons
            $("#pagesButtons").empty();

            // Add label for the buttons
            $("<label>").text("Pages:").appendTo($("#pagesButtons"));

            // Add pagination buttons
            for (var i = 1; i <= totalPages; i++) {
                var button = $("<button>").text(i);
                button.addClass('pageButton');
                $("#pagesButtons").append(button);
            }

            // Add the active class to the current page button
            $("#pagesButtons button").eq(currentPage).addClass("active");
        }, error: function (xhr, status, error) {
            console.log("Request failed: " + error);
        }
    });
}

function deleteAccount(id) {
    var url = "/rest/players/" + id;

    $.ajax({
        type: "DELETE", url: url, success: function () {
            console.log("Account deleted successfully.");
            // After successful deletion, refresh the account list on the current page
            fetchData(currentPage);
        }, error: function (xhr, status, error) {
            console.log("Failed to delete account: " + error);
        }
    });
}


function editAccount(row, id) {
    // Hide the Delete button
    row.find(".deleteButton").hide();

    // Change the icon of the Edit button to Save
    var editButton = row.find(".editButton");
    editButton.removeClass("fa-edit").addClass("fa-save");
    editButton.off("click"); // Remove the click event handler from the Edit button

    // Add a new click event handler to the Save button
    editButton.on("click", function () {
        saveAccount(row, id);
    });

    // Make the fields editable
    var nameCell = row.find("td:eq(1)");
    var titleCell = row.find("td:eq(2)");
    var raceCell = row.find("td:eq(3)");
    var professionCell = row.find("td:eq(4)");
    var bannedCell = row.find("td:eq(7)");

    var name = nameCell.text();
    var title = titleCell.text();
    var race = raceCell.text();
    var profession = professionCell.text();
    var banned = bannedCell.text();

    nameCell.html("<input type='text' class='edit-field' value='" + name + "'>");
    titleCell.html("<input type='text' class='edit-field' value='" + title + "'>");
    raceCell.html("<input type='text' class='edit-field' value='" + race + "'>");
    professionCell.html("<input type='text' class='edit-field' value='" + profession + "'>");
    bannedCell.html("<input type='text' class='edit-field' value='" + banned + "'>");
}

function saveAccount(row, id) {
    // Show the Delete button
    row.find(".deleteButton").show();

    // Change the icon of the Save button back to Edit
    var editButton = row.find(".editButton");
    editButton.removeClass("fa-save").addClass("fa-edit");
    editButton.off("click"); // Remove the click event handler from the Save button

    // Add a new click event handler to the Edit button
    editButton.on("click", function () {
        editAccount(row, id);
    });

    // Get the updated values from the input fields
    var name = row.find("input:eq(0)").val();
    var title = row.find("input:eq(1)").val();
    var race = row.find("input:eq(2)").val();
    var profession = row.find("input:eq(3)").val();
    var banned = row.find("input:eq(4)").val();

    // Create the JSON payload
    var payload = JSON.stringify({
        name: name, title: title, race: race, profession: profession, banned: banned
    });

    // Send the POST request to save the changes
    $.ajax({
        type: "POST", url: "/rest/players/" + id, data: payload, contentType: "application/json", success: function () {
            // Remove the editing fields from the row
            row.find(".edit-field").remove();

            // Update the table cells with the updated values
            row.find("td:eq(1)").text(name);
            row.find("td:eq(2)").text(title);
            row.find("td:eq(3)").text(race);
            row.find("td:eq(4)").text(profession);
            row.find("td:eq(7)").text(banned);

            // Refresh the data on the current page
            fetchData();
        }, error: function () {
            console.log("Error saving account changes.");
        }
    });
}


$("#createButton").click(function () {
    // Get the values from the input fields
    var name = $("#newName").val();
    var title = $("#newTitle").val();
    var race = $("#newRace").val();
    var profession = $("#newProfession").val();
    var level = $("#newLevel").val();
    var birthday = $("#newBirthday").val();
    var banned = $("#newBanned").is(":checked");

    // Create the JSON payload
    var payload = JSON.stringify({
        name: name, title: title, race: race, profession: profession, level: level, birthday: birthday, banned: banned
    });

    // Send the POST request to create the new account
    $.ajax({
        type: "POST", url: "/rest/players", data: payload, contentType: "application/json", success: function () {
            // Clear the input fields
            $("#newName").val("");
            $("#newTitle").val("");
            $("#newRace").val("");
            $("#newProfession").val("");
            $("#newLevel").val("");
            $("#newBirthday").val("");
            $("#newBanned").prop("checked", false);

            // Refresh the data on the current page
            fetchData();
        }, error: function () {
            console.log("Error creating a new account.");
        }
    });
});

function populateDropdowns() {
    // Get the valid race and profession values from the API
    var validRaceValues = ['HUMAN', 'DWARF', 'ELF', 'GIANT', 'ORC', 'TROLL', 'HOBBIT'];
    var validProfessionValues = ['WARRIOR', 'ROGUE', 'SORCERER', 'CLERIC', 'PALADIN', 'NAZGUL', 'WARLOCK', 'DRUID'];

    // Populate the Race drop-down list
    var raceDropdown = $("#newRace");
    validRaceValues.forEach(function (value) {
        raceDropdown.append($("<option>").text(value).attr("value", value));
    });

    // Populate the Profession drop-down list
    var professionDropdown = $("#newProfession");
    validProfessionValues.forEach(function (value) {
        professionDropdown.append($("<option>").text(value).attr("value", value));
    });
}

function createAccount() {
    // Get the values entered by the user
    var name = $("#newName").val();
    var title = $("#newTitle").val();
    var race = $("#newRace").val();
    var profession = $("#newProfession").val();
    var level = $("#newLevel").val();
    var birthday = $("#newBirthday").val();
    var banned = $("#newBanned").is(":checked");

    // Create the JSON payload
    var payload = JSON.stringify({
        name: name, title: title, race: race, profession: profession, level: level, birthday: birthday, banned: banned
    });

    // Send the POST request to create the account
    $.ajax({
        type: "POST", url: "/rest/players", data: payload, contentType: "application/json", success: function (data) {
            // Clear the data entry fields
            $("#newName").val("");
            $("#newTitle").val("");
            $("#newRace").val("");
            $("#newProfession").val("");
            $("#newLevel").val("");
            $("#newBirthday").val("");
            $("#newBanned").prop("checked", false);

            // Append the new account data to the table
            var row = $("<tr>");
            $("<td>").text(data.id).appendTo(row);
            $("<td>").text(data.name).appendTo(row);
            $("<td>").text(data.title).appendTo(row);
            $("<td>").text(data.race).appendTo(row);
            $("<td>").text(data.profession).appendTo(row);
            $("<td>").text(data.level).appendTo(row);
            $("<td>").text(data.birthday).appendTo(row);
            $("<td>").text(data.banned).appendTo(row);
            $("<td>").append($("<button>").addClass("editButton").append($("<i>").addClass("fas fa-edit"))).appendTo(row);
            $("<td>").append($("<button>").addClass("deleteButton").append($("<i>").addClass("fas fa-trash-alt"))).appendTo(row);
            $(tableId + " tbody").append(row);
        }, error: function (xhr, status, error) {
            console.log("Request failed: " + error);
        }
    });
}



