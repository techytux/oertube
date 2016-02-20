var express = require('express')
var bodyParser = require('body-parser')

/* var databaseUrl = "mongodb://localhost:2700,primary.b2db.mixd.tv,secondary1.b2db.mixd.tv/editorial_prod?readPreference=primaryPreferred"; */
var editorialDatabaseUrl = "mongodb://localhost:27000/editorial_prod";
var editorialCollections = ["highlights", "highlights_lists", "vod_highlights", "vod_highlights_lists"];
var mongojs = require("mongojs")
var editorialDB = mongojs(editorialDatabaseUrl, editorialCollections);

var mediaDatabaseUrl = "mongodb://localhost:27000/media_prod";
var mediaCollections = ["puls_hackday"];
// var mediaCollections = ["vod_maxdome", "epg_extended", "epg_raw", "matched_tmdb_catalog"];
var mediaDB = mongojs(mediaDatabaseUrl, mediaCollections);


/**********************************************************************************************************************/
/* Helper *************************************************************************************************************/
/**********************************************************************************************************************/
var TimestampUtils = {

    /**
     * Converts javascript time (which is in milliseconds)
     * to a unix timestamp in seconds.
     * @param {Object} timestampInMillis
     */
    toUnixTimestamp : function(timestampInMillis) {
        if (typeof timestampInMillis != 'number' || timestampInMillis < 0) {
            throw new Error("Invalid input time in milliseconds: " + timestampInMillis);
        }

        try {
            return parseInt((timestampInMillis / 1000), 10);
        } catch(e) {
            throw new Error("Invalid input time in milliseconds: " + timestampInMillis);
        }
    },

   /**
     * Converts unix timestamp (which is in seconds)
     * to a javascript timestamp in milliseconds.
     * @param {Object} timestampInSeconds
     */
    toJSTimestamp : function(timestampInSeconds) {
        if (typeof timestampInSeconds != 'number' || timestampInSeconds < 0) {
            throw new Error("Invalid input time in seconds: " + timestampInSeconds);
        }
        return (timestampInSeconds * 1000);
    }

};
/**********************************************************************************************************************/

var app = express()
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send({
        'result': 'error',
        'msg': {
            'error': "API endpoint missing",
            'Anyway': "welcome to the BR Puls Hackday API"
        }
    });
})

app.get('/lists', function(req, res) {
    res.send({
        'result': 'succcess',
        'msg': {
        }
    });
})

app.listen(3000, function(){
    console.log('Server listening on', 3000)
})
