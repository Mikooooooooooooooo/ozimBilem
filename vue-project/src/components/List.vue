<template>
    <div class="list">
        <div class="list__main">
            <div class="list__card" v-for="card in cards">
                <app-card @toQuiz="toQuiz" @getCard="toMain" @toUpdate="toUpdate" @updateCard="update" :card="card"></app-card>
            </div>
        </div>     
    </div>
</template>

<style>
    .list{
        width: 1000px ; 
        margin: 0 auto ; 
        margin-top: 7vh ; 
    }
    .list__main{
        display: grid ; 
        grid-gap: 30px;
        grid-template-columns: repeat(3 , 1fr ) ; 
    }
</style>

<script>
    import Card from './Card.vue'
    export default{
        data(){
            return{
                cards: null
            }
        } , 
        methods:{
            async getData(){
                let promise = await fetch('https://d846aa418307c237.mokky.dev/words');
                let json = await promise.json() ; 

                this.cards = json ;
            } , 
            toMain(item){
                this.$emit("getCard" , item );
            } , 
            update(){
                this.getData() ; 
            } , 
            toQuiz(card){
                this.$emit("toQuiz" , card)
            } ,
            toUpdate(card){
                this.$emit("toUpdate" , card)
            }
        } , 
        components:{
            'app-card': Card
        } , 
        mounted(){
            this.getData()
        }
    }
</script>