const express = require('express');
const app = express();
// app.listen('localhost', "==", 3000)

app.set('view engine', 'ejs');

 app.listen(3000);

const request = require('request');


app.get('/', (req,res)=>{
    // res.send('<p> Home Page </p>')
    res.render('index', {title: 'Node js '});
});

 app.get('/get_token', (req, res)=>{


function accesstoken(req, res, next){

    const endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const consumer_key = ""
   const consumer_secret = ""

    const auth = new Buffer(consumer_key + ":" + consumer_secret).toString('base64')

     request(
         {
          url: endpoint,
          headers:{
             "Authorization": "Basic "+ auth
         },
         function (error, response, body) {
             if(error){
                 console.log(error);
             }
             else if(response){
                 req.accesstoken = (JSON.parse(body)).accesstoken
                 next()
           }
       }
  })

}

 })

 app.get('/token', accesstoken, (req,res)=>{
     res.status(200).json({message: req.accesstoken})
 })

 app.get('/register', accesstoken, (req,res) => {
     const endpoint =  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

     request(
         
         {
            method: "POST" , 
            url:endpoint,
            headers:{
                "Authorization": "Bearer" + req.accesstoken
            },
            json: {
                  "shortCode":"",
                  "ResponseType": "",
                  "ConfirmationURL": "",
                  "ValidationURL": ""

            }
         },
         function(error, response, body){
             if(error){
              console.log(error)
             }
             console.log(res.json(body))
             res.status(200).json(body)
         }
        
     )
 })

 app.get('/c2b/confirm', accesstoken, (req,res) => {
   console.log(req.body)
   res.status(200).json(
    {
        "ResultCode": 0,
        "ResultDesc": "Success"
    }
)
 })

 app.get('/c2b/validate', accesstoken, (req,res) => {
    console.log(req.body)
    res.status(200).json(
        {
            "ResultCode": 0,
            "ResultDesc": "Success"
        }
    )
})

app.get('/simulate', accesstoken, (req,res) => {
    const endpoint =  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

     request(
         
         {
            method: "POST" , 
            url:endpoint,
            headers:{
                "Authorization": "Bearer" + req.accesstoken
            },
            json: {
                  "shortCode":"",
                  "Amount": amount,
                  "BillRefNumber": "Testpay",
                  "Msisdn": "254799543923",
                  "CommandID": "CustomerPayBillOnline"
                 

            }
         },
         function(error, response, body){
             if(error){
              console.log(error)
             }
             console.log(res.json(body))
             res.status(200).json(body)
         }
        
     )
})