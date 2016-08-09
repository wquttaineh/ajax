$(document).ready(function(){	
	
		buttonsArray = ["Cats ", " Dogs "," Horses ", " Monkeys ", " Pigs ", " Snakes ", " Bears ", " Lions ", " Tigers "];


	for (var i = 0; i < buttonsArray.length; i++) {
	var button = $('<button/>').html(buttonsArray[i]).appendTo($('#animalButtons'));

	}
		$(document.body).on('click', 'button', function(){
			$('#animals').empty();
			var whatWillShow = $(this).html().trim();
			console.log("Button Click Function: " + $(this));
			var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + whatWillShow + '&api_key=dc6zaTOxFJmzC&limit=10';
			console.log("Gifs Link: " + queryURL);

			$.ajax({url: queryURL, method: "GET" })
				.done(function(response){
					console.log("Done Function: " + response);
					var result = response.data;
					for (var i = 0; i < result.length; i++) {
						
					
						var image = $('<img>').addClass('img').attr('src', result[i].images.fixed_height_still.url).attr('data-still',result[i].images.fixed_height_still.url).attr('data-moving',result[i].images.fixed_height.url).attr('data-state','still');
						console.log("IMAGE " + image);
						var text = $('<p>').text("Rating: " + result[i].rating);
						console.log("TEXT" + text);
						$('#animals').prepend(text);
						$('#animals').prepend(image);
					}
				});	
		});

		// for (var i = 0; i < buttonsArray.length; i++) {
			
		// }
		// On click function for my input text box
		$(document.body).on('click', '.addButton', function(){
			var buttonVal = $('#inputBox').val()
			$('#inputBox').val("")
			buttonsArray.push(buttonVal);
			$('#inputBox').append(buttonVal);
			var button = $('<button/>').html(buttonVal).appendTo($('#animalButtons'));
			console.log(buttonVal);
			console.log(buttonsArray)
			return false;
		})

		// Here is my on click function for my gifs
		$(document.body).on('click', '.img', function(){
			var state = $(this).attr('data-state');
			console.log("Second This " + $(this).attr('data-state'));
			if (state != 'still'){
					$(this).attr('src', $(this).data('still'));
					$(this).data('state', 'still');
					console.log("if statement ");
			}else {
					$(this).attr('src', $(this).data('moving'));
					$(this).data('state', 'moving');	
					console.log("else statement ");
					console.log($(this).attr('data-state', 'data-moving'));				
					console.log(this);
					console.log($(this).attr('src', $(this).attr('moving')));
			};
		});
});