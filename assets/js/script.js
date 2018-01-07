$('#recipe-click').on('click', function() {
  event.preventDefault();

  $('#gif-results').children().remove();


  var recipe = $('#recipe-search').val().trim();
  recipe = recipe.replace(/\s/gi, '+');

  // Adjust this based on search
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + 'recipes+' +
    recipe + '&limit=10' + '&api_key=dc6zaTOxFJmzC';

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var textP = $('<p>')
      textP.text(i);

      var gifDiv = $("<div class='item'>");

      // Creating an image tag
      var personImage = $('<img>');

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      personImage.attr('src', results[i].images.fixed_width.url);

      // Appending the paragraph and personImage we created to the "gifDiv" div we created
      gifDiv.append(personImage);
      gifDiv.append(textP);



      $('#gif-results').prepend(gifDiv);
    }

    console.log(results);
  });

});
