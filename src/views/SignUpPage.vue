<template>
  <div id="signup-page">
<form class="signUp-form">
<input type="text" placeholder="Full Name" required v-model="names">
<input type="text" placeholder="Email" required v-model="mail">
<input type="text" placeholder="Vehicle Reg Number" required v-model="vehicleNumber">
<input type="telephone" placeholder="Phone Number" required v-model="phoneNumber">
<input type="password" placeholder="Password" required v-model="pass">
<input type="password" placeholder="confirm password" required v-model="pass2">
<button @click="createAccount">SIGN UP</button>

<div class="signInPage">
<p>Already have an account</p>
<span @click="loginPage">Sign in</span>
</div>

</form>


  </div>
</template>

<script>

import{ app, db, auth, firebaseConfig, user, createUserWithEmailAndPassword, setDoc } from '@/firebase.js'

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
    setDoc(doc(db, "user-Details", user.uid), {
     email:this.mail,
      name: this.names,
      password:this.pass,
      phoneNumber:this.phoneNumber,
      carReg:this.vehicleNumber,
      id:user.uid,  
    });
 alert("You have signed up us " + this.names);
 this.$router.push('/');
    });    
  }else{
    console.log("The passwords dont match:Please try again");
  }
}
},
    loginPage:function(){
      this.$router.push('/');
    }
  

}
</script>

<style>
#signup-page{
  background-color: rgb(7, 0, 12);
  height: 100vh;
  display: flex;
  align-items: center;
  width: 100%;
}
.signUp-form{
  margin: auto;
  display:flex;
  flex-direction: column;
  gap:10px;
}
input{
  background-color: rgb(7, 0, 12);
  color:grey;
  border: 0.5px solid grey;
  padding: 8px 20px;
}
input:focus{
  border: 0.5px solid aqua;
}
button{
  background-color: aqua;
  border: none;
  cursor: pointer;
  border-radius:32px;
  padding: 5px;
}
.signInPage span{
color:aqua;
cursor:pointer;
}
.signInPage p{
color:grey;
}


</style>