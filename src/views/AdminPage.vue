<template>
  <div id="homePage">
    <div id="modal" v-if="modal" >
    <div class="create">
        <h2> New Location</h2>
      <button @click="closeModal">X</button> 
    </div>
     
 <div class="text">
 <input placeholder="Location's Name" v-model="remarks" class="location-input">
  <input placeholder="Price Charges" v-model="charges" class="price-input">
  </div>
  <div class="include">

      <div class="outline" style="overflow-y:auto" @click="pickFile">
          
<i class="fas fa-plus-square"></i>

<input type="file" style="display:none;" @change="onFileSelected" ref="fileInput">
<img :src="imageUrl"  style="overflow-y:auto">

<h3>Add photo</h3>

</div>

  </div>
  <div class="segment-2">

  <div class="enter">
      <button @click="upload">Post</button>
  </div>
</div>
</div>


 <div class="menu" @click="toggleMenu" >
     
      <div class="tab" >
          <ul>
             <li @click="openModal">
               <p v-if="lists" >Add New Location</p>
                <font-awesome-icon class="icons" icon="circle-plus" />
                </li>
             <li>
               <p v-if="lists" >Reports</p>
               </li>
             <li>
               <p v-if="lists" >Admins</p>
               
               </li>
             <li @click="settings">
               <p v-if="lists" >Settings</p>
               <font-awesome-icon class="icons" icon="gear" />
               </li>
             <li @click="logOut">
               <p v-show="lists" >LogOut</p>
           <font-awesome-icon class="icons" icon="right-from-bracket" />
           </li>
          </ul>
         
    </div>

  </div>

  <div id="main-page"  @click="untoggle">
    <div class="top-section">
<nav class="nav-bar">
    <div class="wrap"></div>

 <div class="userProfile">
<font-awesome-icon class="userIcon" v-if="profilePic == '' "   icon="circle-user" />
<img src="profilePic.jpg" alt="profile-pic" class="profilepic" v-else>

</div>

 
</nav>
<div class="description">

</div>

<div class="search-bar">
  <select class="location-selector" >
<option>All Locations</option>
 <option v-for="location in locations" :key="location">{{location}}</option>
</select>

  <input type="text" placeholder="Search Vehicle" class="search-input">
  <button>
    <font-awesome-icon icon="magnifying-glass" />
  </button>
  
   
</div>
</div>
<div id="main-section">

<div class="location-details">
  <div class="selections">

  </div>
  <div class="paid-slots" v-for="item in paidSlots" :key="item">
      <span>Vehicle Reg</span>
      <p>{{item.VehicleNumber}}</p>
       <span>Name</span>
      <p>{{item.user}}</p>
       <span>Phone</span>
      <p>{{item.PhoneNumber}}</p>
   <font-awesome-icon class="icons" icon="horizontal-elipsis " />   
  </div>
</div>


<div class="admin-details">
  <h2>Profile</h2>

  <div class="admin-profile">
    <div class="admin-image">

<font-awesome-icon class="userIcon" v-if="profilePic == '' "   icon="circle-user" />
<img src="profilePic.jpg" alt="profile-pic" class="profilepic" v-else>


      <div class="name">Victor</div>
      <div class="job-position">Project Manager</div>
      <div class="email">victormonderu@gmail.com</div>

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
import{ app, db, auth, firebaseConfig, user, signOut, collection, onAuthStateChanged, getDocs, getStorage, ref, uploadBytes, getDownloadURL, setDoc, doc,  serverTimestamp, addDoc, query, orderBy, onSnapshot } from '@/firebase.js'

export default {
    data() {
        return {
          modal:false,
          imageUrl:'',
          image:'',
          listOne:false,
          remarks:'',
          lists:true,
          charges: '',
          num:'',
          profilePic: '',
          locations: ['Nairobi', 'Westlands','Mombasa','Kisumu', 'Kiambu','Nakuru', 'Naivasha'],
          paidSlots: {}
        }
    },
    methods: {
      logout:function(){
  signOut(auth).then(() => {
    // Sign-out successful.
    this.$router.push('/')
  }).catch((err) => {
    // An error happened.
    console.log("An error occured while signing out:"+ err);
  });
},
settings:function(){
this.$router.push('/Settings');
},
      toggleMenu:function(){
        this.lists =true;
const menu = document.querySelector('.menu');
menu.style.left = "170px";
menu.style.transition = "2s";
      },
       untoggle:function(){   
const menu = document.querySelector('.menu');
menu.style.left = "-10px";
      },
      openModal:function(){
          this.modal=true
           const app = document.querySelector('#main-page')
         app.classList="active"   
      },
closeModal:function(){
          this.modal= false
     const app = document.querySelector('#main-page')
         app.classList=""   
         this.videoUrl=null
         this.imageUrl= null
      },
        pickFile:function(){
          if(this.lists === true){
         this.$refs.fileInput.click()   
          } 
      },
    onFileSelected:function(event){
            console.log("file selected");
const files = event.target.files;
let filename = files[0].name;
const fileReader = new FileReader();

console.log(files);
fileReader.addEventListener('load', () =>{
  
  this.imageUrl = fileReader.result;
 console.log(this.imageUrl);
     console.log(filename);
 
})
fileReader.readAsDataURL(files[0]);
this.image = files[0];
console.log(this.image);
      },
      upload:function(){
const storage = getStorage();
const storageRef = ref(storage, 'images/' + this.image.name);

const metadata = {
  contentType: this.image.type,
  size:this.image.size,
  name:this.image.name,
  type:this.image.type,
};

// Upload the file and metadata
const uploadTask = uploadBytes(storageRef,this.image, metadata).then(()=>{
 getDownloadURL(storageRef).then((url)=>{
    //  console.log(url)
     const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send(); 
  
const user = auth.currentUser;

const colRef = collection(db,'Maps');
 
 addDoc(colRef, { 
    locationName:this.remarks,
    locationId:this.num,
     url:url,
    createdAt:serverTimestamp(),
    });
      
  })

})
this.modal=false
this.imageUrl = ''
this.image = ''
this.remarks = ''
           const app = document.querySelector('#main-page');
         app.classList="";   
},
fetch:function(){
  const infor = collection(db, 'tickets')
const requests = query(infor, orderBy('createdAt', 'desc'))
onSnapshot(requests, (snapshot)=>{
    
    snapshot.docs.forEach((doc)=>{
 this.paidSlots[doc.id] = {...doc.data(), id:doc.id}
 console.log(this.paidSlots)
    })  
})
}
    },
    beforeMount() {
      this.fetch()
    },
}
</script>
<style scoped>
.lot{
    width: 500px;
    height: 500px;
}
#homePage{
  background: #f0e5ef;
  width: 100%;
}
.userIcon{
  color: rgb(160, 158, 158);
   font-size: 28px; 
}
.menu{
  display: none;
}
.tab li{
  padding: 15px 16px;
  cursor: pointer;
}
.top-section{
 background: linear-gradient(-135deg, #f0e5ef, #3e56cc); 
}
.nav-bar{
display: flex;
justify-content: space-between;
padding:10px;
}
.profilepic{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.search-bar button{
  background: linear-gradient(-135deg, #7d2ce7, #6f6f72); 
  margin-left: 10px;
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
}
.payment-section{
  background: #ebe5f0;
  padding: 20px;
}
.location-details{
  padding: 10px 5px ;
  background-color: rgb(235, 231, 231);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.paid-slots{
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 3px 3px 3px #ceced1, 3px 3px 3px #ceced1, 3px 3px 3px #ceced1;
  cursor: pointer;
}
.location-details span{
  font-size: 10px;
  color: #747177;
}
.location-details p{
  font-weight: 700;
  font-size: 11px;
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
.userProfile{
  width:32px;
  height: 32px;
  border-radius: 50%;
background-color:#ceced1;
display:flex;
justify-content:center;
align-items: center;
}
.admin-details{
  border-top: 0.5px solid grey;
  padding: 16px;
  display: none;
}

@media all and (min-width:500px){
    #homePage{
        /* display: flex; */
        position: relative;
    }
    #main-page.active{
    opacity: 0.15;
    pointer-events: none;
    user-select: none;
    transition: 1s;
    
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
.menu{
transition: 2s;
position: absolute;
background: #010620;
color: #f0e5ef;
height: 100%;
width: 250px;
margin-left: -180px;
display: block;
z-index: 1;
}

.tab li{
  display: flex;
  gap: 10px;
  transition: 2s;
  padding: 10px 10px;
}

.tab{
position:fixed;
background: #010620;
color: #f0e5ef;
height:100vh;
padding-top: 24px;
width:inherit;

}
.tab ul{
  height:100vh;
  display: flex;
flex-direction: column;
gap: 50px;
}
.tab p{
  width: 80%;
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
.admin-details{
   border: none;
   display: block;
}
.location-selector{
  margin-right:20px ;
  padding:5px 10px;
  color:black;
  cursor: pointer;
}
.search-input{
  margin: 0 auto;
  padding:10px 5px 10px 40px;
  width:500px;
}
.price-input{
 margin: 0 auto;
  padding:10px 5px 10px 40px;
  width:90%;
}
.location-details{
    padding-left: 80px;
}
.icons{
  font-size: 24px;
  cursor: pointer;
}
.admin-profile{
  background-color: #fff;
 box-shadow:  3px 3px 5px #ceced1, 3px 3px 5px #ceced1 ;
 border-radius: 5px;
 display: flex;
 flex-direction: column;
 padding: 20px 0px;
 
}
.btn button{
 border: none;
 background-color: #216FD8;
 color: #fff;
 padding: 10px 30px;
 border-radius: 5px;
 cursor: pointer;
}
#modal{
    position:fixed;
    background: #fff;
    top: 3%;
    left:35%;
    border-radius: 10px;
    padding: 16px;
    z-index: 1;
    box-shadow: 3px 3px 5px #ceced1, 3px 3px 5px #ceced1 ;
    width: 29vw;
}
.location-input{
  margin: 0 auto;
  padding:10px 5px 10px 40px;
  width:90%;
}
.create{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
}
.create button{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border:none;
}
.text{
    padding:8px 16px 0;
}
.outline{
    background: #f0f2f5;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    max-height: 300px;
    min-height: 200px;
    padding: 10px;
    cursor: pointer;
}
.outline:hover{
    background: #e4e6eb;
}
.outline button{
    width: 36px;
    height: 36px;
    background: #fff;
    border:0.5px solid #ceced1;
    border-radius: 50%; 
}
.include{
    border: 1px solid #65676b;
    border-radius: 10px;
    padding: 8px ;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.enter{
    padding: 16px 16px 0;
}
.enter button{
   background: #216FD8; 
   color: #fff;
   border-radius: 10px;
   width:calc(100% - 16px);
   display: flex;
   align-items: center;
   padding: 0 12px;
   justify-content: center;
   border: none;
   height: 36px;
   cursor:pointer;
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
}

</style>