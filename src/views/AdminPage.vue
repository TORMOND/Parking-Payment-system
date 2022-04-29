<template>
<div>
    <div class="nav-bar">
       <input type="file" style="display:none;" @change="onFileSelected" ref="fileInput">
        <button @click="pickFile" >Add Lot</button>
    </div>
    <img :src="image" class="lot" >
</div>
</template>
<script>
export default {
    data() {
        return {
          imageUrl:'',
          image:'',
        }
    },
    methods: {
        pickFile:function(){
    this.$refs.fileInput.click()
      },
        OnFileSelected:function(event){
            console.log("file selected")
const files = event.target.files;
let filename = files[0].name;
const fileReader = new FileReader();

console.log(files)
fileReader.addEventListener('load', () =>{
  
  this.imageUrl = fileReader.result;
 console.log(this.imageUrl)
     console.log(filename)  
 
})
fileReader.readAsDataURL(files[0])
this.image = files[0]
console.log(this.image);
      },
    },
}
</script>
<style scoped>
.lot{
    width: 500px;
    height: 500px;
}
</style>