<template>
  <div v-if="user !=null" id="homePage">
    <div class="tab">
      <div class="close">
        <p @click="untoggleMenu"><font-awesome-icon icon="rectangle-xmark" /></p>
        </div>
          <ul>
             <li>Transactions</li>
             <li @click="aboutPage">About</li>
             <li @click="feedbackPage">
               <p>Contact Us</p>
               <font-awesome-icon icon="phone" />
               </li>
             <li @click="settingsPage">
               <p> Settings</p>
              
               <font-awesome-icon class="icons" icon="gear" />
             </li>
             <li @click="logout">
               <p>LogOut</p>
               <font-awesome-icon class="icons" icon="right-from-bracket" />
             </li>
          </ul>
    </div>
<div class="search-Filter" v-if="this.input !=='' ">
  <p>Mombasa</p>
  <p>Nairobi</p>
  <p>Nakuru</p>
  <p>Kiambu</p>
  <p>Kisumu</p>
  <p>Eldoret</p>
</div>
<div class="ticket-details" v-if="ticket">
  <div class="top-part">
    <h2>Ticket</h2>
    <p @click="hideTicket" class="close">X</p>
  </div>
  
  <div class="details">
  <span>Transaction ID :</span>
  <p>QW8578984G086</p>
</div>
 <div class="details">
  <span>Vehicle Reg:</span>
  <p>KDA 001A</p>
</div>
 <div class="details">
  <span>Paid By:</span>
  <p>Victor Monderu</p>
</div>
 <div class="details">
  <span>Phone Number</span>
  <p>0790222001</p>
</div>
 <div class="details">
  <span>Location</span>
  <p>Nairobi Area</p>
</div>
 <div class="details">
  <span>Date:</span>
  <p>29 April 2022</p>
</div>
 <div class="details">
  <span>Time:</span>
  <p></p>
</div>
 <div class="details">
  <span>Total Paid Amount</span>
  <p>Ksh 500</p>
</div>

</div>

            <div id="container">
    <div class="top-section">
<nav class="nav-bar">
  <div class="profile">
<img src="profilePic.jpg" alt="profile-pic" class="profilepic">
<p class="username">Hi {{userEmail}}</p>
  </div>

  <div class="menu">
      <!-- <font-awesome-icon :icon="['fab', 'youtube']"/> -->
<font-awesome-icon class="menu-icon" @click="toggleMenu" icon="align-justify"/>
  </div>
</nav>
<div class="description">
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
    <span>13 Available</span>
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
  <p>Ksh {{price}}</p>
</div>
<button class="pay" @click="pay">Pay</button>
</div>

 <div class="admin-details">
  <h2>Admins</h2>

  <div class="admin-profile">
    <div class="admin-image">
    <img src="profilePic.jpg" alt="profile-pic" class="profilepic">
      <div class="name">Victor Monderu</div>
      <div class="job-position">0700100100</div>
      <div class="email">victormonderu@gmail.com</div>
      <div class="vehicle-registration">KBV 0001A</div>

<div class="btn">
  <button>Edit Profile</button>
</div>
    </div>
  </div>

</div>

</div>

</div>
  </div>
</template>

<script>
import{ app, db, auth, firebaseConfig, user, signOut, collection, onAuthStateChanged, getDocs } from '@/firebase.js'

export default {
data() {
  return {
    user:"Victor",
    ticket:false,
    name: "",
    currentUserId: "",
    profilePic:"",
    input:'',
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
    console.log("An error occured while signing out:"+ err)
  });
},
showTicket:function(){
    this.ticket = true;
const container = document.querySelector('#container');
container.classList = "selected";
  },
 hideTicket:function(){
  this.ticket = false;
const container = document.querySelector('#container');
container.classList = "";
  },
  pay:function(){
    this.$router.push('/TransactionsPage');
  },
  maps:function(){
this.$router.push('/MapsPage');
  },
  
},
beforeMount(){
    this.noUser();
    
 },
 computed:{
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
.search-Filter{
  background-color: #fff;
 box-shadow: 3px 3px 3px #ceced1, 3px 3px 3px #c6c6c9, 3px 3px 3px #ceced1;
 position:absolute;
 z-index:1;
 margin-top:56%;
 margin-left: 3%;
 width: 78%;
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
.close{
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
padding: 2px 30px;
}
.close:hover{
background-color: #ceced1;
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
}
.username{
  font-size:12px;
  font-weight:600;
}
.tab li{
  padding: 15px 16px;
  display: flex;
  gap: 10px;
  justify-content: center;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.search-bar{
  padding: 20px 10px;
  display: flex;
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
  width: 80%;
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
  grid-auto-columns: 27%;
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
  /* background-image: url('./images.jpg'); */
  object-fit: cover;
  opacity: 0.9;
}
.element2{
  /* background-image: url(./images.jpg); */
   object-fit: cover;
  opacity: 0.9;
}
.element3{
  /* background-image: url(./images.jpg); */
   object-fit: cover;
  opacity: 0.9;
}
.element4{
  /* background-image: url(./images.jpg); */
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

@media all and (min-width:500px){
  .admin-details{
    display: block;
  }
  .top-section{
 background: linear-gradient(-135deg, #7d2ce7, #010620); 
}
.input{
    margin: 0 auto;
  }
#main-section{
  display: grid;
  grid-auto-flow: column;
}
.activities{
  grid-auto-flow: row;
  gap: 10px;
  overflow-y: auto;
  grid-auto-columns: 80%;
}
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
  background-color: #fff;
 box-shadow:  3px 3px 5px #ceced1, 3px 3px 5px #ceced1 ;
 border-radius: 5px;
 display: flex;
 flex-direction: column;
 padding: 20px 0px;
 height:300px;
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