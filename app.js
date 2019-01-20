$(document).ready(function () {

    var keyWord, queryURL, gifDiv, rating, p, keyWordImage, currentSearch, button;

    var array = ["Borat", "Rick and Morty", "Michael Scott"]


    // Function to generate the buttons
    function genButtons() {

        $("#buttons").empty();

        for (var i = 0; i < array.length; i++) {

            button = $("<button>");
            button.addClass("listButton btn btn-danger");

            button.attr("data-keyWord", array[i]);
            button.text(array[i]);
            $("#buttons").append(button);
        }
    }

    function getData() {
        $("#gif-container").empty();
        var keyWord = $(this).attr("data-keyWord");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            keyWord + "&api_key=DqpifTaRMdoxbc0J1gFci7VxsuqxagX0" + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    gifDiv = $("<div class='item'>");
                    rating = results[i].rating;
                    p = $("<p>").text("Rating: " + rating);
                    keyWordImage = $("<img>");
                    keyWordImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(keyWordImage);
                    $("#gif-container").prepend(gifDiv);
                }

            });

    }

    $("#gif-container").hide();
    genButtons();


    $(document).on("click", ".listButton", getData);

    $(".listButton").on("click", function () {
        $("#gif-container").show();
    })

    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        currentSearch = $("#searchBox").val();

        // Adding movie from the textbox to our array
        array.push(currentSearch);
        console.log(currentSearch);
        // Calling renderButtons which handles the processing of our movie array
        genButtons();
        console.log(array);
    });




});






