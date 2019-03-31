const express = require('express');
const bodyParser = require('body-parser');
const blogRouter = require('./router');
const app = express();
const jsonParser = bodyParser.json();

app.use('/blog/api', jsonParser, blogRouter);


app.listen(8080, () => {
	console.log('Your app is running in port 8080')
});
