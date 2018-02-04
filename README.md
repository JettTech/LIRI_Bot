# LIRI_Bot
A command line Node.js application named LIRI. LIRI stands for Language Interpretation and Recognition Interface, and will provide responses to your set of written questions or commands regarding the current user's Spotify and Twitter accounts, in addition to any cinema inquiries.  This app relies on three APIs for infomration: Spotify API, Twitter API, and OMDB API.

![](https://media.giphy.com/media/rfrorH5zTvZpC/giphy.gif)

![Alt text](./public/images/SCREENSHOT_img_GOES_HERE.png?raw=true "Optional Title")

# liri-node-app

In this assignment, I made a command line node application called LIRI. 
LIRI is a Language Interpretation and Recognition Interface. 

- - - -
 ### Getting Started: ###

Run command 'node liri.js' or one of the commands below.
- - - -


 ### Each Command: ###

**Twitter API:** 
When a user types "my-tweets", the application will retrieve my most recent, 20 Twitter tweets. 

**Spotify API:**
When a user types "spotify-this-song SONG NAME", the application will retrieve the following: 

- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from
- If no song is provided then your program will default to "The Sign" by Ace of Base.

**OMDB API:**
When a user types "movie-this MOVIE TITLE", the terminal will output the following: 

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
-  Actors in the movie.

Lastly, if the user types "do-what-it-says", the terminal will output the song details for Backstreet Boys' "I Want it That Way."

Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.
Or if no movie is passed through, it will default to "Mr. Nobody"

node liri.js do-what-it-says
Takes the text from random.txt and runs the song through spotify-this-song command

Built by [Lisa Jetton](https://github.com/JettTech/).
