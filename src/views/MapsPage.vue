<template>
  <div class="maps-page">
    
      <div id="maps"></div>

      <div id="locations">
        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  <span></span>
  <div class="segment-3">
     <p>ksh 60/hr</p>
  <button></button>
  </div>
 
</div>
        </div>

        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  <span></span>
  <div class="segment-3">
     <p>ksh 60/hr</p>
  <button></button>
  </div>
 
</div>
        </div>
        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  <span></span>
  <div class="segment-3">
     <p>ksh 60/hr</p>
  <button></button>
  </div>
 
</div>
        </div>
        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  <span></span>
  <div class="segment-3">
     <p>ksh 60/hr</p>
  <button></button>
  </div>
 
</div>
        </div>

        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  <span></span>
  <div class="segment-3">
     <p>ksh 60/hr</p>
  <button></button>
  </div>
 
</div>
        </div>
        <div class="element1">
<div class="image">
<img src="download.jpg">
</div>
<div class="second-part">
  <h3>Nairobi CBD Parking</h3>
  <span></span>
  <div class="segment-3">
     <p>ksh 60/hr</p>
  <button></button>
  </div>
 
</div>
        </div>


      
                  
      </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader"
export default {

// AIzaSyCmv_uQG7v271XKKOLcrscQH3vCBkXP65o

data() {
  return {
    parkingSpots: []
  }
},
methods: {
  generateMaps:function(){
 const loader = new Loader({
  apiKey: "AIzaSyCmv_uQG7v271XKKOLcrscQH3vCBkXP65o",
  version: "weekly",
  // ...additionalOptions,
});

loader.load().then(() => {
 var map = new google.maps.Map(document.getElementById("maps"), {
    center: { lat: -1.286389, lng: 36.817223 },
    zoom: 8,
  });
});

      }
      
 },
 beforeMount(){
    this.generateMaps();
 },
}
</script>

<style scoped>
.maps-page{
  background-color: rgb(220, 220, 236);
  height: 100vh;
  width:100%;
}
#maps{
  width:100%;
  height: 70vh;
  cursor: pointer;
}
#locations{
  /* background-color: black; */
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 87%;
  gap: 10px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  padding: 10px;
  height: 30vh;
}
.element1 img{
width: 80px;
height: calc(100%- 10px);
border-radius: 5px;

}
.element1{
  background-color: #fff;
  display: flex;
  gap: 10px;
  padding:5px 16px;
  border-radius: 10px;
  border: 1px solid rgb(66, 66, 230);
}
.element1 h3{
  padding-top: 2px;
  font-size: 14px;
}
.second-part{
  display: grid;
  grid-template-rows: repeat(3,1fr);
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
@media all and (min-width:500px){
  #locations{
  grid-auto-columns: 37%;   
  } 
}
</style>