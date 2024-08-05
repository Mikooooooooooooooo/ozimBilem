<template>
    <div class="header" >
        <div class="header__title" @click="toHome()">
            OzimBilem
        </div>
        <div class="header__button" @click="toNew()">
            <img src="../assets/plus-svgrepo-com.svg" alt="" class="header__plus">
        </div>
    </div>
</template>

<script>
    export default{
        methods:{
            toHome(){
                this.$router.push('/');
            } , 
            toNew(){
                this.$router.push('/new');
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');   
    .header{
        display: flex ;
        width: 97% ; 
        margin: 0 auto ; 
        padding: 1vh 0 ; 
        justify-content: space-between;
    }
    .header__title{
        color: #3A1313 ; 
        font-family: "Inter", sans-serif;
        font-size: 24px ; 
        cursor:pointer ;
    }
    .header__button{
        width:30px ; 
        height: 30px ;
        background: #968752 ; 
        display: flex ; 
        justify-content: center ; 
        align-items:center;
        border-radius: 50% ;
        cursor: pointer ; 
    }
</style>