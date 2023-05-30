$.ajax({
  type: "POST",
  url: "api.javarush.ru",
  data: {name: 'Bill', location: 'Radmond'},
  success: function(msg){
    alert( "Person found: " + msg );
  },
    error: function(xhr, status, error) {
    alert("Request failed: " + error);
  }
});


$("button").click(function(){
  $("button").removeClass("active");
  $(this).addClass("active");
});




// var tableId = "#mainTable";


// // Function to populate the table with data
// function populateTable(data) {
//   // Clear existing table rows
//   $(tableId + " tbody").empty();

//   // Iterate over the data and append rows to the table
//   $.each(data, function (index, player) {
//     var row = $("<tr>").appendTo(tableId + " tbody");
//     $("<td>").text(index + 1).appendTo(row);
//     $("<td>").text(player.name).appendTo(row);
//     $("<td>").text(player.title).appendTo(row);
//     $("<td>").text(player.race).appendTo(row);
//     $("<td>").text(player.profession).appendTo(row);
//     $("<td>").text(player.level).appendTo(row);
//     $("<td>").text(player.birthday).appendTo(row);
//     $("<td>").text(player.banned).appendTo(row);
//   });

//   // Call the getTotalAccountCount function to calculate the number of pages
//   getTotalAccountCount();
// }


// // Function to handle the AJAX request and populate the table
// function fetchData() {
//   $.ajax({
//     type: "GET",
//     url: "/rest/players",
//     success: function(data) {
//       populateTable(data);
//     },
//     error: function(xhr, status, error) {
//       console.log("Request failed: " + error);
//     }
//   });
// }

// // Call the fetchData function to retrieve and populate the table data
// fetchData();

// function getTotalAccountCount() {
//   var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
//   var url = "/rest/players/count";
//   var xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       var totalAccounts = parseInt(xhr.responseText);
//       var totalPages = Math.ceil(totalAccounts / pageSize);
//       console.log("Total accounts: " + totalAccounts);
//       console.log("Total pages: " + totalPages);

//       // Clear existing pagination buttons
//       $("#pagesButtons").empty();

//       // Add pagination buttons
//       for (var i = 1; i <= totalPages; i++) {
//         var button = $("<button>").text(i);
//         button.click(function () {
//           var page = $(this).text();
//           fetchData(page);
//         });
//         $("#pagesButtons").append(button);
//       }
//     }
//   };

//   xhr.open("GET", url, true);
//   xhr.send();
// }

//==============================================

// var tableId = "#mainTable";
// var currentPage = 1; // Variable to keep track of the current page


// // Function to populate the table with data
// function populateTable(data) {
//   // Clear existing table rows
//   $(tableId + " tbody").empty();

//   // Iterate over the data and append rows to the table
//   $.each(data, function (index, player) {
//     var row = $("<tr>").appendTo(tableId + " tbody");
//     $("<td>").text(index + 1).appendTo(row);
//     $("<td>").text(player.name).appendTo(row);
//     $("<td>").text(player.title).appendTo(row);
//     $("<td>").text(player.race).appendTo(row);
//     $("<td>").text(player.profession).appendTo(row);
//     $("<td>").text(player.level).appendTo(row);
//     $("<td>").text(player.birthday).appendTo(row);
//     $("<td>").text(player.banned).appendTo(row);
//   });

//   // Call the getTotalAccountCount function to calculate the number of pages
//   getTotalAccountCount();
// }


// // Function to handle the AJAX request and populate the table
// function fetchData(page) {
//   var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
//   var url = "/rest/players?pageNumber=" + (page || 1) + "&pageSize=" + pageSize;

//   $.ajax({
//     type: "GET",
//     url: url,
//     success: function(data) {
//       populateTable(data);
//     },
//     error: function(xhr, status, error) {
//       console.log("Request failed: " + error);
//     }
//   });
// }

// // Call the fetchData function to retrieve and populate the table data
// fetchData();

// function getTotalAccountCount() {
//   var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
//   var url = "/rest/players/count";
//   var xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       var totalAccounts = parseInt(xhr.responseText);
//       var totalPages = Math.ceil(totalAccounts / pageSize);
//       console.log("Total accounts: " + totalAccounts);
//       console.log("Total pages: " + totalPages);

//       // Clear existing pagination buttons
//       $("#pagesButtons").empty();

//       // Add pagination buttons
//       for (var i = 1; i <= totalPages; i++) {
//         var button = $("<button>").text(i);
//         button.click(function () {
//           var page = $(this).text();
//           fetchData(page);
//         });
//         $("#pagesButtons").append(button);
//       }
//     }
//   };

//   xhr.open("GET", url, true);
//   xhr.send();
// }

$(document).ready(function () {
  // Initial data load
  fetchData();
});

var tableId = "#mainTable";
var currentPage = 1; // Variable to keep track of the current page
// var pageSize = parseInt($("#selector").on("change").val()); // Global variable for page size


// Function to populate the table with data
function populateTable(data) {
  // Clear existing table rows
  $(tableId + " tbody").empty();

  // Iterate over the data and append rows to the table
  $.each(data, function (index, player) {
    var row = $("<tr>").appendTo($(tableId + " tbody"));
    $("<td>").text(index + 1).appendTo(row);
    $("<td>").text(player.name).appendTo(row);
    $("<td>").text(player.title).appendTo(row);
    $("<td>").text(player.race).appendTo(row);
    $("<td>").text(player.profession).appendTo(row);
    $("<td>").text(player.level).appendTo(row);
    $("<td>").text(player.birthday).appendTo(row);
    $("<td>").text(player.banned).appendTo(row);
  });

  // Call the getTotalAccountCount function to calculate the number of pages
  getTotalAccountCount();
}

// Function to handle the AJAX request and populate the table
function fetchData(page) {
  var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
  var url = "/rest/players?pageNumber=" + (page || 1) + "&pageSize=" + pageSize;

  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      populateTable(data);
      console.log(pageSize);
    },
    error: function(xhr, status, error) {
      console.log("Request failed: " + error);
    }
  });
}

// Call the fetchData function to retrieve and populate the table data
fetchData();

function getTotalAccountCount() {
  var pageSize = parseInt($("#selector").val()); // Get the selected page size from the dropdown
  var url = "/rest/players/count";

  $.ajax({
    type: "GET",
    url: url,
    success: function(response) {
      var totalAccounts = parseInt(response);
      var totalPages = Math.ceil(totalAccounts / pageSize);
      console.log("Total accounts: " + totalAccounts);
      console.log("Total pages: " + totalPages);

      // Clear existing pagination buttons
      $("#pagesButtons").empty();

      // Add pagination buttons
      for (var i = 1; i <= totalPages; i++) {
        var button = $("<button>").text(i);
        button.click(function () {
          var page = $(this).text();
          fetchData(page);
        });
        $("#pagesButtons").append(button);
      }
    },
    error: function(xhr, status, error) {
      console.log("Request failed: " + error);
    }
  });
}

