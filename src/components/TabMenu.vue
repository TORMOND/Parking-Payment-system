<template>
  <div id="menu"> 
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
</template>

<script>
export default {
methods: {
  aboutPage:function(){
    this.$emit('aboutPage')
  },
   feedbackPage:function(){
    this.$emit('feedbackPage')
  },
  logout:function(){
    this.$emit('logout')
  },
   settingsPage:function(){
    this.$emit('settingsPage')
  }
},
}
</script>

<style scoped>
.closer{
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
padding: 2px 30px;
}
.cancel{
  font-size: 24px ;
}
#menu li{
  padding: 15px 16px;
  display: flex;
  gap: 10px;
cursor: pointer;
justify-content: center;
}

</style>