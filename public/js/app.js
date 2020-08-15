console.log('Client side javascript file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data);
//     });
// });


// Goal : Fetch weather!
//
// 1.Setup a call to fetch weather for buxar
// 2. Get the parse json response
// 3.  -if error property,print location and forecast


// fetch('http://localhost:3000/weather?address=buxar').then((response) =>{
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne  = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            
        }
    });
});
})