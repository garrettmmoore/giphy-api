// Initial array of video games
var videoGames = ["Pokemon", "Overwatch", "Halo 5", "Super Smash Brothers", "The Legend of Zelda",
	"Mario 64", "Super Metroid", "Street Fighter", "Elder Scrolls", "Crash Bandicoot", "League of Legends",
	"Player Unknown's Battlegrounds", "Dota 2", "Splatoon 2", "Tekken 7", "Kingdom Hearts", "Mario Kart",
	"Donkey Kong Country", "Tony Hawk's Pro Skater"
];

// displayVideoGameInfo function re-renders the HTML to display the appropriate content
function displayVideoGameInfo() {
	var game = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=ca85b3600e244eb399b02146bb569377&limit=12";

	$.ajax({
			url: queryURL,
			method: "GET"
		})

		.done(function (response) {
			console.log(queryURL);
			console.log(response);

			// clear the contents
			$("#video-game-view").empty();

			var results = response.data;

			// Looping through each result item
			for (var j = 0; j < results.length; j++) {
				var videoGameDiv = $("<div class = 'col-md-4'>");

				// Creating a paragraph tag with the result item's rating
				var p = $("<p id = ratingText>").text("Rating: " + results[j].rating);

				var gameImage = $('<img>');

				// Setting the attributes of the image to a property
				gameImage.attr("src", results[j].images.fixed_height_still.url);
				gameImage.attr("data-still", results[j].images.fixed_height_still.url);
				gameImage.attr("data-animate", results[j].images.fixed_height.url);
				gameImage.attr("data-state", "still");
				gameImage.addClass("gif", results[j]);

				// Appending the paragraph and image tag to the videoGameDiv
				videoGameDiv.append(p);
				videoGameDiv.append(gameImage);

				$("#video-game-view").append(videoGameDiv);
			}

			$(".gif").on("click", function () {
				var state = $(this).attr("data-state");

				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			});
		});
}

// Function for displaying video game data
function renderButtons() {
	$("#buttons-view").empty();

	for (var i = 0; i < videoGames.length; i++) {
		var a = $("<button>");

		a.addClass("game");

		a.attr("data-name", videoGames[i]);

		a.text(videoGames[i]);

		$("#buttons-view").append(a);
	}
}

// This function handles events where a video game button is clicked
$("#add-video-game").on("click", function (event) {
	event.preventDefault();

	// This line grabs the input from the textbox
	var game = $("#video-game-input").val().trim();

	videoGames.push(game);

	renderButtons();
});

// Adding a click event listener to all elements with a class of "game"
$(document).on("click", ".game", displayVideoGameInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();