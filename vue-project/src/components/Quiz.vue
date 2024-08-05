<template>
    <div class="quiz">
        <div class="quiz__progress">
            <div @click="getAnswer" class="quiz__progress-start">
                {{ start }}
            </div>
            <div class="quiz__progress-chart">
                <div class="quiz__progress-done">

                </div>
            </div>
            <div class="quiz__progress-end">
                {{ end }}
            </div>
        </div>
        <div class="quiz__main">
            <div class="quiz__default" v-if="isDefault">
                <quiz-default @doneQuestion="this.isVisible = true" :list="this.list"  ></quiz-default>
            </div>
            <div class="quiz__inputting" v-if="isInputting">
                <quiz-input @doneQuestion="this.isVisible = true" :list="this.list"></quiz-input>
            </div>
            <div class="quiz__trueFase" v-if="isTrueFalse">
                <quiz-trueFalse @doneQuestion="this.isVisible = true" :list="this.list" ></quiz-trueFalse>
            </div>
            <div class="quiz__matching" v-if="isMatching">
                <quiz-matching @doneQuestion="this.isVisible = true" :list="this.list"></quiz-matching>
            </div>
            <div v-if="isVisible" class="next__alert">
                {{ text }}
            </div>  
            <div class="upperground" @click="nextQuestion" v-if="isVisible"></div>
        </div>
        
    </div>
</template>

<script>
    import DefaultVue from './modules/Default.vue'
    import InputtingVue from './modules/Inputting.vue'
    import MatchingVue from './modules/Matching.vue'
    import TrueFalseVue from './modules/TrueFalse.vue'

    export default{
        data(){
            return{ 
                start: 0, 
                end: 31 , 
                done: ((this.start)*688) / 31 ,
                list: null , 
                isDone: false  , 
                isVisible : false  , 
                text: 'Click card to continue' , 
                isRestart: false , 
                isDefault: false , 
                isTrueFalse: false , 
                isMatching: false , 
                isInputting: false , 
                type: null 
            }
        } , 
        components:{
            'quiz-default': DefaultVue , 
            'quiz-input': InputtingVue ,
            'quiz-trueFalse': TrueFalseVue , 
            'quiz-matching': MatchingVue 
        } , 
        methods:{ 
          
            createQuestion(){
                let temp = this.type ; 
                this.type = Math.floor(Math.random() * 4) ; 
                while (this.type == temp)
                    this.type = Math.floor(Math.random() * 4) ; 
                switch (this.type) {
                    case 0 : 
                        this.isDefault = true 
                        break 
                    case 1 : 
                        this.isInputting = true 
                        break ; 
                    case 2: 
                        this.isTrueFalse = true
                        break ; 
                    case 3: 
                        this.isMatching = true
                        break ; 
                }
            } , 
            nextQuestion(){
                if (this.isRestart){
                    this.start = -1 ; 
                }
                if (this.end == this.start ){
                    this.text = 'Click to restart quiz'
                    this.isRestart = true ; 
                    return ;    
                }
                this.start++ ; 
                this.done = ((this.start)*688) / this.end ; 
                this.isVisible = false ; 
                this.resetData()
                this.createQuestion() ;
            } , 
            resetData(){
                this.isDefault = false 
                this.isInputting = false 
                this.isTrueFalse = false 
                this.isMatching = false 
            }
        } , 
        computed: {
            card(){
                return this.getCard() 
            }
        } , 
        created(){
            this.list = this.card.array
            this.end = this.list.length
            this.createQuestion()
        } , 
        inject: ['getCard']
    }

</script>

<style>

    .quiz{
        width:850px ; 
        margin: 20vh auto 0  ; 
    }
    .quiz__progress{
        width: 850px  ; 
        display: flex ; 
        align-items: center;
        justify-content: space-between;
    }
    .quiz__progress-start , 
    .quiz__progress-end {
        width: 51px ;
        height: 26px;
        display: flex ; 
        align-items: center ; 
        justify-content: center ;
        font-size: 18px ; 
        color: white; 
        border: 1px solid #968752 ; 
    }
    .quiz__progress-chart{
        position: relative; 
        width: calc(850px - (51px * 2 ) - (30px * 2 )) ; 
        background: #D4C385 ; 
        height: 20px ; 
    }
    .quiz__progress-done{ 
        position: absolute ; 
        background: #968752 ; 
        height: 20px ;
        width: v-bind(done + "px")
    }
    .quiz__main{
        position: relative ;
        width: calc(100%-(50px*2)); 
        padding: 0 50px;
        background: #968752 ; 
        height: 50vh;
        margin-top: 2vh ; 
    }
    .quiz__question{
        height: 25vh;
        font-size: 28px ;
        color: #3A1313 ; 
        display: flex ; 
        align-items: center ; 
        justify-content: center;
    }
    .quiz__answers{
        display: grid ; 
        justify-content: space-between;
        grid-template-columns: 1fr 1fr;
        grid-gap: 40px ; 
    }
    .quiz__answer{
        position: relative ; 
        display: flex ; 
        align-items: center;
        justify-content: center;
        height: 60px ;
        border: 1px solid #3A1313 ; 
        font-size: 20px ;
        color: #3A1313 ; 
    }
    .answer__icon{
        position: absolute ; 
        right: 20px ;
    }
    .answer__icon-false{
        width: 35px ; 
        height: 35px ;
    }
    .next__alert{
        position: absolute ; 
        bottom: 20px ;
        right: 40% ;
    }
    .upperground{
        width:100% ; 
        height: 100%;
        position: absolute ; 
        cursor:pointer ; 
        top: 0 ; 
        right: 0;
        z-index: 1 ;
    }
    .quiz__inputting{
        display: relative; 
    }
    .inputting__input{
        width: calc(100% - 20px) ; 
        padding: 10px ; 
        border-radius: 10px ; 
        font-size: 18px ;
        color: #3A1313 ; 
        background: #76693B ; 
        outline: 0 ; 
        border: 0 ; 
        border-bottom: 2px #3A1313 solid ; 
        margin-top: 7vh ;
    }
    .inputting__button{
        position: absolute ; 
        right: 50px;
        margin-top: 4vh ; 
        width: 90px ; 
        height: 40px;
        border-radius: 10px ; 
        background: #76693B ; 
        border: 1px #3A1313 solid ;
        display: flex ; 
        align-items: center ; 
        justify-content: center;
        font-size: 18px ; 
    }
</style>
