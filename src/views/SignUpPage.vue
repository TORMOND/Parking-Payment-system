<template>
  <div id="signup-page">
 <div class="section-2">
    
  </div>
<form class="signUp-form">
<input type="text" placeholder="Full Name" required v-model="names">
<input type="text" placeholder="Email" required v-model="mail">
<input type="text" placeholder="Vehicle Reg Number" required v-model="vehicleNumber">
<input type="telephone" placeholder="Phone Number" required v-model="phoneNumber">
<input type="password" placeholder="Password" required v-model="pass">
<input type="password" placeholder="confirm password" required v-model="pass2">

<button @click.prevent="createAccount">SIGN UP</button>

<div class="signInPage">
<p>Already have an account</p>
<span @click.prevent="loginPage">Sign in</span>
</div>

</form>


  </div>
 
</template>

<script>

import{ app, db, auth, user, createUserWithEmailAndPassword, setDoc, doc, collection, onAuthStateChanged  } from '@/firebase.js'

export default {
  name: 'SignUpPage',
  data() {
    return {
      mail:'',
      names:'',
      vehicleNumber:'',
      phoneNumber:'',
      pass: '',
      pass2: '', 
    }
  },
  methods: {
   infor:function(){
 console.log(email.value);
  },
createAccount:function(){
  if(this.pass === this.pass2){
       console.log(this.names, this.pass, this.pass2)
  createUserWithEmailAndPassword(auth, this.mail, this.pass).then((userCredential) => {  
    const user = userCredential.user;
    setDoc(doc(db, "userDetails", user.uid), {
      email:this.mail,
      name: this.names,
      password:this.pass,
      phoneNumber:this.phoneNumber,
      carReg:this.vehicleNumber,
      id:user.uid,  
    });

    }).then(()=>{
this.$router.push('/') 
    })
    
  }else{
    console.log("The passwords dont match:Please try again");
  }
},
loginPage:function(){
      this.$router.push('/');
    }

},
    
  

}
</script>

<style>
#signup-page{
  height: 100vh;
  display: flex;
  width: 100%;
}
.section-2{
  width:50vw;
  background-color: rgb(155, 91, 201);
}
.signUp-form{
  margin: auto;
  display:flex;
  flex-direction: column;
  gap:10px;
   background-color: #fff;
  padding: 20px;
}
input{
  color:rgb(44, 43, 43);
  border: 0.5px solid rgb(39, 38, 38);
  padding: 10px 28px;
}
input:focus{
  border: 0.5px solid aqua;
}
button{
  background-color: aqua;
  border: none;
  cursor: pointer;
  border-radius:16px;
  padding: 8px 24px;
}
.signInPage span{
color:aqua;
font-weight:600;
cursor:pointer;
}
.signInPage p{
color:grey;
}
@media all and(max-width: 500px){

}
@media all and(min-width: 2400px){

}



</style>