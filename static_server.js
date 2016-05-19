var newrelic = require('newrelic');
var config = require('config');
var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');


const PORT = process.env.PORT || config.get('port');
const PUBLIC_DIR_PATH = path.resolve('public');

var app = express();

/* Setup logging middleware */

// Use Apache style log format
var loggingFormat = config.get('logging_format');

// Setup logging to a file in log/
var logFileName = config.get('log_file_name');

var logFileStream = fs.createWriteStream(
  path.resolve('log/' + logFileName), {flags: 'a'}
);

// Insert file-based logging middleware into `app`
app.use(morgan(loggingFormat, {stream: logFileStream}));
// Insert STDOUT-based logging middleware into `app`
app.use(morgan(loggingFormat));


/* Setup jade templating */

app.set('view engine', 'jade');


/* Make 'newrelic' available to templates */

// In Express, this lets you call newrelic from within a template.
app.locals.newrelic = newrelic;


/* Setup routes */

// Set the static assets directory
app.get('/robots.txt', express.static(PUBLIC_DIR_PATH));
app.get('/favicon.ico', express.static(PUBLIC_DIR_PATH));
app.get('/static*', express.static(PUBLIC_DIR_PATH));

// All superuser routes cause views/superuser.jade to be rendered
app.get('/superuser*', function(request, response) {
  response.render('superuser',
    {
      development: config.get('development'),
      server_base_url: config.get('server_base_url'),
      google_analytics_tracking_id: config.get('google_analytics_tracking_id')
    }
  );
});

// Redirect all /admin routes to /superuser
app.get('/admin*', function(request, response) {
  response.redirect('/superuser');
});

// All teacher routes cause views/teacher.jade to be rendered
app.get('/teacher*', function(request, response) {
  response.render('teacher',
    {
      development: config.get('development'),
      server_base_url: config.get('server_base_url'),
      google_analytics_tracking_id: config.get('google_analytics_tracking_id')
    }
  );
});

// All other routes cause views/index.jade to be rendered
app.get('*', function(request, response) {
  response.render('index',
    {
      development: config.get('development'),
      server_base_url: config.get('server_base_url'),
      google_analytics_tracking_id: config.get('google_analytics_tracking_id')
    }
  );
});


/* Start listening to `port` with this Express app */

app.listen(PORT);
console.log("Listening on port " + PORT + ", press ^c to quit.")
