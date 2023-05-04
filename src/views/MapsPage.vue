<template>
  <div class="maps-page">
    <div class="back">
<font-awesome-icon @click="homePage" class="icon" icon="arrow-left-long"/>
</div>

      <div id="maps"></div>

      <div id="locations" >
        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  
  <div class="segment-3">
     <p>ksh 420/hr</p>
  <button class="select" @click="optionOne">Select</button>
  </div>
 
</div>
        </div>

        <div class="element1">
<div class="image">
<img src="images.jpg">
</div>
<div class="second-part">
  <h3>Westlands Parking</h3>
 
  <div class="segment-3">
     <p>ksh 450/hr</p>
  <button class="select" @click="optionTwo">Select</button>
  </div>
 
</div>
        </div>
        <div class="element1">
<div class="image">
<img src="images (1).jpg">
</div>

<div class="second-part">
  <h3>Kisumu Parking</h3>
  
  <div class="segment-3">
     <p>ksh 350/hr</p>
  <button  class="select" @click="optionThree">Select</button>
  </div>
 
</div>
        </div>
        <div class="element1">
<div class="image">
<img src="images (2).jpg">
</div>
<div class="second-part">
  <h3>Mombasa Parking</h3>
 
  <div class="segment-3">
     <p>ksh 420/hr</p>
  <button class="select" @click="optionFour">Select</button>
  </div>
 
</div>
        </div>

        <div class="element1">
<div class="image">
<img src="download (4).jpg">
</div>
<div class="second-part">
  <h3>Kiambu Parking</h3>

  <div class="segment-3">
     <p>ksh 420/hr</p>
  <button class="select" @click="optionFive">Select</button>
  </div>
 
</div>
        </div>
        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nakuru Parking</h3>
 
  <div class="segment-3">
     <p>ksh 420/hr</p>
  <button class="select" @click="optionSix">Select</button>
  </div>
 
</div>
        </div>

         
      </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader"
import { GOOGLE_KEY } from "../GoogleApi.js"
// const { GOOGLE_KEY} = require('../GoogleApi.js')

export default {

data() {
  return {
    parkingSpots: []
  }
},
methods: {
  homePage:function(){
this.$router.push('/NavigationPage')
  },
  generateMaps:function(){
 const loader = new Loader({
  apiKey:GOOGLE_KEY,
  version: "weekly",
  // ...additionalOptions,
});

loader.load().then(() => {
 var map = new google.maps.Map(document.getElementById("maps"), {
    center: { lat: -1.286389, lng: 36.817223 },
    zoom: 8,
  });
}).catch(error =>{
  console.log(error,"Cannot connect to google maps");
})
      },
      optionOne:function(){
        var parkingSpot = this.$store.state.location = "Nairobi"
        var price =  this.$store.state.price = "420"
  this.$store.commit('update', parkingSpot, price)
 this.$router.push('/NavigationPage')
      },
      optionTwo:function(){
var parkingSpot = this.$store.state.location = "Westlands"
        var price =  this.$store.state.price = "450"
  this.$store.commit('update', parkingSpot, price)
 this.$router.push('/NavigationPage')
      },
      optionThree:function(){
var parkingSpot = this.$store.state.location = "Kisumu"
        var price =  this.$store.state.price = "360"
  this.$store.commit('update', parkingSpot, price)
 this.$router.push('/NavigationPage')
      },
      optionFour:function(){
var parkingSpot = this.$store.state.location = "Mombasa"
        var price =  this.$store.state.price = "420"
  this.$store.commit('update', parkingSpot, price)
  this.$router.push('/NavigationPage')
      },
      optionFive:function(){
var parkingSpot = this.$store.state.location = "Kiambu"
        var price =  this.$store.state.price = "420"
  this.$store.commit('update', parkingSpot, price)
this.$router.push('/NavigationPage')
      },
      optionSix:function(){
var parkingSpot = this.$store.state.location = "Nakuru"
        var price =  this.$store.state.price = "420"
  this.$store.commit('update', parkingSpot, price)
 this.$router.push('/NavigationPage')
      },
     
      
 },
 beforeMount(){
    this.generateMaps();
 },
}
</script>

<style scoped>
.back{
  padding:10px;
  margin: 0;
  display: flex;
  align-items: flex-start;
}

.maps-page{
  background-color: rgb(220, 220, 236);
  height: 100vh;
  width:100%;
}
.gm-control-active{
  margin-top:-20px;
}
#maps{
  width:100%;
  height: 100vh;
  cursor: pointer;
  position:relative
}
#locations{
  /* background-color: black; */
  position: absolute;
  z-index: 1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 37%;
  gap: 10px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  padding: 10px;
  margin-top: -150px;
}
.image{
  height: 90%;
  width: 50%;
}
.element1 img{
width:100%;
height:100%;
border-radius: 5px;

}
.element1{
  background-color: #fff;
  display: flex;
  gap: 10px;
  padding:5px 16px;
  border-radius: 32px;
  border: 1px solid rgb(66, 66, 230);
  height: 85%;
}
.element1 h3{
  padding-top: 2px;
  font-size: 14px;
}
.second-part{
  display: grid;
  grid-template-rows: repeat(2,1fr);
}
#locations div{
border: 1px solid #fff;
border-radius: 3px;
cursor: pointer;
}
.plus{
  z-index: 1;
  position: absolute;
  cursor: pointer;
  top: 70%;
  padding: 5px;
  border: none;
  left: 90%;
}
.minus{
  z-index: 1;
  position: absolute;
  cursor: pointer;
  top: 78%;
  left: 90%;
  padding: 5px 7px;
  border: none;
}
.select{
  border: none;
  background-color:#03061a;
  color: #fff;
  padding: 5px 10px;
  border-radius: 2px;
}

@media all and (min-width:500px){
#locations{
  grid-auto-columns: 37%;   
  height: 34vh;
  margin-top: -240px;
  } 
.image{
  width: 50%;
height:90%;
}
}
</style>