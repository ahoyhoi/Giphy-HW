$(document).ready(function () {
    // Food Array
    var foods = ["Toast", "Cereal", "Sushi", "Tacos", "Cake", "Chicken", "Ice Cream", "Steak", "Fries", "Rice", "Potatos", "Chips", "Guac"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < foods.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("food");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", foods[i]);
            gifButton.text(foods[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function add new btn
    function addNewButton() {
        $("#addGif").on("click", function () {
            var food = $("#food-input").val().trim();
            if (food == "") {
                return false; 
            }
            foods.push(food);

            displayGifButtons();
            return false;
        });
    }
    // Function to remove last action button?
    function removeLastButton() {
        $("removeGif").on("click", function () {
            foods.pop(food);
            displayGifButtons();
            return false;
        });
    }
    // Function that display all
    function displayGifs() {
        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=3J4GsUmd2qyEyQoEofWousWMZ9pOPrEu&limit=10";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
            
            //shows results of gif
                $("#gifsView").empty(); 
                var results = response.data; 
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {
                   //div for the gifs to go inside
                    var gifDiv = $("<div>"); 
                    gifDiv.addClass("gifDiv");
                    // pulling rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); 
                    gifImage.attr("data-state", "still"); 
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    
                    
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    // Calling Functions & Methods
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    // Event Listeners
    $(document).on("click", ".food", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});