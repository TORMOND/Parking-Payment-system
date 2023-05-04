<template>
  <div v-if="user !==null" id="homePage">
    <div class="tab">
       <div class="closer">
        <p @click="untoggleMenu">
        <font-awesome-icon class="cancel" icon="xmark" />
        
        </p>
        </div>
   <Tab @aboutPage="aboutPage" @feedbackPage="feedbackPage" @logout="logout" @settingsPage="settingsPage" />
    </div>


<div class="ticket-details" v-if="ticket">
  <div class="top-part">
    <h2>Ticket</h2>
    <p @click="hideTicket" class="close"> <font-awesome-icon class="cancel" icon="xmark" /></p>
  </div>
  
  <div class="details" v-if="expired">
    <p class="expired">Your ticket has expired:purchase another to reserve parking space</p>
   
</div>
<div class="shown-details" v-else>

 <div class="details">
  <span>Vehicle Reg:</span>
  <p>{{vehicle}}</p>
</div>
 <div class="details">
  <span>Paid By:</span>
  <p>{{ticketName}}</p>
</div>
 <div class="details">
  <span>Phone Number</span>
  <p>{{ticketPhoneNumber}}</p>
</div>
 <div class="details">
  <span>Location</span>
  <p>Nairobi Area</p>
</div>
 <div class="details">
  <span>Date:</span>
  <p>2 September 2022</p>
</div>
 <div class="details">
  <span>Time:</span>
  <p>{{postedTime}}</p>
</div>
<div class="details">
  <span>Period:</span>
  <p>{{period}}hr</p>
</div>

 <div class="details">
  <span>Total Paid Amount</span>
  <p>Ksh {{price}}</p>
</div>
</div>
</div>

      <div id="container">
        <div class="side-menu">

 
  <div class="admin-profile">
    <div class="admin-image">
   <font-awesome-icon class="userIcon-menu" v-if="profilePic == profilePic "   icon="circle-user" />
   <img :src="profilePic" alt="profile-pic" class="profilepic" v-else>

    </div>
  </div>

 <Tab @aboutPage="aboutPage" @feedbackPage="feedbackPage" @logout="logout" @settingsPage="settingsPage" />
        </div>

            <div class="contain">
    <div class="top-section">
<nav class="nav-bar">
  <div class="profile">

<div class="userProfile">
<font-awesome-icon class="userIcon" v-if="profilePic == profilePic "   icon="circle-user" />
<img :src="profilePic" alt="profile-pic" class="profilepic" v-else>
</div>

  </div>

  <div class="menu">
<font-awesome-icon class="menu-icon" @click="toggleMenu" icon="align-justify"/>
  </div>
</nav>
<div class="description">
  <h4>Hello {{name}}</h4>
<h3>Find the best Vehicle Parking Space</h3>
</div>
<div class="search-bar">
  <input type="text" placeholder="Search Parking"  v-model="input">
  
   <button>
    <font-awesome-icon icon="magnifying-glass" />
  </button>
  
</div>
</div>
<div id="main-section">
<div class="activities">

  <div class="element1" @click="showTicket">
    <font-awesome-icon class="icon" icon="ticket" />
    <p>Ticket</p>
    <span>1 Available</span>
  </div>
  <div class="element2">
    <img src="images.jpg" class="image">
    <p>Change Parking</p>
   
  </div>

  <div class="element3" @click="maps">
    <font-awesome-icon class="icon" icon="map-location" />
    <p>Maps</p>
    <span> Available</span>
  </div>

  <div class="element4">
  <font-awesome-icon class="icon" icon="address-card" />
    <p>History</p>
    <span>0 Available</span>
  </div>
    
</div>

<div class="payment-section">
  <h4>Select Location</h4>
<div class="location-details">
<span>Parking Spot</span>
<p>{{location}}</p>
</div>
<div class="search-map">
  <button @click="maps">Search map</button>
</div>
<div class="price-details">
  <span>Cost Estimate</span>
  <p>Ksh {{price}} / hr</p>
</div>

<button class="pay" @click="pay">Pay</button>
</div>

 
</div>
            </div>

</div>
  </div>
</template>

<script>
import{ app, db, auth, user, setDoc, doc, collection, onAuthStateChanged, query, where,  onSnapshot, serverTimestamp, signOut, getDocs   } from '@/firebase.js'

import Tab from '@/components/TabMenu.vue'
export default {
  components: {
    Tab
  },
data() {
  return {
    user:"Victor",
    ticket:false,
    name: "",
    currentUserId: "",
    phoneNumber:'',
    email:'',
    profilePic:"",
    vehicleReg:'',
    input:'',
    ticketName:'',
    ticketId:'',
    ticketPhoneNumber:'',
    ticketPrice:'',
    vehicle:'',
    timeByHour:'',
    slot:'',
    period:'',
    postedTime:'',
     time:'1',
    slot:'A',
    expired:false,
    locations: ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Kisumu', 'Naivasha']
  }
},
methods: {
  toggleMenu:function(){
const tab = document.querySelector('.tab');
tab.style.display = "block";
const container = document.querySelector('#container');
container.classList = "selected";
  },
  untoggleMenu:function(){
const tab = document.querySelector('.tab');
tab.style.display = "none";
const container = document.querySelector('#container');
container.classList = "";
  },
noUser:function(){
    if(this.user == null){
      this.$router.push('/');
    }else{
      console.log("user present",this.$store.state.user);
    }
  },
aboutPage:function(){
this.$router.push('/About');
},
feedbackPage:function(){
this.$router.push('/FeedbackPage');
},
settingsPage:function(){
this.$router.push('/Settings');
},
logout:function(){
  signOut(auth).then(() => {
    // Sign-out successful.
    this.$router.push('/')
  }).catch((err) => {
    // An error happened.
    console.log("An error occured while signing out:"+ err);
  });
},
showTicket:function(){
  this.ticket = true;
const container = document.querySelector('#container');
container.classList = "selected";

const date = new Date()
const timeByHour = date.getHours()
this.timeByHour = timeByHour

const tickets = collection(db, 'tickets');
const tickertQuery = query(tickets, where("userId", "==", this.currentUserId));
onSnapshot(tickertQuery, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{
          this.ticketName = doc.data().user;  
          this.ticketId = doc.data().userId;  
          this.ticketPhoneNumber =doc.data().PhoneNumber
          this.ticketPrice = doc.data().amount
          this.vehicle =doc.data().VehicleNumber
          this.slot = doc.data().slot
          this.period = doc.data().period
          this.postedTime = doc.data().postedTime
    })
})
if(this.postedTime + this.period < timeByHour){
console.log("expired")
this.expired=true
}
if(this.postedTime + this.period > timeByHour){
console.log("NOT expired")
this.expired=false
}
    
  },
 hideTicket:function(){
  this.ticket = false;
const container = document.querySelector('#container');
container.classList = "";
  },
  pay:function(){
    this.$router.push('/TransactionsPage');
    var chosenTime =  this.$store.state.selectedTime = this.time
var chosenSlot =  this.$store.state.selectedSlot = this.slot
this.$store.commit('update',chosenTime, chosenSlot)
  },
  maps:function(){
this.$router.push('/MapsPage');
  },
fetchData:function(){
onAuthStateChanged(auth, (user) => {
  if (user) {
let currentUser = auth.currentUser
const userRef = collection(db, 'userDetails');
const q = query(userRef, where("email", "==", currentUser.email));
onSnapshot(q, (snapshot)=>{
    snapshot.docs.forEach((doc)=>{
          this.name = doc.data().name;
          this.profilePic = doc.data().url;      
          this.currentUserId = doc.data().id;  
          this.phoneNumber =doc.data().phoneNumber
          this.email = doc.data().email
          this.vehicleReg =doc.data().carReg
    })

    var personName =  this.$store.state.userName = this.name
    var personId =  this.$store.state.userId = this.currentUserId
    var personPhone =  this.$store.state.userPhoneNumber = this.phoneNumber
    var personEmail =  this.$store.state.userEmail = this.email
    var profilePic = this.$store.state.userProfile = this.profilePic
    var carReg = this.$store.state.vehicleReg = this.vehicleReg
    this.$store.commit('update', personName, personId, personPhone, personEmail, profilePic, carReg)

})
 } else {
   console.log("no user");
   this.$router.push('/')
  }
});

},
},
beforeMount(){
    this.noUser(); 
    this.fetchData();
 },
 computed:{
filteredList() {
        return this.locations.filter(location => {
         return location.title.toLowerCase().includes(this.search.toLowerCase())
       })
      },
  // Vuex state management
   location(){
     return this.$store.state.location
   },
   price(){
     return this.$store.state.price
   },
   userInfor(){
     return this.$store.state.user    
   },
   userEmail(){
return this.$store.state.userEmail
   }
 }

}
</script>

<style scoped>
#homePage{
  background: #f0e5ef;
  width: 100%;
  position: relative;
  height: 100vh;
}
#container.selected{
opacity: 0.2;
pointer-events: none;
scroll-behavior:none;
}
#container{
  display:flex;
}
.search-Filter{
  background-color: #fff;
 box-shadow: 3px 3px 3px #ceced1, 3px 3px 3px #c6c6c9, 3px 3px 3px #ceced1;
 position:absolute;
 z-index:1;
 margin-top:56%;
 margin-left: 3%;
 width: 78%;
}
.expired{
  color:red;
  padding: 10px 20px;
  border:1px solid red;
  background: rgb(252, 224, 224);
}
.userIcon{
  color: rgb(160, 158, 158);
   font-size: 36px; 
}
.userIcon-menu{
  color: rgb(160, 158, 158);
   font-size: 128px; 
}
.userProfile{
  width:40px;
  height: 40px;
  border-radius: 50%;
background-color:#ceced1;
display:flex;
justify-content:center;
align-items: center;
}
.search-Filter p{
  cursor: pointer;
  padding: 5px 10px;
}
.search-Filter p:hover{
  background-color: #6ba4ee;
}
.top-part{
  display: flex;
 justify-content: space-between;
 padding: 10px;
}
.top-part h2{
  margin: 0 auto;
}
.closer{
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
padding: 2px 30px;
}

.tab{
display:none;
flex-direction: column;
background: #010620;
color: #f0e5ef;
width: 100%;
height: 70%;
position: absolute;
z-index: 1;
padding-top: 24px;
position: sticky;
top:0;
}
.username{
  margin-top: 10px;
  font-size:12px;
  font-weight:600;
}
  .side-menu{
  width:0;
 display:none;
}
.contain{
  width:100%;
}

.top-section{
 background: linear-gradient(-135deg, #f0e5ef, #3e56cc); 
}
.nav-bar{
display: flex;
justify-content: space-between;
padding:10px;
}
.menu-icon{
font-size: 2rem;
font-weight: 700;
 border: none;
 cursor: pointer;
}
.profilepic{
  width: 50px;
  height: 50px;
  border-radius:20px;
}
.search-bar{
  padding: 20px 10px;
  display: inline-flex;
  gap: 10px;
}
.search-bar button{
  background: linear-gradient(-135deg, #7d2ce7, #6f6f72); 
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
input{
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
  /* width: 80%; */
}
.payment-section{
  background: #ebe5f0;
  padding: 20px;
}
.location-details{
  padding: 10px ;
  background-color: #fff;
  display: flex;
  justify-content:space-between;
  gap: 10px;
}
.location-details span{
  font-size: 12px;
  color: #747177;
}
.location-details p{
  font-weight: 700;
  font-size: 14px;
  border-radius: 5px;
}
.search-map{
  margin: 10px 0;
}
.search-map button{
  padding: 10px 100px;
  border-radius: 5px;
  border: 0.5px solid black;
  cursor:pointer;
   background-color:#fff;
}
.price-details{
  padding: 10px ;
  background-color: #fff;
  display: flex;
  justify-content:space-between;
  gap: 10px;
}
.price-details span{
  font-size: 12px;
  color: #747177;
}
.price-details p{
  font-weight: 700;
  font-size: 14px;
  border-radius: 5px;
}
.pay{
  margin-top: 15px;
  padding: 10px 80px;
  border-radius: 5px;
  border: none;
  background: rgb(7, 0, 12);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor:pointer;
}
.activities{
  padding: 10px 0;
  display:grid;
  grid-auto-flow:column;
  grid-auto-columns: 33%;
   gap: 10px; 
  overflow: auto;
  overscroll-behavior-inline: contain;
  background-color: #fff;
}
.activities div{
  padding-top: 5px;
  height: 90px;
  border-radius: 3px;
  background: #f0e5ef;
  border: 1px solid #3e56cc;
}
.icon{
  font-size: 36px;
}
.activities p{
  font-size: 14px;
  font-weight: 600;
}
.activities span{
  font-size: 12px;
  color: #747177;
}
.payment{
  margin-top: 20px;
}
.payBtn{
  background-color:#03061a;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 16px 80px;
  border-radius: 5px;
 cursor: pointer;
}
.payBtn:hover{
  background-color: #040925;
}
.time-period{
padding:20px;
display:flex;
gap:10px;
align-items:center;
}
.time-period select{
  padding: 10px 20px;
  width: 60%;
}
.slot{
  display:flex;
  padding:20px;
  gap:10px;
  align-items:center;
}
.slot select{
 padding: 10px 20px;
  width: 60%;
}
.ticket-details{
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: #fff;
  margin-left: 5%;
  margin-top: 20%;
  transition: 2s;
  width: 85%;
  padding: 24px 10px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #ceced1, 3px 3px 3px #ceced1, 3px 3px 3px #ceced1;
}
.ticket-details span{
  color: #747177;
  font-size: 14px;

}
.details{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.element1{
  object-fit: cover;
  opacity: 0.9;
}
.element2{
   object-fit: cover;
  opacity: 0.9;
}
.element3{
   object-fit: cover;
  opacity: 0.9;
}
.element4{
   object-fit: cover;
  opacity: 0.9;
}
.element5{ 
   object-fit: cover;
  opacity: 0.9;
}
.element6{
   object-fit: cover;
  opacity: 0.9;
}
.image {
width: 35px;
height: 35px;
border-radius: 50%;
}
#main-section{
  background: #f0e5ef;
}
.admin-details{
    display: none;
  }
.cancel{
  font-size: 24px ;
  cursor: pointer;
}
@media all and (min-width:500px){
  .userProfile{
    visibility: hidden;
  }
  .activities{
  padding: 10px 10px;
  display:grid;
  grid-auto-flow:column;
  grid-auto-columns: 24%;
   gap: 10px; 
 
  background-color: #fff;
}
.activities div{
  padding-top: 15px;
  height: 100px;
  border-radius: 3px;
  background: #f0e5ef;
  border: 1px solid #3e56cc;
}
  .ticket-details{
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: #fff;
  margin-left: 25%;
  margin-top: 10%;
  transition: 2s;
  width: 55%;
  padding: 24px 10px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #ceced1, 3px 3px 3px #ceced1, 3px 3px 3px #ceced1;
}
  .side-menu{
  width:25%;
  display: flex;
  flex-direction: column;
background: #010620;
color: #f0e5ef;
height: 100vh;
padding-top: 24px;
}
.contain{
  width:75%;
}
  .admin-details{
    display: block;
  }
  .top-section{
 background: linear-gradient(-135deg, #7d2ce7, #010620); 
}

.input{
    margin: 0 auto;
  }
/* #main-section{
  display: grid;
  grid-auto-flow: column;
} */

.ticket-details{
   border: none;
}
.menu{
  display: none;
}
input{
  margin: 0 auto;
  padding:10px 5px 10px 40px;
  width: 500px;
}
.admin-profile{
 border-bottom: 0.5px solid #ceced1;
 display: flex;
 flex-direction: column;
 padding: 20px 0px;
}
.name{
  font-size: 16px;
  font-weight: 600;
}
.job-position{
  font-size: 12px;
  color: #65676b;
}
.email{
  font-size: 12px;
  color: #65676b;
}
.btn button{
  margin-top: 20px;
 border: none;
 background-color: #216FD8;
 color: #fff;
 padding: 10px 30px;
 border-radius: 5px;
 cursor: pointer;
}

}

</style>