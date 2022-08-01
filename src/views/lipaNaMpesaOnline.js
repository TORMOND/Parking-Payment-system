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


// class Post {
//     constructor(title, link, author, img) {
//       this.title = title;
//       this.link = link;
//       this.author = author;
//       this.img = img;
//     }
//   }
  
//   const app = new Vue ({
//     el: '#app',
//     data: {
//       search: '',
//       postList : [
//         new Post(
//           'Vue.js', 
//           'https://vuejs.org/', 
//           'Chris', 
//           'https://vuejs.org//images/logo.png'
//         ),
//         new Post(
//           'React.js', 
//           'https://facebook.github.io/react/', 
//           'Tim',
//           'https://daynin.github.io/clojurescript-presentation/img/react-logo.png'
//         ),
//         new Post(
//           'Angular.js', 
//           'https://angularjs.org/', 
//           'Sam', 
//           'https://angularjs.org/img/ng-logo.png'
//         ),
//         new Post(
//           'Ember.js', 
//           'http://emberjs.com/', 
//           'Rachel',
//           'http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200'
//         ),
//         new Post(
//           'Meteor.js', 
//           'https://www.meteor.com/', 
//           'Chris', 
//           'http://hacktivist.in/introduction-to-nodejs-mongodb-meteor/img/meteor.png'
//         ),
//         new Post(
//           'Aurelia', 
//           'http://aurelia.io/', 
//           'Tim',
//           'https://cdn.auth0.com/blog/aurelia-logo.png'
//         ),
//         new Post(
//           'Node.js', 
//           'https://nodejs.org/en/', 
//           'A. A. Ron',
//           'https://code-maven.com/img/node.png'
//         ),
//         new Post(
//           'Pusher', 
//           'https://pusher.com/', 
//           'Alex', 
//           'https://avatars1.githubusercontent.com/u/739550?v=3&s=400'
//         ),
//         new Post(
//           'Feathers.js', 
//           'http://feathersjs.com/', 
//           'Chuck',
//           'https://cdn.worldvectorlogo.com/logos/feathersjs.svg'
//         ),
//   ]
//     },
//     computed: {
//       filteredList() {
//         return this.postList.filter(post => {
//           return post.title.toLowerCase().includes(this.search.toLowerCase())
//         })
//       }
//     }
//   })



{/* <div id="app">
  <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search title.."/>
        <label>Search title:</label>
  </div>
  <div class="wrapper">
    <div class="card" v-for="post in filteredList">
      <a v-bind:href="post.link" target="_blank">
        <img v-bind:src="post.img"/>
        <small>posted by: {{ post.author }}</small>
        {{ post.title }}
      </a>
    </div>
  </div>
</div> */}