const Twitter = require('twitter');
const cors = require('cors')
const express = require('express')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const app = express();
const PORT = 8080
const myapikey = require('./keys.js')


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());



// My Twitter API AND SECRET KEY INFO
let client = new Twitter({
    consumer_key: myapikey.consumer_key,
    consumer_secret: myapikey.consumer_secret,
    access_token_key: myapikey.access_token_key,
    access_token_secret: myapikey.access_token_secret
});

//IBM WATSON API INFO
let tone_analyzer = new ToneAnalyzerV3({
    username: myapikey.username,
    password: myapikey.password,
    version_date: '2016-05-19',
    headers: {
        'X-Watson-Learning-Opt-Out': 'true'
    }
});

//making the IBM request

app.get('/soccer/:tweet', (req, res) => {
    console.log(req.params.tweet, 'this is what watson is getting')
    let params = {
        // Get the text from the JSON file.
        text: req.params.tweet,
        tones: 'emotion',

    };
    tone_analyzer.tone(params, function(error, response) {
        if (error)
            console.log('error:', error);
        else
            console.log(JSON.stringify(response, null, 2));
        res.json(response.document_tone.tone_categories[0])
    }
    );
})
//  let params = {
//     // Get the text from the JSON file.
//     text: require('tone.json').text,
//     tones: 'emotion'
//   };

//   tone_analyzer.tone(params, function(error, response) {
//     if (error)
//       console.log('error:', error);
//     else
//       console.log(JSON.stringify(response, null, 2));
//     }
//   );



// app.get('/chelsea', (req, res) => {
//     let stream = client.stream('statuses/filter', {
//         track: 'chelsea fc'
//     });
//     stream.on('data', function(event) {
//         console.log(event && event.text);
//     });

//     stream.on('error', function(error) {
//         throw error;
//     });

// })

let teamTweets = app.get('/chelsea', (req, res) => {
    client.get('/search/tweets', {
        q: '@chelseaFC',
        // count: 2,
        result_type: 'recent'
    }, function(error, tweets, response) {
        if (error) {
            throw error;
        } else {
            // console.log('these are the tweets', tweets); // The favorites. 
            // console.log(response); // Raw response object. 

            res.json({
                nameTweet: tweets.statuses[0].user.name,
                tweetText: tweets.statuses[0].text,
                userImage: tweets.statuses[0].user.profile_image_url,
                userLocation: tweets.statuses[0].user.location
            })
        }


    });


})



// “username”: “6ed0d364-94dc-4ea3-a7f8-a404cbcb2cf1",
// “password”: “RMV6z58x5q3N”


















app.listen(PORT, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});
