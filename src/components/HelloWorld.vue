<template>
  <div id="loginPage">
   <div class="signIn-form">
     <form>
       <input type="email" required placeholder="Email" v-model="email">
       <input type="password" required placeholder="password" v-model="password">
       <p class="error">{{errors}}</p>
       <button @click.prevent="login">LOGIN</button>
       <span @click="recoverPassword" class="forgot-password">forgot Password ?</span>

<div class="create-acc">
       <p>Don't have an account?</p>
       <span @click="signUpPage">Sign up</span>
</div>
     </form>
   </div>
   <div class="section-2">

   </div>
  </div>
</template>

<script>
import{
db, auth, signInWithEmailAndPassword, collection, 
onAuthStateChanged, getDocs
 } from '@/firebase.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      user: '',
      email: '',
      password: '',
      errors: '',
    }
  },
  methods: {
    login:function(){
        if(this.mail === "" && this.pass === ""){
console.log("Fill in required details");

 }else{
                 //  Sign in 
     signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
    // const user = userCredential.user;
      onAuthStateChanged(auth, user => {
          const querySnapshot = getDocs(collection(db, "userDetails"), {
});
 querySnapshot.then((collection) => {

}).catch((error) => {
  console.log(error + "Error getting document:");
  this.errors = "Incorrect Login details";

}); 

      console.log(user.email, user.uid);
      if(user.email==="victormonderu@gmail.com"){
this.$router.push('/AdminPage');

    }else if (user) {
            this.$router.push('/NavigationPage');
    } 
    else{
       
        alert("error");
    }
      })
  });
 }
    },
    signUpPage:function(){
      this.$router.push('/SignUpPage');  
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#loginPage{
  height: 100vh;
  display: flex;
}
.section-2{
  width:50vw;
  background-color: rgb(155, 91, 201);
}
.signIn-form{
  margin: auto;
  background-color: #fff;
  padding: 20px;
}
form{
  display: flex;
  flex-direction: column;
  gap:10px;
}
input{
  /* background-color: rgb(155, 91, 201); */
  color:grey;
  border: 0.5px solid grey;
  padding: 10px 28px;
}
input:focus{
  border: 0.5px solid aqua;
}
button{
  background-color: rgb(5, 43, 43);
  border: none;
  color:#fff;
  cursor: pointer;
  border-radius:16px;
  padding: 12px 24px;
}
.create-acc p{
color:grey;
}
.create-acc span{
color:aqua;
font-weight:600;
cursor: pointer;
}
.forgot-password{
  color:aqua;
  font-weight:600;
}
.error{
  color:red;
  font-size: 12px;
}

</style>
