<template>
    <div class="learn">
       
            <div @click="close">
                <transition name="card" mode="out-in" >
                    <div class="learn__main"  v-if="isOpen">
                        {{ item.word }}
                    </div>
                    <div class="learn__main" v-else>
                        {{ item.meaning }}
                    </div>
                </transition>
            </div>
        
        <div class="learn__slider">
            <div class="learn__slider-left" @click="next()">
                <img src="../assets/right-arrow-svgrepo-com (2).svg" alt="">
            </div>
            <div class="learn__slider-counter">
                {{ index+1}}/{{ items.length }}
            </div>
            <div class="learn__slider-right" @click="previous()">
                <img src="../assets/right-arrow-svgrepo-com (2).svg" alt="">
            </div>
        </div>
        <div class="learn__second">
            <div class="learn__button" @click="shuffle()">
                shuffle
            </div>
            <div class="learn__button" @click="changeMode()">
                word / meaning
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                items: [
                    {word: 'football' , meaning: 'type of sport'} , 
                    {word: 'opportunity' , meaning: 'the chance'} , 
                    {word: 'contradiction' , meaning: 'situation having two opposite truths'} , 
                ] , 
                index: 0 , 
                item: null ,
                isOpen: true , 
                isClose: false 
            }
        } , 
        created(){
            this.items = this.card.array

            this.item = this.items[this.index]
        } , 
        computed: {
            card(){
                return this.getCard() 
            }
        } , 
        methods:{
            close(){
                this.isOpen = !this.isOpen ; 
            } , 
            next(){
                if (this.index != 0 )
                    this.index--;
                this.item = this.items[this.index]
                this.openSide()
            },
            previous(){
                if (this.index != this.items.length - 1)
                    this.index++;
                this.item = this.items[this.index]
                this.openSide()
            } , 
            shuffle(){
                this.items = this.random(this.items) ;
                this.index = 0 ; 
                this.item = this.items[this.index] ; 
            } , 
            random(array) {
                return array.sort(() => Math.random() - 0.5);
            } , 
            changeMode(){
                this.isClose = !this.isClose ; 
                this.openSide()
            } , 
            openSide(){
                if (this.isClose)
                    this.isOpen = false 
                else 
                    this.isOpen = true 
            }
        } , 
        inject:['getCard']
    }
</script>

<style>
    .learn{
        width:850px ; 
        margin: 10vh auto 0  ; 
    }
    .learn__main{
        height: 50vh ; 
        padding: 0 30px ; 
        background: #968752;
        display: flex ; 
        align-items: center ;
        text-align: center;
        justify-content: center ;
        font-size: 28px ; 
        color: white ; 
        cursor: pointer ; 
        margin-bottom: 4vh ; 
    }
    .learn__slider{
        display: flex ; 
        width:  fit-content ; 
        margin: 0 auto ; 
        gap: 20px ; 
        margin-bottom: 10vh ; 
    }
    .learn__slider-left{
        width:50px ; 
        height: 50px ; 
        display: flex ;
        align-items: center ; 
        justify-content: center ;
        background: #968752 ; 
        border-radius: 50% ; 
        cursor:pointer ;
    }
    .learn__slider-left img{
        transform: rotate(180deg);
    }
    .learn__slider-counter{
        height: 45px;
        display: flex ;     
        align-items: center ;
        font-size: 28px ;
        color: white ; 
    }
    .learn__slider-right{
        width:50px ; 
        height: 50px ; 
        display: flex ;
        align-items: center ; 
        justify-content: center ;
        background: #968752 ; 
        border-radius: 50% ; 
        cursor:pointer ;
    }
    .learn__second{
        display: flex ; 
        gap: 50px ; 
        padding-bottom: 5.3vh ; 
    }
    .learn__button{
        width:400px ; 
        height:10vh ; 
        background: #3A1313 ; 
        display: flex ; 
        align-items: center ; 
        justify-content: center;
        color: #968752 ; 
        font-size: 28px ; 
        cursor: pointer ;
    }
    .card-enter-from , 
    .card-leave-to { 
        transform: rotateX(90deg)
    }
    .card-enter-active, 
    .card-leave-active{ 
        transition: all .2s ease ;
    }
</style>
