<template>
  <div class="contact-page">
    <div class="back">
<font-awesome-icon @click="homePage" class="icon" icon="arrow-left-long"/>
</div>
   <div class="portfolio">
     <img src="profilePic.jpg" alt="profile-pic" class="profilepic">
      <div class="reach">
        <h3 class="names">Victor Monderu</h3>
        <p class="role">Web Developer</p>
         <p class="email">{{developerEmail}}</p>
         <span class="phone">+254 799 543 923</span>
      </div>
   </div>
  
     
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
setup(props) {
const developerEmail = "victormonderu@gmail.com";

const router = useRouter();
function homePage(){

  router.push('/NavigationPage')
  }

  return{
   developerEmail, homePage
  }
}
}
</script>

<style scoped>
.contact-page{
  padding: 10px 16px;
}
.reach{
  display:flex;
  flex-direction: column;
  gap: 10px;
  font-size:14px;
  padding: 10px 16px;
  margin-top: 20px;
  justify-content: flex-start;
}
.developer{
color: #747177;
}
.back{
  padding:10px;
  margin: 0;
  display: flex;
  align-items: flex-start;
}
.portfolio{
  display: flex;
  gap:10px;
   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
   padding-left: 16px;
}
.profilepic{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: auto 0;
}
.role{
  color: purple;
  font-weight: 600;
  display: inline-flex;
}
.names{
  display: inline-flex;
}
.email{
  color: #747177;
  font-size: 14px;
}
.phone{
  font-size: 12px;
  color: #747177;
  display: inline-flex;
}
</style>