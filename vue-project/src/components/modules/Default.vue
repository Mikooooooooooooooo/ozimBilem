<template>
    <div class="default">
        <div class="quiz__question">
            {{ item.question }}
        </div>
        <div class="quiz__answers">
            <div @click="choose(index)" v-for="(item , index) in item.answers" class="quiz__answer">
                {{ item.answer }}
                <div class="answer__icon-default" v-if="(chose[index] || item.isTrue) && isDone">
                    <img class="answer__icon-true" src="../../assets/icons8-галочка.svg" v-if="item.isTrue"/>
                    <img class="answer__icon-false" src="../../assets/icons8-крестик-78.png" v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .answer__icon-default{
        position: absolute ;
        right: 15px;
    }
</style>

<script>

    export default{
        data(){
            return { 
                item: {
                    question: 'Who is the first president of KZ' , 
                    answers:[
                        {answer:"Miras" , isTrue: false} , 
                        {answer:"Ayazhan" , isTrue: false} ,
                        {answer:"Miras qoi" , isTrue: false} ,
                        {answer:"Miras dep oilaimyn " , isTrue: true} 
                    ]
                } , 
                chose: [false , false , false , false ] , 
                isDone: false , 
                start : null , 
                end: null 
            }
        } , 
        props: ['list'] , 
        methods: {
            createDefault(){
                this.end = this.list.length
                this.start = Math.floor(Math.random() * this.end)
                this.item.question = this.list[this.start].word ; 
                this.item.answers = this.getAnswer() ; 
            },
            choose(index){
                if (this.isDone)
                    return 
                this.isDone = true ; 
                this.chose[index] = true ; 
                this.$emit('doneQuestion')
            }, 
            getAnswer(){
                const correctIndex = Math.floor(Math.random() * 4) ; 
                const answers = [{answer: null , isTrue: null},{answer: null , isTrue: null},{answer: null , isTrue: null},{answer: null , isTrue: null}] ; 
                const alreadyHave = [] ; 
                for (let i = 0 ; i < 4 ; i++){
                    if (correctIndex == i ){
                        answers[i].answer = this.list[this.start].meaning ; 
                        answers[i].isTrue = true ; 
                        continue; 
                    }
                    let temp = Math.floor(Math.random() * (this.end  )); 
                    while (temp == this.start || alreadyHave.includes(temp)){
                        temp = Math.floor(Math.random() * (this.end )) ; 
                    }
                    answers[i].answer = this.list[temp].meaning ; 
                    answers[i].isTrue = false ;
                    alreadyHave.push(temp) ; 
                } 
                return answers ; 
            } , 
        } , 
        created(){
            this.createDefault() ;
        }
    }
</script>