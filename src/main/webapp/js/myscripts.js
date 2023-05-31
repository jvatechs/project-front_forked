// $.ajax({
//     type: "POST",
//     url: "api.javarush.ru",
//     data: {name: 'Bill', location: 'Radmond'},
//     success: function (msg) {
//         alert("Person found: " + msg);
//     },
//     error: function (xhr, status, error) {
//         alert("Request failed: " + error);
//     }
// });


//=================================================


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
    var editButton = $("<button>").addClass("editButton").append(editIcon);
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
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            populateTable(data, pageSize, page);
        },
        error: function (xhr, status, error) {
            console.log("Request failed: " + error);
        }
    });
}

function getTotalAccountCount() {
    var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
    var url = "/rest/players/count";

    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
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
        },
        error: function (xhr, status, error) {
            console.log("Request failed: " + error);
        }
    });
}

function deleteAccount(id) {
  var url = "/rest/players/" + id;

  $.ajax({
    type: "DELETE",
    url: url,
    success: function () {
      console.log("Account deleted successfully.");
      // After successful deletion, refresh the account list on the current page
      fetchData(currentPage);
    },
    error: function (xhr, status, error) {
      console.log("Failed to delete account: " + error);
    }
  });
}
