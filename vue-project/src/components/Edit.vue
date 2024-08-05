<template>
    <div class="new">
        <div class="new__header">
            <div class="new__title">
                Create new module
            </div>
            <div class="new__buttons">
                <div class="new__button" @click="deleteCard()">
                    delete
                </div>
                <div class="new__button" @click="addCard()">
                    save    
                </div>
            </div>
           
        </div>
        <div class="new__main">
            <input type="text" class="new__input" v-model="card__name" placeholder="Enter name of the module...">
                <transition-group class="new__transition" mode="out-in" name="list">
                    <div class="new__card" v-for="(item , index) in items" v-bind:key="item.id">
                        <div class="new__card-header">
                            <div class="new__card-id">
                                {{ index+1}}
                            </div>
                            <img class="new__card-img" @click="removeItem(index)" src="../assets/free-icon-garbage-158725.png" alt="">
                        </div>
                        <div class="new__card-text">
                            <input type="text" v-model="item.word" class="new__card-input" placeholder="word...">
                            <input type="text" v-model="item.meaning" class="new__card-input" placeholder="meaning...">
                        </div>
                    </div>
                </transition-group>
                <div class="new__card">
                    <div class="new__card-header">
                        <div class="new__card-id">
                            {{ this.items.length + 1 }}
                        </div>
                    </div>
                    <div class="new__card-button" @click="addItem()">
                            <img src="../assets/plus-svgrepo-com.svg" alt="">
                            add new card
                    </div>
                </div>
        </div>
    </div>
</template>

<script>    
    export default{
        data(){
            return{
                items:[
                    { word:null , meaning:null , id:1} ,
                    { word:null , meaning:null , id:2} ,
                    { word:null , meaning:null , id:3} ,
                ] ,  
                card__name: null
            }
        } , 
        methods:{
            addItem(){ 
                const id = Math.random()
                this.items.push({ name:null , meaning:null , id: id})
            } , 
            removeItem(index){
                const firstHalf = this.items.slice(0 , index) ; 
                const secondHalf = this.items.slice(index + 1) ; 
                
                this.items = firstHalf.concat(secondHalf)  ;
            } , 
            addCard(){
                if (this.checkCard())
                    this.createCard()
            } , 
            checkCard(){
                if (this.card__name == null){
                    alert('Enter name of the module')
                    return ; 
                }
                for (let i = 0 ; i < this.items.length ; i++){
                    const temp = this.items[i] ; 
                    if (temp.word == null || temp.meaning == null){
                        alert('Fill all blank or delete excess ones')
                        return ;
                    }
                }
                if (this.items.length == 0){
                    alert('Cards must have at least one item')
                    return 
                }
                return true ;                
            } ,
            createCard(){
                const union = {
                    "name" : this.card__name , 
                    "array" : this.items  , 
                    "count" : this.items.length , 
                    "id": this.card.id
                }

                const request = {
                    method: "PATCH" , 
                    headers: {"Content-Type" : "application/json"} , 
                    body: JSON.stringify(union)
                }

                fetch('https://d846aa418307c237.mokky.dev/words/' + this.card.id , request)
                    .then(() => location.reload())
            } , 
            deleteCard(){
                if (confirm('Are you sure'))
                    fetch('https://d846aa418307c237.mokky.dev/words/' + this.card.id , {method: 'DELETE'})
                        .then(() => location.reload())
            }
        } , 
        computed: {
            card(){
                return this.getCard() 
            }
        } , 
        created(){
            this.items = this.card.array
            this.card__name = this.card.name 
            console.log(this.card__name)
        } , 
        inject: ['getCard']
    }

</script>

<style>
    .new{
        width: 900px ;
        margin: 0 auto ; 
        margin-top: 7vh ; 
        color: #3A1313 ; 
        padding-bottom: 4vh ; 
    }
    .new__header{
        display: flex ; 
        justify-content: space-between;
        font-size: 22px ; 
        padding-bottom: 5vh ; 
    }
    .new__buttons{
        display: flex ; 
        gap: 10px ;
    }
    .new__button{
        width: 160px ; 
        display: flex ; 
        justify-content: center;
        align-items: center;
        padding: 1vh 0 ; 
        background:#968752 ; 
        font-size: 16px ; 
        cursor: pointer ; 
    }
    .new__input{
        width: 100% ; 
        outline: none ; 
        border: 0 ; 
        color: #3A1313; 
        font-size: 18px ; 
        border-bottom: 2px solid #968752; 
        background: #663B3B ; 
        padding-bottom: 5px ;
        margin-bottom: 3vh ; 
    }
    ::placeholder{
        color: #3A1313;
    }
    .new__card{
        padding: 25px ; 
        background: #968752 ; 
    }
    .new__card-header{
        display: flex ; 
        justify-content: space-between;
        padding-bottom: 2vh ; 
    }
    .new__card-id{
        font-size: 20px ;
    }
    .new__card-img{
        width:24px ; 
        height: 24px ;
    }
    .new__card-text{
        display: flex ; 
        justify-content: space-between ;
    }
    .new__card-input{
        width: 370px ; 
        outline: none ; 
        border: 0 ; 
        border-bottom: 1px solid #3A1313 ; 
        padding-bottom: 5px ; 
        background: #968752 ; 
        color: #3A1313  ; 
        font-size: 15px ; 
    }
    .new__card-button{
        width:350px;
        display: flex ; 
        justify-content: center;
        align-items: center;
        gap: 5px ; 
        border-bottom: 5px solid #3A1313 ;  
        padding-bottom: 10px ;
        margin: 0 auto ; 
        color: #663B3B; 
        font-size: 20px ;
        font-weight: 700 ; 
        text-transform: uppercase;
    }
    .new__transition{
        display: relative ; 
    }
    .list-enter-from, 
    .list-leave-to{
        transform: scale(.6) ; 
        opacity: 0 ;
    }
    .list-enter-active {
        transition: .4s all ease ; 
    }
    .list-leave-active{
        transition: .4s all ease ; 
        position: absolute ; 
    }   
    .list-move{
        transition: .4s all ease ; 
    }
</style>