<template>
  <div v-if="user !=null" id="homePage">
    <div class="tab" v-if="false">
          <ul>
             <li>Transactions</li>
             <li>About</li>
             <li>Contact Us</li>
             <li>Settings</li>
             <li>LogOut</li>
          </ul>
    </div>
    <div class="top-section">
<nav class="nav-bar">
  <div class="profile">
<img src="profilePic.jpg" alt="profile-pic" class="profilepic">

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
  <input type="text" placeholder="Search Parking">
  
    <!-- <font-awesome-icon icon="fa-regular fa-alien-8bit" /> -->
  
</div>
</div>
<div id="main-section">
<div class="activities">
  <div class="element1"></div>
  <div class="element2"></div>
  <div class="element3"></div>
  <div class="element4"></div>
  <div class="element5"></div>
  <div class="element6"></div>
</div>

<div class="payment-section">
  <h4>Select Location</h4>
<div class="location-details">
<span>Parking Spot</span>
<p>Nairobi</p>
</div>
<div class="search-map">
  <button @click="maps">Search map</button>
</div>
<div class="price-details">
  <span>Cost Estimate</span>
  <p>Ksh 390</p>
</div>
<button class="pay" @click="pay">Pay</button>
</div>

<div class="ticket-details">
  <h2>Ticket</h2>
<div class="ticket">
  
</div>
</div>
</div>
  </div>
</template>

<script>
import{ app, db, auth, firebaseConfig, user, signInWithEmailAndPassword, signOut, collection, onAuthStateChanged, getDocs } from '@/firebase.js'

export default {
data() {
  return {
    user:89,
  }
},
methods: {
  noUser:function(){
    if(this.user == null){
      this.$router.push('/');
    }else{
      console.log("user present");
    }
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

}
</script>

<style scoped>

#homePage{
  background: #f0e5ef;
  width: 100%;
  position: relative;
}
.tab{
display: flex;
flex-direction: column;
background: #010620;
color: #f0e5ef;
width: 80%;
height: 100%;
position: absolute;
z-index: 1;
padding-top: 24px;
}

.tab li{
  padding: 15px 16px;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.search-bar{
  padding: 20px 10px;
  display: flex;
  gap: 10px;
}
.search-bar button{
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
input{
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
}
.payment-section{
  /* border-top: 0.5px solid grey; */
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
  padding: 20px 0;
  display:grid;
  grid-auto-flow:column;
  grid-auto-columns: 27%;
  /* gap: 10px; */
  overflow: auto;
  overscroll-behavior-inline: contain;
  background-color: #fff;
}
.activities div{
  width: 80px;
  height: 80px;
  border-radius: 3px;
  background: #3e56cc;
}
.ticket-details{
  border-top: 0.5px solid grey;
}

@media all and (min-width:500px){
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

}

</style>