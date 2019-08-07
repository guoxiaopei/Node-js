const express=require('express');
const bodyParser=require('body-parser');
const proRouter=require('./routes/pro.js');

let app=express();
app.listen(80);


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public'));
app.use(express.static('./pro'));
app.use(express.static('./photo'));
app.use('/pro',proRouter);
