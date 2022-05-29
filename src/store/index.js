import { createStore } from 'vuex'
import{ app, db, auth, firebaseConfig, user, signInWithEmailAndPassword, 
  signOut, collection, onAuthStateChanged, getDocs } from '@/firebase.js'
export default createStore({
  state: {
    location: 'Nairobi',
    price: 400,
    user:null,
    userId: "",
    userEmail: null,
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
