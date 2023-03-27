const express = require('express');
const app = express();

// Import routes
const blogRoute = require('./routes/blog');

//Router MIddlewares
app.use(express.json());
app.use('/', blogRoute);

app.listen(3000,()=>{
    console.log("run")
})
module.exports = app;
