<template>
  <div id="loginPage">
   <div class="signIn-form">
     <form>
       <input type="email" required placeholder="Email" v-model="email">
       <input type="password" required placeholder="password" v-model="password">
       <p class="error">{{errors}}</p>
       <button @click="login">LOGIN</button>
       <span @click="recoverPassword" class="forgot-password">forgot Password ?</span>

<div class="create-acc">
       <p>Don't have an account?</p>
       <span @click="signUpPage">Sign up</span>
</div>
     </form>
   </div>
  </div>
</template>

<script>
import{ app, db, auth, firebaseConfig, user, signInWithEmailAndPassword, signOut, collection, onAuthStateChanged, getDocs } from '@/firebase.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
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
    const user = userCredential.user;
    // console.log(user);
    // alert("You've Signed in as" + this.mail);
      onAuthStateChanged(auth, user => {
          const querySnapshot = getDocs(collection(db, "user-Details"), {
});
 querySnapshot.then((collection) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(querySnapshot);
  console.log(collection);

}).catch((error) => {
  console.log("Error getting document:", error);
 this.errors = "Incorrect Login details";

}); 

      console.log(user.email, user.uid);
      if (user) {
            this.$router.push('/NavigationPage');
            console.log(user);
    }else{
        // stop.this.$router.push('/Navigation')
        alert("error");
    }
      })
  });
 }
    },
    signUpPage:function(){
      this.$router.push('/SignUpPage');  
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#loginPage{
  background-color: rgb(7, 0, 12);
  height: 100vh;
  display: flex;
  align-items: center;
}
.signIn-form{
  margin: auto;
}
form{
  display: flex;
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
.create-acc p{
color:grey;
}
.create-acc span{
color:aqua;
cursor: pointer;
}
.forgot-password{
  color:aqua;
}
.error{
  color:red;
}

</style>
