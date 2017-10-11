
////////////////////////////////////////////////////////
///////////// SAVING 'REQUIRES' AS LOCAL VARS ///////////////
var fs = require("fs"); //fs stands for file structure --> allows to write, read, append with native prop in node.
var keys = require("./keys.js"); //console.log'ed "keys.js is loaded"
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// var pick = require('pick-function').default(); //HOW DO I USE THIS CORRECTLY??? //ALTERNATIVE METHOD


///////////// NODE CONTENT VARS /////////////////////////
var action = process.argv[2];
var content = process.argv[3];

var userInput = function(argOne, argTwo) { //NODE 'PIPELINE' FUNC.
	userChoice(argOne, argTwo);
}

///////////////// FILE: "DO WHAT IT SAYS" FUNCTION ////////////////////////	
function followMeFunction() {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }
	  else {
	  	console.log(data);
	  	var dataArray = data.split(","); //SPLITTING the content ON the COMMA!!!!
	  	if (dataArray.length == 2) {
	  		userInput(dataArray[0], dataArray[1])
	  	// 	pick(dataArray[0], dataArray[1]); //HOW DO I USE THE "PICK" CORRECTLY??? //ALTERNATIVE METHOD.
	  	}
	  	else if (dataArray.length == 1) {
			userInput(dataArray[0])
	  	// 	pick(dataArray[0]); //HOW DO I USE THE "PICK" CORRECTLY??? //ALTERNATIVE METHOD

	  	}
	  }	  
	 });
}

///////////////// MOVIE FUNCTION ////////////////////////	
function movieDisplay(title) {
	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title + "&y=&plot=short&r=json", function (error, response, body) {
		if (error){
	  		console.log('error:', error); // Print the error if one occurred..
	  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received..
		}
		else if (body.Title == undefined) {
			console.log("We could not find your movie choice.");
			userInput("movie-this", "Mr. Nobody"); //WHY DOESN'T THIS WORK AS DEFAULT????
		}
		else {
			var n = 0;
			var movieResults = function(title) {
				console.log("Finding your movie...");
			    var bodyParsed = JSON.parse(body);

			    // console.log(bodyParsed); //Basic Object Review

			    // for (var i = 0; i < bodyParsed.length; i++) { //How do this search... if there are MULTIPLE MOVIES with the same title?
			    console.log(" "); //THIS WILL GENEREATE A SPACE
			    console.log("--------------------------------------------------");
			    // console.log(i + 1);
			    console.log(n += 1)
			    console.log("Movie TitLe: " + bodyParsed.Title);
			    console.log("Released: " + bodyParsed.Year);
			    console.log("Rating: " + bodyParsed.Rated);
	
	           	if (bodyParsed.Ratings[1] == undefined) {
	               	console.log("Rotten Tomatoes Rating: None available ")
	          	}
	          	else {
	 	        	console.log("Rotten Tomatoes Rating: " + bodyParsed.Ratings[1].Value);
	          	}

			    console.log("Country of Origin: " + bodyParsed.Country);
			    console.log("Languages Available: " + bodyParsed.Language);
			    console.log("Plot " + bodyParsed.Plot);
			    console.log("Actors: " + bodyParsed.Actors);
			    console.log("--------------------------------------------------");
			    // }

			    fs.appendFile("log.txt", "New Data Added: " + movieResults, function(error) { //Testing out the EXTRA CREDIT FUNCTION... look into
					if(error){
						return console.log("There is an FS error: " + error);
					}
					else{
						console.log("The log.txt file has been updated with search contents.")
					}
				});
			}
			movieResults();
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
        if (!song) { 
        	song = "The Sign"; // !!!! WHY IS THIS NOT RESPONDING...????
        	spotifyDisplay(song);
        }
        else if (error){
        	return console.log("Error occured! Check it out: " + error);
        }
        else {
            console.log("Searching your song...");
            // console.log(data.tracks.items[0]); //Basic Object Review
            for (var i = 0; i < data.tracks.items.length; i++) {
            	console.log(" "); //THIS WILL GENEREATE A SPACE
            	console.log("--------------------------------------------------");
            	console.log(i+1)
                console.log("Arists: " + data.tracks.items[i].artists.map( artistName ));
                console.log("Song Name: " + data.tracks.items[i].name);
                
                if (data.tracks.items[i].preview_url == null) {
                	console.log("Preview URL: None available ")
                }
                else {
                	console.log("Preview URL: " + data.tracks.items[i].preview_url);
                }

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
    var params = {screen_name: "jettTech"};

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
                console.log("Time of Tweet: " + tweets[i].created_at);
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
			break;
		case "spotify-this-song":
			spotifyDisplay(dataResponse);				
			break;
		case "movie-this":
			movieDisplay(dataResponse);			
			break;
		case "do-what-it-says":
			followMeFunction();
			break;
		default:
			console.log("That's not a LIRI command! Please choose between: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'!");
	}
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////