const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (str) => {
return str.toUpperCase();
});
app.set('view engine','hbs');



// app.get('/',(req,resp)=>{
//    resp.send(
//        {
//            Name: 'Test',
//            like: [
//                 'biking',
//                 'playingcards'
//            ]
//        }
//    );
// });

app.use((req,resp,next) =>{
var now = new Date().toString();
console.log(now);

fs.appendFile('server.log', `${now}  ${req.method} ${req.url} \n`,(err) =>{
    if (err) {
        console.log('error woritng it to a file');
           resp.render('fail.hbs',{
              pageTitle: 'Error',
               pageHead: 'Error PAGE',
            currYear: new Date().getFullYear(),
            pageHead: 'Error Page'
        });
    }
    else
    {
     
    next()
    }
});
});

// too keep the maintance page

//     app.use((req,resp,next) =>{
//     resp.render('maint.hbs',{
//               pageTitle: 'Error',
//                pageHead: 'Error PAGE',
//             currYear: new Date().getFullYear(),
//             pageHead: 'Error Page'
//         });
//         next()
// });


// app.use((req,resp,next) =>{

//            resp.render('fail.hbs',{
//               pageTitle: 'Error',
//                pageHead: 'Error PAGE',
//             currYear: new Date().getFullYear(),
//             pageHead: 'Error Page'
//         });
  
//     next()

// });



app.use(express.static(__dirname + '/public'));

app.get('/',(req,resp)=>{
     resp.render('home.hbs',{

        pageTitle: 'Home Page',
        currYear: new Date().getFullYear(),
        wMsg: 'welcome to home page',
        pageHead: 'WELCOME PAGE'

    });
});


app.get('/home',(req,resp) => {

    resp.render('home.hbs',{

        pageTitle: 'Home Page',
        wMsg: 'welcome to home page',
        pageHeader: 'WELCOME PAGE'

    });

});

app.get('/about',(req,resp) =>{

resp.render('about.hbs',{
    pageTitle: 'About page',
    pageHeader: 'About Page'
});

});

app.get('/bad',(req,resp)=>{

    resp.send(
        {
         Errormessage:   'reached wrong page'
        });
});

app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});