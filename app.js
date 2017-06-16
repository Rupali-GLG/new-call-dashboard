var     express = require('express')
        ,bodyParser = require('body-parser')
        ,exphbs = require('express-handlebars')
        ,path = require('path')
        ,http = require('http')
        ,moment = require('moment-timezone')

        ,call = require('./api/call')


var app = module.exports = express();

app.set('port', process.env.PORT || 3030);
app.locals.development = process.env.NODE_ENV === 'development';
app.locals.production = process.env.NODE_ENV === 'production';

app.set('views', __dirname + '/views');
app.engine('.html', exphbs({
    extname: '.html'
    ,partialsDir: 'views/partials'
    ,helpers: {
        formatDate: function(date, format, tzName) {
            if (!tzName)
            {
                tzName = moment.tz.guess();
                console.log ('---', tzName)
                tzName = tzName.replace(/"/g, '');
                return moment.utc(date).tz(tzName).format(format);
            }
            return moment.utc(date).format(format);
        }
    }
}));
app.set('view engine', '.html');
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'views')));


// healthcheck unauthenticated
app.get('/diagnostic', function(req, res, next) {
    var response = {
        "Call Dashboard Deployment Status": "OK",
        // "GLG Environment": process.env.NODE_ENV,
        "Last Deployed": moment().fromNow(),
        // "Worker Id": cluster.worker.id,
        // "Process ID": cluster.worker.process.pid
    };
    return res.json(response);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(cookieParser());


// parse application/json
app.use(bodyParser.json());
// app.use(methodOverride());

app.get('/details', call.getDetails)


/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function() {
    console.log('starting app--')
    console.log('Express server listening on port ' + app.get('port'));
});