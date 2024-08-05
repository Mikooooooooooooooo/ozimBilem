<template>
    <div class="card">
        <div class="card__header">
            <div class="card__title">
                {{ card.name }} 
            </div>
            <div class="card__edit" @click="toEdit">
                <img src="../assets/edit-svgrepo-com.svg" alt="" >
            </div>
        </div>
        <div class="card__main">
            <div @click="toLearn()" class="card__button">
                learn
            </div>
            <div @click="toQuiz()" class="card__button">
                quiz
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
            }
        } ,
        props: ['card'] , 
        methods:{
            toLearn(){
                this.$emit('getCard' , this.card)
                this.$router.push('/learn'); 
            } , 
            toEdit(){
                this.$emit('toUpdate' , this.card)
                this.$router.push('/edit')
            } , 
            toQuiz() { 
                this.$emit('toQuiz' , this.card) 
                this.$router.push('/quiz')
            }
        }
    }
</script>

<style>    
    .card{
        padding: 10px ; 
        background: #968752 ; 
    }
    .card__header{
        display: flex ;
        justify-content: space-between;
        margin-bottom: 4vh ; 
    }
    .card__title{
        color: #3A1313 ; 
        font-size: 18px ; 
    }
    .card__count{
        padding: 5px ; 
        background: #7A6E44 ; 
        transition: all .2s ease ; 
    }
    .card__count:hover{
        cursor: pointer ; 
    }
    .card__main{
        display: flex ; 
        gap: 10px ;
    }
    .card__button{
        width: calc(50% - 5px) ; 
        text-align: center ;
        background: #7A6E44 ; 
        padding: 6px 0 ;
        color: white ; 
    }
    .card__button{
        cursor: pointer ; 
    }
    .card__edit{
        width: 30px ; 
        height: 30px ; 
        display: flex ; 
        align-items: center ; 
        justify-content: center;
        background: #7A6E44 ; 
        cursor: pointer ;
    }
</style>