// requires modules and port===================================================
var express         = require('express'),
    passport        = require('passport'),
    requestHandlers = require('./requestHandlers'),
    port            = 8080;

// configures app =============================================================
var app = express();

app.configure(function() {

  // configures Express
  app.use(express.logger('dev')); 
  app.use(express.bodyParser()); 
  app.use(express.cookieParser());

  // configures Passport
  app.use(express.session({ secret: 'Cho Kim' }));
  app.use(passport.initialize());
  app.use(passport.session()); 

  // configures Passport-Twitter
  require('./config/passport_twitter');
    
  // configures EJS
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
});

// defines routes =============================================================
app.get('/', requestHandlers.index);
app.get('/auth/twitter', requestHandlers.authTwitter);
app.get('/auth/twitter/callback', requestHandlers.authTwitterCallback);
app.get('/profile', requestHandlers.profile);
app.get('/logout', requestHandlers.logout);

// starts server ==============================================================
app.listen(port, function() {
  console.log('Listening on port ' + port);
});