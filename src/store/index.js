import { createStore } from 'vuex'

export default createStore({
  state: {
    location: 'Nairobi',
    price: 400,
    user:null,
    userId: "",
    userEmail: null,
    userName:'',
    userPhoneNumber:'',
    userProfile:'',
    vehicleReg:'',
    selectedTime:'',
    selectedSlot:''
  },
  mutations: {
     update(state,payload){
        
     },
     setUser(state, payload){
 state.user = payload

 
     }
  },
  actions: {

  },
  modules: {
    
  }
})
