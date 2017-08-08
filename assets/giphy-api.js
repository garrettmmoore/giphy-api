// Initial array of video games
var videoGames = ["Overwatch", "Halo", "Super Smash Brothers", "The Legend of Zelda"];


// displayVideoGameInfo function re-renders the HTML to display the appropriate content
function displayVideoGameInfo() 
{
	var game = $(this).attr("data-name");
  	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=ca85b3600e244eb399b02146bb569377&limit=10";

  	$.ajax({
			url: queryURL,
			method: "GET"
		})

  		.done(function(response) 
  		{
  			console.log(queryURL);
			console.log(response);

		// clear the contents
		$("#video-game-view").empty();

      	var results = response.data;

  		// Looping through each result item
          for (var j = 0; j < results.length; j++) 
          {

        	// Creating and storing a div tag
        	var videoGameDiv = $("<div>");

        	// Creating a paragraph tag with the result item's rating
			var p = $("<p>").text("Rating: " + results[j].rating);

            // Creating and storing an image tag
            var gameImage = $('<img>');
            
            // Setting the src attribute of the image to a property pulled off the result item
            gameImage.attr("src", results[j].images.fixed_height_still.url);
            gameImage.attr("data-still", results[j].images.fixed_height_still.url);
            gameImage.attr("data-animate", results[j].images.fixed_height.url);
            gameImage.attr("data-state", "still");
            gameImage.addClass("gif", results[j]);

            // Appending the paragraph and image tag to the videoGameDiv
            videoGameDiv.append(p);
            videoGameDiv.append(gameImage);

            // Prependng the videoGameDiv to the HTML page in the "#gifs-appear-here" div
            $("#video-game-view").append(videoGameDiv);
          }
		$(".gif").on("click", function() 
		{
		  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
		  var state = $(this).attr("data-state");
		  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
		  // Then, set the image's data-state to animate
		  // Else set src to the data-still value
		  if (state === "still") 
		  {
		    $(this).attr("src", $(this).attr("data-animate"));
		    $(this).attr("data-state", "animate");
		  } 
		  else 
		  {
		    $(this).attr("src", $(this).attr("data-still"));
		    $(this).attr("data-state", "still");
		  }
		});
      });
}


// Function for displaying video game data
function renderButtons() 
{

	$("#buttons-view").empty();

	// Looping through the array of videoGames
	for (var i = 0; i < videoGames.length; i++) 
	{
		// Then dynamicaly generating buttons for each movie in the array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class of movie to our button
		a.addClass("game");
		// Adding a data-attribute
		a.attr("data-name", videoGames[i]);
		// Providing the initial button text
		a.text(videoGames[i]);
		// Adding the button to the buttons-view div
		$("#buttons-view").append(a);
	}
}


// This function handles events where a video game button is clicked
$("#add-video-game").on("click", function(event) 
{

	event.preventDefault();
	// This line grabs the input from the textbox
	var game = $("#video-game-input").val().trim();

	// Adding movie from the textbox to our array
	videoGames.push(game);

	// Calling renderButtons which handles the processing of our videoGames array
	renderButtons();
});


// Adding a click event listener to all elements with a class of "game"
$(document).on("click", ".game", displayVideoGameInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();















