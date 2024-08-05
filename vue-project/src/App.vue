<template>
  <div class="app">
    <div class="app__header">
      <app-header></app-header>
    </div>
    <div class="app__main">
      <RouterView @getCard="toUpdate" @toUpdate="toUpdate" @toQuiz="toUpdate"></RouterView>
    </div>
  </div>
</template>

<style>
  *{
    margin: 0 ; 
    padding: 0 ; 
  }
</style>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');   
  .app{
    background: #663B3B;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    min-height: 100vh;
  }
  .app__header{
    border-bottom: 2px solid #968752;
  }

</style>

<script>
  import { RouterView } from 'vue-router';
  import Header from './components/Header.vue'
  export default{
    data(){
      return{
        card: null
      }
    } , 
    components:{
      'app-header': Header
    } , 
    methods:{
      toUpdate(card){
        this.card = card 
      }
    } , 
    provide(){
      return{
        getCard: () => this.card 
      }
    }
  }
</script>