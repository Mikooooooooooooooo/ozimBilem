<template> 
    <div class="inputting">
        <div class="quiz__question">
            {{ item.word }}
        </div>
        <div class="inputting__input-container">
            <input type="text" :disabled="isDone" v-model="input_answer" class="inputting__input">
            <div class="answer__icon" v-if="isDone">
                    <img class="answer__icon-true" src="../../assets/icons8-галочка.svg" v-if="checkInput()"/>
                    <img class="answer__icon-false" src="../../assets/icons8-крестик-78.png" v-else />
                    <div class="right__answer" v-if="!checkInput()">
                        {{ item.meaning }}
                    </div>
            </div>
        </div>
        <div class="inputting__button" @click="submitInput">submit</div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                item: null , 
                input_answer: null , 
                isDone: false
            }
        }, 
        methods:{
            create(){
                const start = Math.floor(Math.random() * this.list.length)
                this.item = this.list[start]
            } , 
            submitInput(){
                if (this.input_answer == null)
                    return ; 
                this.isDone = true
                this.$emit('doneQuestion')
            } , 
            checkInput(){
                return this.input_answer.toLowerCase() == this.item.meaning.toLowerCase()
            } , 
           
        } , 
        props: ['list'] , 
        created(){
            this.create() ;
        }
    }
</script>

<style>
    .inputting__input-container{
        position: relative ; 
    }
    .answer__icon{
        display: flex ;
        position: absolute ; 
        bottom: 7px; 
        right: -30px;
        align-items: center;
        gap: 5px; 
    }
</style>