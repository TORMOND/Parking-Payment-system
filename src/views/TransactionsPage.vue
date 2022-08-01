<template>
  <div class="transations-page">

    <div class="loading" v-if="load">
      <img src="loading.gif">
    </div>
    <div id="main-content">

      <div class="content">
         <nav>
<div class="back">
<font-awesome-icon @click="homePage" icon="arrow-left-long"/>
</div>

 <div class="userProfile">
<font-awesome-icon class="userIcon" v-if="profilePic == '' "   icon="circle-user" />
<img src="profilePic.jpg" alt="profile-pic" class="profilepic" v-else>

</div>
      </nav>
        <div class="amt-details">
           <span>You are about to pay</span>
        <p class="amount">Ksh {{price}}</p>

        </div>
       
<div class="selectors" v-if="false">

</div>
<div class="sub-content">
  <div class="location">
    <span>Location</span>
    <p>{{location}}</p>
  </div>
  <div class="vehicle-reg">
    <span>Vehicle</span>
    <p>KDA 10R0</p>
  </div>
   <div class="name">
    <span>Name:</span>
    <p>Victor</p>
  </div>
  <div class="phone">
    <span>Phone No.</span>
    <p>0707764789</p>
  </div>
</div>
<div class="payment">
  <button class="payBtn" @click="fetchApi">Make Payment</button>
</div>
<div class="keyboard">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  <button>6</button>
  <button>7</button>
  <button>8</button>
  <button>9</button>
  <button style="visibility:hidden;"></button>
  <button>0</button>
  <button>x</button>
</div>
      </div>
<div id="extras">

    </div>
      </div>
       
      <div class="modal" v-if="false">
        <div class="check"></div>
        <p>Payment Successful</p>
        <span>Trans ID PA234829</span>
        <div class="line"></div>
        <div class="section-2">
          <div class="part-1">
            <div class="date">
              <span>Date</span>
              <p>25 Sep 21</p>
            </div>
             <div class="time">
              <span>Time</span>
              <p>03:54 PM</p>
            </div>
          </div>
          <div class="part-2">
            <span>By</span>
            <p>Victor Monderu</p>
            <p>0720202020</p>
          </div>
          <div class="part-3">
            <span>Total Paid Amount</span>
            <h3>{{amount}}</h3>
          </div>
        </div>
        <div class="last-part">
          <button>Done</button>
        </div>
      </div>
  </div>
</template>

<script>
import { app, db, auth, firebaseConfig, user, collection,  setDoc, addDoc,  serverTimestamp } from '@/firebase.js'

export default {
data() {
  return {
    amount: 500,
    profilePic: '',
    load:false,
  }
},
methods: {
  homePage:function(){
    this.$router.push('NavigationPage');
  },
fetchApi:function(){
this.load =true;
const container = document.querySelector('#main-content');
container.classList = "active";

const colRef = collection(db,'tickets');
  addDoc(colRef, {
      location: this.$store.state.location,
      amount:this.$store.state.price,
      VehicleNumber: "KVC 0001",
      PhoneNumber: "0780060995"
    });

}

},
computed:{
   location(){
     return this.$store.state.location
   },
   price(){
     return this.$store.state.price
   }
 }
}
</script>

<style scoped>
.transactions-page{
  width: 100vw;
  height: 100vh; 
position: relative;
}
.loading{
  position:absolute;
  z-index:3;
 margin-top: 55%;
 margin-left:40%
 
}
.userIcon{
  color: rgb(160, 158, 158);
   font-size: 28px; 
}
.userProfile{
  width:32px;
  height: 32px;
  border-radius: 50%;
background-color:#ceced1;
display:flex;
justify-content:center;
align-items: center;
}
 #main-content{
   display:flex;
  /* grid-template-columns: repeat(1,1fr); */
  width: 100vw;
  }
  #main-content.active{
    opacity: 0.1;
pointer-events: none;
scroll-behavior:none;
  }
.content{
    width: 100vw;
  }
nav{
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
}
.back{
  padding-top:10px;
}
.profilepic{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.amt-details{
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.amt-details span{
  font-size: 12px;
  color:#8a8d91;
  display: inline;
}
.amount{
  font-size: 24px;
  font-weight: 700;
  display: inline;
}
.sub-content{
  background: linear-gradient(-135deg, #c4c5ca, #3e56cc); 
  margin: 10px;
  border-radius: 5px;
  padding: 16px 10px;
  color: #fff;
}
.sub-content span{
  color: #ceced1;
}
.location{
  display: flex;
  gap: 10px;
  padding: 5px 0;
}
.name{
  display: flex;
  gap: 10px;
  padding: 5px 0;
}
.phone{
  display: flex;
  gap: 10px;
  padding: 5px 0;
}
.vehicle-reg{
  padding: 10px 0;
  display: flex;
  gap: 10px;
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
 
}
.payBtn:hover{
  background-color: #040925;
}
.keyboard{
  background-color: #ceced1;
  margin-top: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 5px;
}
.keyboard button{
  height: 30px;
  cursor: pointer;
}
#extras{
  display: none;
}
@media all and (min-width:500px) {
  #main-content{
  display: flex;
    /* grid-template-columns: repeat(2, 1fr); */
  }
 .content{
    width: 40vw;
  }
  #extras{
    background-color: #040925;
    height: 100vh;
     width: 60vw;
    display: block;
  }
  
}
</style>