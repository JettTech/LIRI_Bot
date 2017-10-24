
///////////// SAVING 'REQUIRES' AS LOCAL VARS ///////////////
var fs = require("fs"); //fs stands for file structure --> allows to write, read, append with native prop in node.
var keys = require("./keys.js"); //console.log'ed "keys.js is loaded"
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');


///////////// NODE CONTENT VARS /////////////////////////
var action = process.argv[2];
var content = process.argv[3];

var userInput = function(argOne, argTwo) { //NODE 'PIPELINE' FUNC.
	userChoice(argOne, argTwo);
}

////////////////////////////////////////////////////////
///////////////// FILE: "DO WHAT IT SAYS" FUNCTION ////////////////////////	
function followMeFunction( 	) {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }
	  else {
	  	console.log(data);
	  	var dataArray = data.split(","); //SPLITTING the content ON the COMMA!!!!
	  	if (dataArray.length == 2) {
	  		userInput(dataArray[0], dataArray[1])
	  	}
	  	else if (dataArray.length == 1) {
			userInput(dataArray[0])

	  	}
	  }	  
	 });
}
/////////////// WRITE TO LOG.TXT FUNCTION ////////////////////////////
var writeToLog = function(dataResults) {
  fs.appendFile("log.txt", "\r\n\r\n"); //This will generate an empty space between the logged characters!!

  //PERSONAL NOTE for above: \r = CR (Carriage Return) // Used as a new line character in Mac OS before X
  	  // \n = LF (Line Feed) // Used as a new line character in Unix/Mac OS X
	  // \r\n = CR + LF // Used as a new line character in Windows

fs.appendFile("log.txt", JSON.stringify(dataResults), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
};

///////////////// MOVIE FUNCTION ////////////////////////	
function movieDisplay(title="Mr. Nobody") {
	//this.title = title || "Mr. Nobody";
	if (title === "Mr. Nobody") {
		console.log("You didn't choose a movie, so we chose for you! :-P  Better luck next time!!")
	}

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title + "&y=&plot=short&r=json", function (error, response, body) {
		// if (body.Ratings === null) { //!!!REWORK THIS!!!
		// 	console.log("That's not a movie we know... Try again!");
		// 	return;
		// }
		// else if (error) {
		if (error) {
	  		console.log('error:', error); // Print the error if one occurred..
	  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received..
		}
		else {
			var num = 0;
			console.log("Finding your movie...");
			var bodyParsed = JSON.parse(body);
			// console.log(bodyParsed); //Basic Object Review
			
			var dataResults = {
			   	NUMBER: num += 1,
			    TITLE: bodyParsed.Title,
			    RELEASED: bodyParsed.Year,
			    RATING: bodyParsed.Rated,
			    ORIGIN: bodyParsed.Country,
			    LANGUAGES: bodyParsed.Language,
			    ACTORS: bodyParsed.Actors,			    
			    PLOT: bodyParsed.Plot,
			}
			writeToLog(dataResults);

		    console.log(" "); //THIS WILL GENEREATE A SPACE
		    console.log("--------------------------------------------------");
		    console.log(dataResults.NUMBER);
		    console.log("Movie TitLe: " + dataResults.TITLE);
		    console.log("Released: " + dataResults.RELEASED);
		    console.log("Rating: " + dataResults.RATING);
	       	if (bodyParsed.Ratings[1] == undefined) {
	          	console.log("Rotten Tomatoes Rating: None available ");
	      	}
	      	else {
	        	console.log("Rotten Tomatoes Rating: " + bodyParsed.Ratings[1].Value);
         	}
		    console.log("Country of Origin: " + dataResults.ORIGIN);
		    console.log("Languages Available: " + dataResults.LANGUAGES);
		    console.log("Actors: " + dataResults.ACTORS);		    
		    console.log("Plot: " + dataResults.PLOT);
		    console.log("--------------------------------------------------");
		}
	});
}

//////////// SPOTIFY FUNCTION/////////////////////////////
var artistName = function (artist) { // !!!! artist is the parameter that allows whatever work (artist) is pushed into the function in a different scope, to be plugged into this function and run accordingly.
	return artist.name;
}

function spotifyDisplay(song="The Sign") { //This will search the song that was piped in, IF PROVIDED, OR will set song to be "the sign," if NOTHING was PROVIDED!
	if (song === "The Sign") {
		console.log("You didn't choose a song, so we chose for you! ;-)  Better luck next time!!")
	}

	// var spotify = new Spotify(keys.spotifyKeys); //!!!!!ASK COLE... WHY DOES THIS NOT WORK.
    var spotify = new Spotify({
        id: "90a2665fc487482fb24c43e541b53780",
		secret: "a353766e92b548038006db75f9139391",
    });

    spotify.search({ type: "track", query: song }, function(error, data) {
      	if (data.tracks.total === 0) {
			console.log("That's not a song we know... Try again!");
			return;
		}
		else if (error){
        	return console.log("Error occured! Check it out: " + error);
        }
        else {
            console.log("Searching your song...");
            // console.log(data); //Basic Object Review
            // console.log(data.tracks.items[0]); //Basic Object - index position "0" Review;

            var dataArr = [];
            for (var i = 0; i < data.tracks.items.length; i++) {
            	dataArr.push({
	            	NUMBER: i+1,
	      			ARTIST: data.tracks.items[i].artists.map(artistName),
				    SONG: data.tracks.items[i].name,
				    // URL: data.tracks.items[i].preview_url,			    
				    ALBUM: data.tracks.items[i].album.name,
            	})
            }
            writeToLog(dataArr);

            for (var i = 0; i < data.tracks.items.length; i++) {
	            console.log(" "); //THIS WILL GENEREATE A SPACE
	           	console.log("--------------------------------------------------");
	           	console.log(i+1) //why does referencing "dataArr.NUMBERS" (instead of rewriting above) NOT WORK (...and the same for the following?)!!!!!
	     	    console.log("Arists: " + data.tracks.items[i].artists.map(artistName));
	       	    console.log("Song Name: " + data.tracks.items[i].name);
	           	if (data.tracks.items[i].preview_url === null) {
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
	//var client = new Twitter(keys.twitterKeys); // !!!! THIS SHOULD BE THE SAME AS BELOW, AS THE INFO IS STORED IN KEYS.JS >> BUT NEITHER IS WORKING!!
    var client = new Twitter({
        consumer_key: "BhFf2hobH0EcllnhN0RJOAd0D",
        consumer_secret: "E119h9zgCtNEdFPh5waGtWseRHNJUOdok2U4HLksBa4qsJp2XF",
        access_token_key: "720340163725959168-ATPAvxKVU59ybMi3dvGpOcPG2elBor7",
        access_token_secret: "4MQ9HNo5pFMiN38cKNxR88E4uJAC5qCx2iA0qOEtixvCX"
    });
    var params = {screen_name: "jetton_Lisa", count: 20};

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        console.log("trying to tweet...")
        if (error) { //"ERROR-FIRST function"
            console.log(error);
        } 
        else {
            console.log("Finding your tweets...");

            var dataArr = [];
            for (var i = 0; i < tweets.length; i++) {
            	// var date = moment(tweets[i].created_at, "YYYY-MM-DD HH:mm"); //Ask TA how to integrate Moments.js to change Date Format/Displayed
            	dataArr.push({
	                NUMBER: i+1,
	                TIME: tweets[i].created_at, //"date" --> once the moments npm string structure is configured properly
	                CONTENT: tweets[i].text,
            	});
            }
            writeToLog(dataArr);
            for (var i = 0; i < tweets.length; i++) {
	            console.log(" "); //THIS WILL GENEREATE A SPACE
		       	console.log("--------------------------------------------------");
		      	console.log(dataArr[i].NUMBER);
				console.log("Time of Tweet: " + dataArr[i].TIME);
		      	console.log("Tweet Content: " + dataArr[i].CONTENT);
		      	console.log("--------------------------------------------------")
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
			movieDisplay(dataResponse);	//FIGURE OUT WHAT TO DO WHEN THE SONG IS MUTIPLE NAMES/WORDS!		
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