const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('/',function(req,res){
    res.render('index',{
        title :'Weather',
        name : 'Ranjeet Mishra'
    });
});


app.get('/help',function(req,res){
    res.render("help",{
        helpText :"This is some helpful text",
        title : 'Help',
        name : 'Ranjeet Mishra'
    });
});

app.get('/about',function(req,res){
    res.render('about',{
        title : 'About Me',
        name :'Ranjeet Mishra'
    });
});


app.get('/weather',function(req,res){

    const address = req.query.address;
    if(!address){
        return res.send({
            error : "You must provide the address"
        });
    }

    geocode(address,(error,data) => {

        if(error){
            return res.send({error :error});
        }else{
    
        }
        
        forecast(data.latitude, data.longitude, (error,forecastData) =>{
            if(error){
                return res.send({error : error});
            }
           
           res.send({
               forecast : forecastData,
               location : data.location,
               address : address
           });
        });
    });

    // res.send({
    //     forcast : "cloudy",
    //     location :'Buxar',
    //     address : req.query.address
    // });
});

app.get('/help/*',function(req,res){
   res.render('404',{
       title : '404',
       name : 'Ranjeet Mishra',
       errorMessage : 'Help article not found'

   });
});

app.get('*',function(req,res){
    res.render('404',{
        title :'404',
        name : 'Ranjeet Mishra',
        errorMessage : 'Page not found!'
    });
});
// app.com
// app.com/help
// app.com/about

app.listen(3000,() =>{
    console.log('Server is up on port 3000');
});