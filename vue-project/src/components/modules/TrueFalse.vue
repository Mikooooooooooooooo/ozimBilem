<template>
    <div class="trueFalse">
        <div class="trueFalse__main">
            <div class="trueFalse__word">
                {{ word }}
            </div>
            <div class="trueFalse__word">
                {{ meaning }}
            </div>
        </div>
        <div class="trueFalse__second">
            <div class="trueFalse__button-true" @click="checkAnswer(0)">
                True
            </div>
            <div class="trueFalse__button-false" @click="checkAnswer(1)">
                False
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                word: null ,
                meaning: 'jaqsy bala' , 
                trueBorder: '1px #3A1313 solid' , 
                falseBorder: '1px #3A1313 solid' , 
                type: null , 
                start: null , 
                end: null 
            }
        } , 
        methods:{
            createQuestion(){
                this.end = this.list.length
                this.start = Math.floor(Math.random() * this.end)
                this.word = this.list[this.start].word ; 
                this.type = Math.floor(Math.random() * 2) ; 
                if (this.type == 0){
                    this.meaning = this.list[this.start].meaning 
                }else{
                    let temp = Math.floor(Math.random() * this.end)  
                    while (temp == this.start){
                        temp = Math.floor(Math.random() * this.end)
                    }
                    this.meaning = this.list[temp].meaning 
                }
            } , 
            checkAnswer(index){
                if (this.type == index){
                    if (index == 0)
                        this.trueBorder = "2px dashed #00FF00" ; 
                    else 
                        this.falseBorder = "2px dashed #00FF00" ; 
                } else {
                    if (index == 0){
                        this.trueBorder = "2px dashed #FF0000" ; 
                        this.falseBorder = "2px dashed #00FF00" ; 
                    }else {
                        this.trueBorder = "2px dashed #00FF00" ; 
                        this.falseBorder = "2px dashed #FF0000" ; 
                    }
                }
                this.$emit('doneQuestion')
            }
        } , 
        created(){
            this.createQuestion() ; 
        } , 
        props:['list' ]
    }
</script>

<style>
    .trueFalse{
        padding-top: 3vh ; 
    }
    .trueFalse__main{
        display: flex ; 
        height: 30vh;
    }
    .trueFalse__word{
        width: 50% ; 
        display: flex ;
        justify-content: center;
        align-items: center;
        font-size: 28px ; 
        color: #3A1313 ; 
    }
    .trueFalse__word:first-of-type{
        border-right: 1px solid white ; 
    }
    .trueFalse__second{
        display: grid ; 
        grid-template-columns: 1fr 1fr ;
        grid-column-gap: 50px;
        padding-top: 4vh ; 
    }
    .trueFalse__button-true , 
    .trueFalse__button-false {
        display: flex ;
        border: 1px #3A1313 solid ; 
        height: 65px;
        border-radius: 10px ; 
        justify-content: center;
        align-items: center;
        font-size: 18px ;
        color: #3A1313 ; 
        cursor: pointer ; 
    }

    .trueFalse__button-true{
        border: v-bind(trueBorder)
    }
    .trueFalse__button-false{
        border: v-bind(falseBorder)
    }
</style>