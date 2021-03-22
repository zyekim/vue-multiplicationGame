<template>
  <div id="wrap">
    <h2 class="title">구구단! 20문제</h2>
    <button @click="startGame">시작</button>
    <div class="quizArea" v-if="start">
      <div class="quizArea__wrap">
        <p class="quizArea__inner">
          <span class="num1">{{ firstNum }}</span>곱하기 <span class="num2">{{ secondNum }}</span>는?
        </p>
      </div>
      <div class="inputArea">
        <form @submit.prevent="multiple">
          <input type="text" ref="inputNums" class="inputArea__inputNums" v-model="value"/>
          <button class="inputArea__submitButton" type="submit">입력</button>
        </form>
      </div>
    </div>
      <!-- 마지막 문제 후 나타나게 하기 -->
    <div class="resultArea" v-if="tries.length == 20">
      <p>맞힌 개수 <span class="resultArea__correctNums">{{correctNums}}</span>/ 20개</p>
      <p>소요시간: {{countTimes}}</p>
      <ul class="resultArea__resultBox">
        <li class="resultArea__resultItem" v-for="(trial , index) in tries" :key="index">
          결과: {{trial.tf}} 정답:{{trial.answer}} 제출한 답: {{trial.value}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let num1 = () => {return Math.ceil(Math.random()*9) + 1}
let num2 = () => {return Math.ceil(Math.random()*9) + 1}
export default {
  data(){
    return{
      done:false,
      start:false,
      firstNum:num1(),
      secondNum:num2(),
      tries:[],
      value:'',
      correctNums:0,
      // countTimes:endTime - startTime
    }
  },
  computed:{
    countTimes(){
      return endTime - startTime
    },
    result(){
      return this.firstNum * this.secondNum
    },
  },
  methods:{
    startGame(){
      this.start = true
      this.tries = []
      startTime = new Date()
      console.log(this.startTime)
    },
    multiple(){
      if(this.result == this.value){
        this.tries.push({
          tf:'정답',
          answer:this.result,
          value:this.value
        });
        this.value='';
        this.correctNums += 1;
        this.firstNum = num1();
        this.secondNum = num2();
        this.$refs.inputNums.focus();
      } else{
        this.tries.push({
          tf:'오답',
          answer:this.result,
          value:this.value
        });
        this.value='';
        this.firstNum = num1();
        this.secondNum = num2();
        this.$refs.inputNums.focus();
      }
      if(this.tries.length == 20){
        this.start = false
        endTime = new Date()
      }
      console.log(this.endTime)
    }
  }
}
</script>

<style lang="scss" scoped>

#wrap{
  width:700px;
  // margin:0 auto;
  height: 500px;
  border:2px solid rgb(236, 179, 169);
  border-radius: 20px;
  text-align: center;
  display:flex;
  align-items: center;
  flex-direction: column;
}
.title{
  font-weight:600;
  font-size:20px;
  color:rgb(40, 43, 53);
}
.num1{
  font-size:20px;
  color:blue;
}
.quizArea{
  $self:&;
  width:inherit;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top:20px;
  &__wrap{
    border-radius: 20px;
    width:50%;
    height: 150px;
    background-color:rgb(197, 240, 192);
    text-align: center;
    display:flex;
    justify-content: center;
    align-content: center;
  }
  &__inner{
    background-color: #fff;
    width:250px;
    height:80px;
    border-radius: 20px;
    font-size:23px;
    line-height: 80px;
  }
}
.inputArea{
  $self:&;
  margin-top: 30px;
  &__inputNums{
    border:1px solid #bbb;
    height:50px;
    width:150px;
    font-size:25px;
    padding:10px;
  }
}
.resultArea{
  width:90%;
  $self:&;
  &__resultBox{
    height: 300px;
    display: flex;
    width: 100%;
    flex: column , no-wrap;
    flex-direction: column;
    flex-wrap: wrap;
  }
  &__resultItem{
    list-style: none;
  }
}
</style>