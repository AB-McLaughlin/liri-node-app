//read and set environmental variables
require("dotenv").config();

//to read random.txt
var fs = require ("fs");

//keys/npm for Twitter call
var keys = require('./keys.js');
var twitter = require ("twitter");

//npm for Spotify call
var spotify = require ("node-spotify-api");

//npm for omdb
var movie = require ("request");

//set input variable
var inputOne = process.argv[2];

//set up Twitter variables/function
var twitterParams = {q: '@MamaMac01185889', count: 20};
var client = new twitter(twitter);

//TWITTER: Show last 20 tweets and when they were created (user inputs node liri.js 'my-tweets')
    function getTweets (){
            client.get( "statuses/user_timeline", twitterParams, function(error, data, response){
            if (!error){
               for (var i = 0; i < data.length; i++) {
                    console.log(" Created on: " + data[i].created_at + "\n" + "Tweet content: " + data[i].text + "\n" +"------------------------------\n");
                }
            }
            else {
                console.log (error);
            }
        })};
 
//set up Spotify variables/function
var spotify = new Spotify(keys.spotify);
var querySpotify = " ";

//SPOTIFY: Spotify-this-song show artist, song, spotify 30 sec preview, album(user inputs node liri.js spotify-this-song '<song name here>')
    function getSpotify () {
        if (inputOne !== undefined) {
            querySpotify = inputOne;
        } 
        spotify.search({type: 'track', q: querySpotify}, function(error, data){
            if (error) {
                console.log("Error occurred: " + error);
                return;
            } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            }
        })
//if no song specified, look up The Sign, Ace of Bass        
        if (inputOne === undefined) {
            querySpotify = '3DYVWvPh3kGwPasp7yjahc';
        }    
        spotify.lookup({type: 'track', id: querySpotify}, function(error, data) {
                if (error) {
                    logOutput.error(error);
                    return
                } else {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
                console.log("Album: " + data.tracks.items[0].album.name);
                }
        }    
        );
    };

//set up omdb variables/function  
var movieTitle = "";

//omdb: Movie-this shows movie data (see console.log in func for list)(user inputs node liri.js movie-this '<movie name here>')
    function getMovie() {
        if (inputOne !== undefined) {
            movieTitle = inputOne;
        }
        request('http://www.omdbapi.com/?t=' + movieTitle + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {
            if (error) {
                console.log("Error occurred: " + error);
                return;
            } else {
                if (!error && response.statusCode == 200) {
                    var movieData = JSON.parse(body);
                    console.log("Title: " + movieData.Title);
                    console.log("Year: " + movieData.Year);
                    console.log("IMDB Rating: " + movieData.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
                    console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
                    console.log("Country: " + movieData.Country);
                    console.log("Language: " + movieData.Language);
                    console.log("Plot: " + movieData.Plot);
                    console.log("Actors: " + movieData.Actors);
                }
            }
        });

    //if no movie specified, look up Mr. Nobody    
        if (inputOne === undefined) {
            queryOmdb = "Mr. Nobody";
   }
            request('http://www.omdbapi.com/?t=' + queryOmdb + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {
                if (error) {
                    console.log("Error occurred: " + error);
                    return;
                } else {
                    if (!error && response.statusCode == 200) {
                        var movieData = JSON.parse(body);
                        console.log("Title: " + movieData.Title);
                        console.log("Year: " + movieData.Year);
                        console.log("IMDB Rating: " + movieData.imdbRating);
                        console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
                        console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
                        console.log("Country: " + movieData.Country);
                        console.log("Language: " + movieData.Language);
                        console.log("Plot: " + movieData.Plot);
                        console.log("Actors: " + movieData.Actors);
                    }
                }
            });

        };
        

// Uses fs node package to take the text inside random.txt,
// and do something with it(user inputs node liri.js do-what-it-says).
function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			logOutput.error(error);
		} else {

			// Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			inputOne = randomArray[0];

			// Sets optional third argument to second item in array.
			inputTwo = randomArray[1];

			// Calls main controller to do something based on action and argument.
			doSomething(inputOne, inputTwo);
		}
	});
}
        

// Switch operation used to determine what to do (tweet, song, movie).
    function doSomething(inputOne, inputTwo) {

        switch (inputOne) {
            case 'my-tweets': 
                getMyTweets();
                break;

            case "spotify-this-song":
                
                // First gets song title argument.
                var songTitle = inputTwo;

                // If no song title provided, defaults to specific song.
                if (songTitle === "") {
                    lookupSpecificSong();

                // Else looks up song based on song title.
                } else {
                    // Get song information from Spotify.
                    getSongInfo(songTitle);
                }
                break;

                // Gets movie information.
                case "movie-this":

                // First gets movie title argument.
                var movieTitle = argument;

                // If no movie title provided, defaults to specific movie.
                if (movieTitle === "") {
                    getMovieInfo("Mr. Nobody");

                // Else looks up song based on movie title.
                } else {
                    getMovieInfo(movieTitle);
                }
                break;

                // Gets text inside file, and uses it to do something.
                case "do-what-it-says": 
                doWhatItSays();
                break;
            }
    }        









 //  * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
 //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'   <http://www.imdb.com/title/tt0485947/>
        
 // the OMDB API requires an API key. You may use `trilogy`.
        
