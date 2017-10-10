
////////////////////////////////////////////////////////
///////////// SAVING 'REQUIRES' AS LOCAL VARS ///////////////
var fs = require("fs"); //fs stands for file structure --> allows to write, read, append with native prop in node.
var keys = require("./keys.js"); //console.log'ed "keys.js is loaded"
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var pick = require('pick-function').default(); //HOW DO I USE THIS CORRECTLY???


///////////// NODE CONTENT VARS /////////////////////////
var action = process.argv[2];
var content = process.argv[3];

var userInput = function(argOne, argTwo) { //NODE 'PIPELINE' FUNC.
	userChoice(argOne, argTwo);
}

///////////////// FILE: "DO WHAT IT SAYS" FUNCTION ////////////////////////	
function followMeFunction() {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  // If there's an error reading the textFile, we log it and return immediately
	  if (error) {
	    return console.log(error);
	  }
	  else {
	  	var dataArray = data.split(",");
	  	if (dataArray.length == 2) {
	  		pick(dataArray[0], dataArray[2]);
	  	}
	  	else if (dataArray.length == 1) {
	  		pick(dataArray[0]);
	  	}
	  }	  
	 });
}

///////////////// MOVIE FUNCTION ////////////////////////	
function movieDisplay(title) {
	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title + "&y=&plot=short&r=json", function (error, response, body) {
		if(error){
	  		console.log('error:', error); // Print the error if one occurred..
	  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received..
		}
		else {
		    console.log("Finding your movie...");
		    var bodyParsed = JSON.parse(body);
		    // console.log(bodyParsed);
		    // for (var i = 0; i < bodyParsed.length; i++) {
		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("--------------------------------------------------");
		    // console.log(i + 1)
		    // console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Movie TitLe: " + bodyParsed.Title);
		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Released: " + bodyParsed.Year);
		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Rating: " + bodyParsed.Rated);
		    console.log(" "); //THIS WILL GENEREATE A SPACE
           
           	if (bodyParsed.Ratings[1] == undefined) {
               	console.log("Rotten Tomatoes Rating: None available ")
          	}
          	else {
 	        	console.log("Rotten Tomatoes Rating: " + bodyParsed.Ratings[1].Value);
          	}

		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Country of Origin: " + bodyParsed.Country);
		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Languages Available: " + bodyParsed.Language);
		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Plot " + bodyParsed.Plot);
		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("Actors: " + bodyParsed.Actors);
		    console.log("--------------------------------------------------");
		    // }
		}
	});
}

//////////// SPOTIFY FUNCTION/////////////////////////////
var artistName = function (artist) { // !!!! REVIEW where ARTIST IS coming from...
	return artist.name;
}

function spotifyDisplay(song) {
	// var spotify = new Spotify(keys.spotifyKeys);
    var spotify = new Spotify({
        id: "90a2665fc487482fb24c43e541b53780",
		secret: "a353766e92b548038006db75f9139391",
    });

    spotify.search({ type: "track", query: song }, function(error, data) {
        if (!song) { // !!!! WHY IS THIS NOT RESPONDING...????
        	song = "The Sign";
        	spotifyDisplay(song);
        }
        else if (error){
        	return console.log("Error occured! Check it out: " + error);
        }
        else {
            console.log("Searching your song...");
            // console.log(data.tracks.items[0]);
            for (var i = 0; i < data.tracks.items.length; i++) {
            	console.log(" "); //THIS WILL GENEREATE A SPACE
            	console.log("--------------------------------------------------");
            	console.log(i+1)
            	console.log(" "); //THIS WILL GENEREATE A SPACE
                console.log("Arists: " + data.tracks.items[i].artists.map( artistName ));
                console.log(" "); //THIS WILL GENEREATE A SPACE
                console.log("Song Name: " + data.tracks.items[i].name);
                console.log(" "); //THIS WILL GENEREATE A SPACE
                
                if (data.tracks.items[i].preview_url == null) {
                	console.log("Preview URL: None available ")
                }
                else {
                	console.log("Preview URL: " + data.tracks.items[i].preview_url);
                }

		  		console.log(" "); //THIS WILL GENEREATE A SPACE
		  		console.log("Album Name: " + data.tracks.items[i].album.name);
		  		console.log("--------------------------------------------------");
            }
        }
    });
}

///////////////// TWITTER FUNCTION ////////////////////////	
function tweetDisplay() {
	// var client = new Twitter(keys.twitterKeys); // !!!! THIS SHOULD BE THE SAME AS BELOW, AS THE INFO IS STORED IN KEYS.JS >> BUT NEITHER IS WORKING!!
    var client = new Twitter({
        consumer_key: "kjJ5Ag6CNEw0EbfYHjaI0jZj5",
        consumer_secret: "h2yfNZ6FWWjHrmbRIcG4yqpdoE0V8NOhpxmKgCdsvxNWU2d5C8",
        access_token_key: "720340163725959168-ATPAvxKVU59ybMi3dvGpOcPG2elBor7",
        access_token_secret: "4MQ9HNo5pFMiN38cKNxR88E4uJAC5qCx2iA0qOEtixvCX",
    });
    var params = { screen_name: "jettTech" };

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        console.log("trying to tweet...")
        if (error) { //"ERROR-FIRST function"
            console.log(error);
        } 
        else {
            console.log("Finding your tweets...");
            for (var i = 0; i < tweets.length; i++) {
         		console.log(" "); //THIS WILL GENEREATE A SPACE
            	console.log("--------------------------------------------------");
                console.log(i+1);
                console.log(" "); //THIS WILL GENEREATE A SPACE
                console.log("Time of Tweet: " + tweets[i].created_at);
                console.log(" "); //THIS WILL GENEREATE A SPACE
                console.log("Tweet Content: " + tweets[i].text);
                console.log("--------------------------------------------------");
            }
        }
    });
}

///////////// ORGANIZATIONAL LOGIC: USING NODE INPUT TO DETERMINE OUTCOME ///////////////
userInput(action, content);
function userChoice (actionChoice, dataResponse) {
	switch (actionChoice) {
		case "my-tweets":
			tweetDisplay();
			// var tweetyTweets = new tweetDisplay();
			// fs.writeFile("log.txt", "New Data Added: " + tweetyTweets, function(error) {
			// 	if(error){
			// 		return console.log("There is an FS error: " + error);
			// 	}
			// 	else{
			// 		console.log("The log.txt file has been updated with search contents.")
			// 	}
			// });			
			break;
		case "spotify-this-song":
			spotifyDisplay(dataResponse);
			// var spotSongs = new spotifyDisplay(dataResponse);
			// fs.writeFile("log.txt", "New Data Added: " + spotSongs, function(error) {
			// 	if(error){
			// 		return console.log("There is an FS error: " + error);
			// 	}
			// 	else{
			// 		console.log("The log.txt file has been updated with search contents.")
			// 	}
			// });					
			break;
		case "movie-this":
			movieDisplay(dataResponse);
			// var movieSearch = new movieDisplay(dataResponse);
			// fs.writeFile("log.txt", "New Data Added: " + movieSearch, function(error) {
			// 	if(error){
			// 		return console.log("There is an FS error: " + error);
			// 	}
			// 	else{
			// 		console.log("The log.txt file has been updated with search contents.")
			// 	}
			// });			
			break;
		case "do-what-it-says":
			followMeFunction();
			// var textData = new followMeFunction();
			// fs.writeFile("log.txt", "New Data Added: " + textData, function(error) {
			// 	if(error){
			// 		return console.log("There is an FS error: " + error);
			// 	}
			// 	else{
			// 		console.log("The log.txt file has been updated with search contents.")
			// 	}
			// });
			break;
		default:
			console.log("That's not a LIRI command! Please choose between: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'!");
	}
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////