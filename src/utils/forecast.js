const request = require('request');

const forecast = (latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=d458599b7dea6632c4097650b7c03d03&query='+ latitude + "," +longitude;
    
    request({url: url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to weather services!',undefined);
        }else if(response.body.error){
            callback('Unable to find location!',undefined);
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]+". It is currently "+ response.body.current.temperature +" degrees out. It feels like "+ response.body.current.feelslike +" degree out there." );
            
        }
    });
}


module.exports = forecast;