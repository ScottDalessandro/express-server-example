const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // sets the templating engine
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      res.render('maintenance.hbs', {
        pageTitle: 'Under Construction',
        welcomeMsg: 'We\'ll be back soon!'
      });
    } else next();
    
  });
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',    
    welcomeMsg: "Welcome to my website, thanks for stopping by!"
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMsg: 'This is what this site is about!'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port ' + 3000);
});