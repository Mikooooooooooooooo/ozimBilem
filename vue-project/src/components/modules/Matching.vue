<template>
    <div class="matching" >
        <transition name="toggle">
            <div class="matching__toggle" v-if="showToggle">
                Fill all gaps
            </div>
        </transition>
        
        <div class="matching__header">
            <div class="matching__title">
                Match words with their meanings
            </div>
            <div class="matching__button" @click="submit">
                submit
            </div>
        </div>
       
        <div class="matching__main">
            <div class="matching__words">
                <div class="matching__word" v-for="word in words">{{ word }}</div>
            </div>
            <div class="matching__inputs">
                <div class="matching__input-container"   v-for="(meaning , index ) in meanings">
                    <div name=""  id="" @click="openOption(index)" class="matching__input" >
                        {{ answer[index] }}
                    </div>
                    <div class="matching__input-options" v-if="this.isOpen[index]" @blur="this.isOpen[index] = false">
                        <div v-for="meaning in meanings" @click="chooseOption(index , meaning)" class="matching__input-option">
                            {{ meaning }}
                        </div>
                    </div>
                    <img src="../../assets/arrow-down.svg" alt="" class="input__arrow">
                    <div class="matching__answer-icon" v-if="isDone">
                        <img class="answer__icon-true" src="../../assets/icons8-галочка.svg" v-if="isRight[index]"/>
                        <img class="answer__icon-false" src="../../assets/icons8-крестик-78.png" v-else />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return { 
                words: ['Spain' , 'Iran' , 'Turkey' , 'Kazakhstan'] , 
                meanings: ['Madrid' , 'Tegeran' , 'Ankara' , 'Astana'] , 
                solution: [null , null , null , null] , 
                isOpen: [false , false , false , false ] , 
                isRight: [false , false , false , false] , 
                answer: [null , null , null , null] , 
                showToggle: false , 
                isDone: false 
            }
        } , 
        methods: { 
            pickWord(){
                const array = []
                for (let i = 0 ; i < 4 ; i++){
                    let temp = Math.floor(Math.random() * this.list.length) 
                    while (array.includes(temp)){
                        temp = Math.floor(Math.random() * this.list.length) 
                    }
                    array.push(temp)
                }
                for (let i = 0 ; i < 4; i++){
                    this.words[i] = this.list[array[i]].word 
                    this.solution[i] = this.list[array[i]].meaning
                }
                const shuffle = [] ; 
                for (let i = 0 ; i < 4; i++){
                    let temp = Math.floor(Math.random() * 4)
                    while (shuffle.includes(temp))
                        temp = Math.floor(Math.random() * 4)
                    shuffle.push(temp)
                }
                for (let i = 0 ; i < 4; i++){
                    this.meanings[shuffle[i]] = this.solution[i]
                }

            }, 
            openOption(index){
                if (this.isDone)
                    return 
                this.isOpen[index] = !this.isOpen[index]
                for (let i = 0; i < 4 ; i++){
                    if ( i == index)
                        continue; 
                    this.isOpen[i] = false 
                }
            } , 
            chooseOption(index , meaning){
                this.answer[index] = meaning ; 
                this.openOption(index) ;    
            } , 
            submit(){
               for (let i = 0 ; i < 4 ; i++){
                  if (!this.answer[i]){
                    this.openToggle()
                    return ; 
                  }
               }
               for (let i = 0 ; i < 4 ; i++){
                this.isRight[i] = this.answer[i] == this.solution[i] ; 
               }
               this.isDone = true 
               this.$emit('doneQuestion')
            } , 
            openToggle(){
                this.showToggle = true ;
                setTimeout(() => this.showToggle = false , 2000)
            }
        } , 
        props: ['list'] , 
        created(){
            this.pickWord() ; 
        }
    }
</script>

<style>
    .matching{
        padding-top: 6vh ; 
        position: relative;
    }
    .matching__toggle{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 10px ;
        right: 0;
        width: 200px ;
        height: 40px ;
        background: #7C7045 ; 
    }
    .matching__header{
        display: flex ;
        justify-content: space-between;
        align-items: center;
    }
    .matching__title{
        font-size: 20px ; 
        color: #3A1313 ; 
    }
    .matching__button{
        font-size: 18px ;
        width: 110px ;
        height: 35px;
        border: 1px solid #3A1313 ; 
        display: flex ; 
        align-items: center ;
        justify-content: center;
        color: #3A1313 ; 
        cursor: pointer;
        background: #7C7045 ;
    }
    .matching__main{
        padding-top: 4vh ; 
        display: flex ; 
        gap: 20px ; 
    }
    .matching__words , 
    .matching__inputs{
        width: calc(50% - 10px) ;
    }
    .matching__word , 
    .matching__input{
        width: calc(100% - 30px ) ; 
        height: 30px ;
        margin-bottom: 3.5vh ; 
        font-size: 20px ;
        color: #3A1313 ; 
        padding: 10px 15px;
        background: #7C7045 ;
        border: 1px dashed #3A1313 ; 
    }
    .matching__input{
        margin-bottom: 0;
    }
    .matching__input-container{
        cursor: pointer ;
        position: relative ; 
        margin-bottom: 3.5vh ; 
    }
    .matching__input-options{
        position: absolute ;
        z-index: 1 ; 
        
    }
    .matching__input-option{
        display: flex ;
        align-items: center;
        padding-left: 10px;
        width: 355px ;
        height: 40px ;
        font-size: 20px ;
        color: #3A1313 ; 
        background: #7C7045 ;
        border: 1px solid #3A1313 ; 
    }
    .matching__answer-icon{
        position: absolute ; 
        right: -40px ;
        top: 8px; 
    }
    .input__arrow{
        position: absolute;
        top: 15px ;
        right: 15px ;
    }
    .toggle-enter-from{
        opacity: 0;
        transform: translateY(-30px);
    }
    .toggle-enter-to{
        transform: translateY(0);
    }
    .toggle-enter-active{
        transition: all 0.3s ease;
    }
    .toggle-leave-from{
        opacity: 1;
        transform: translateY(0);
    }
    .toggle-leave-to{
        transform: translateY(-30px);
        opacity: 0;
    }
    .toggle-leave-active{
        transition: all 0.3s ease;
    }
</style>