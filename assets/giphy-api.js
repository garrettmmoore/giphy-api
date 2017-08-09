// Initial array of video games
var videoGames = ["Crash Bandicoot", "Overwatch", "Halo 5", "Super Smash Brothers", "The Legend of Zelda", 
				"Mario 64", "Super Metroid", "Street Fighter", "Elder Scrolls", "Pokemon", "League of Legends",
				"Player Unknown's Battlegrounds", "Dota 2", "Splatoon 2", "Tekken 7", "Kingdom Hearts", "Mario Kart",
				 "Donkey Kong Country", "Tony Hawk's Pro Skater"];


// displayVideoGameInfo function re-renders the HTML to display the appropriate content
function displayVideoGameInfo() 
{
	var game = $(this).attr("data-name");
  	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=ca85b3600e244eb399b02146bb569377&limit=12";

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
			var videoGameDiv = $("<div class = 'col-md-4'>");

			// Creating a paragraph tag with the result item's rating
			var p = $("<p id = ratingText>").text("Rating: " + results[j].rating);

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
			var state = $(this).attr("data-state");

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
		var a = $("<button>");

		a.addClass("game");

		a.attr("data-name", videoGames[i]);

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















