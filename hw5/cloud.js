// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
			parseResponse(data);
		},'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

// Search event handler - sends search text to the callAPI function
function search() {
	searchText = $('#search').val();
	callAPI(searchText);
}

// Event hander for calling the SoundCloud API using the user's search query
function getRelatedSongs(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '20'},
		function(data) {
			parseResponse(data);
		},'json'
	);
}

// Parses response received from Soundcloud and appends it as a list item inside response div
function parseResponse(response) {
	var output="<ul>";
	$.each(response, function(key, value) {
		sessionStorage.setItem('song', 'value');
		output+="<li>" + "<img class='chathead' src=" + value.user.avatar_url + "/>" 
			+ "<div class='play' name=" + value.permalink_url + " onclick='play(this);'><i class='fa fa-play'></i></div>" 
			+ "<div class='up' onclick='moveUp(this);'><i class='fa fa-arrow-up'></i></div>"
			+ "<div class='up' onclick='moveDown(this);'><i class='fa fa-arrow-down'></i></div>"
			+ "<div class='add' onclick='add(this.parentNode);'><i class='fa fa-plus'></i></div>" + 
			"<h3>" + value.title + "</h3>" + "<p>" + value.user.username + "</p>" + "</li>";
	});
	output+="</ul>";
	$('#response').html(output);
}

// when play button is clicked it extracts the song permalink from name attribute and passes it to changeTrack function
function play(song) {
	url = song.attributes["name"].value;
	console.log(sessionStorage)
	changeTrack(url);
}

// clone result before adding it to the top of the playlist div also modify the plus button to a remove button
function add(itm) {
	var cln = itm.cloneNode(true);
	$('#playlist ul').prepend(cln);
	$('#playlist ul li div.add i').attr("class","fa fa-minus");
	$('#playlist ul li div.add').attr("onclick","minus(this.parentNode)");
}

// remove the li item for which remove button was clicked 
function minus(itm) {
	itm.parentNode.removeChild(itm);
}

function moveUp(itm) {
   	$(itm).parent().insertBefore($(itm).parent().prev());
}

function moveDown(itm) {
   	$(itm).parent().insertAfter($(itm).parent().next());
}