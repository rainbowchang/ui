<template>
  <div class="content">
    <!-- <div class="jiantou">
      <span class="top"></span>
      <span class="line"></span>
    </div> -->
    <!-- <el-input class="input" @input="changeScaleplate" v-model="msg" placeholder type="number"></el-input> -->
    <section id="zhizi"></section>
  </div>
</template>

<script>
export default {
  name: "ruleLine",
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      msg: 0,
      mouseX: 0,
      mouseFirst: true,
      defaultAmount: 1000,
      leftAmount: 0,
      rightAmount: 8000,
      step: 100,
      setTimeOut: null
    };
  },
  mounted() {
    // let _this = this;
    // let box = document.getElementById("zhizi");
    // this.leftAmount = this.defaultAmount - this.step;
    // this.rightAmount = this.defaultAmount + this.step + 100;
    this.msg = this.number;
    this.createScaleplate();
    // box.ontouchmove = function(e) {
    //   _this.toSlide(e);
    // };
  },
  methods: {
    // changeScaleplate() {
    //   setTimeout(() => {
    //     let box = document.getElementById("zhizi");
    //     box.innerHTML = "";
    //     this.msgs = Math.ceil(Number(this.msg));
    //     // this.leftAmount = this.msgs - this.step;
    //     // this.rightAmount = this.msgs + this.step + 100;
    //     this.createScaleplate();
    //   },300);
    // },
    createScaleplate() {
      let box = document.getElementById("zhizi");
      for (let i = 0; i < this.rightAmount; i++) {
        let div = document.createElement("div");
        div.setAttribute("id", i);
        // 刻度线
        if (i % 1000 === 0 && i >= 0) {
          div.setAttribute("class", "intNum");
          let span = document.createElement("span");
          span.setAttribute("class", "tishi");
          span.innerText = i;
          div.appendChild(span);
        } else if (i % 500 === 0 && i >= 0) {
          div.setAttribute("class", "fiveNum");
        } else if (i % 100 === 0 && i >= 0) {
          div.setAttribute("class", "floatNum");
        } else {
          div.setAttribute("class", "hiddenDiv");
        }
        // if (i <= this.number) {
        //   div.setAttribute("class", "bgColor");
        // }
        box.appendChild(div);
      }
    },
    // toLeftSlide(BX) {
    //   let box = document.getElementById("zhizi");
    //   box.removeChild(box.firstChild);
    //   let lastChildId = Number(box.lastChild.getAttribute("id"));
    //   let div = document.createElement("div");
    //   div.setAttribute("id", lastChildId + 1);
    //   if ((lastChildId + 1) % 10 === 0) {
    //     div.setAttribute("class", "intNum");
    //     let span = document.createElement("span");
    //     span.setAttribute("class", "tishi");
    //     span.innerText = lastChildId + 1;
    //     div.appendChild(span);
    //   } else {
    //     div.setAttribute("class", "floatNum");
    //   }
    //   this.mouseX = BX;
    //   this.leftAmount = Number(box.firstChild.getAttribute("id"));
    //   this.rightAmount = Number(box.lastChild.getAttribute("id"));
    //   this.msg = Number(box.lastChild.getAttribute("id")) - (this.step - 1);
    //   box.appendChild(div);
    // },
    // toRightSlide(BX) {
    //   let box = document.getElementById("zhizi");
    //   let firstChildId = Number(box.firstChild.getAttribute("id"));
    //   if (firstChildId === -this.step) {
    //     return false;
    //   }
    //   box.removeChild(box.lastChild);
    //   let div = document.createElement("div");
    //   div.setAttribute("id", firstChildId - 1);
    //   if ((firstChildId - 1) % 10 === 0 && firstChildId - 1 >= -1) {
    //     div.setAttribute("class", "intNum");
    //     let span = document.createElement("span");
    //     span.setAttribute("class", "tishi");
    //     span.innerText = firstChildId - 1;
    //     div.appendChild(span);
    //   } else if (firstChildId - 1 >= 0) {
    //     div.setAttribute("class", "floatNum");
    //   } else {
    //     div.setAttribute("class", "hiddenDiv");
    //   }
    //   this.mouseX = BX;
    //   this.leftAmount = Number(box.firstChild.getAttribute("id"));
    //   this.rightAmount = Number(box.lastChild.getAttribute("id"));
    //   this.msg = Number(box.lastChild.getAttribute("id")) - this.step;
    //   box.prepend(div);
    // },
    // toSlide(e) {
    //   let _this = this;
    //   // let box = document.getElementById("zhizi");
    //   if (_this.mouseFirst) {
    //     _this.mouseX = e.changedTouches[0].clientX;
    //     _this.mouseFirst = false;
    //   }
    //   let AX = _this.mouseX;
    //   let BX = e.changedTouches[0].clientX;
    //   if (AX - BX > 0) {
    //     _this.toLeftSlide(BX);
    //   } else if (AX - BX < 0) {
    //     _this.toRightSlide(BX);
    //   }
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 500px;
  /* height: 400px; */
  border: 1px solid black;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}
.bgColor {
  height: 50px;
  width: 15px;
  color: red;
  border-left: 1px solid red;
}
.input {
  width: 200px;
  margin-bottom: 20px;
}
.jiantou {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .top {
  border: 10px solid #ccc;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
} */
.line {
  background-color: red;
  /* border-left: 1px solid #ccc; */
  height: 50px;
  width: 2px;
}
#zhizi {
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  align-items: flex-end;
  overflow: hidden;
}
.intNum {
  border-left: 1px solid black;
  height: 20px;
}
.fiveNum {
  border-left: 1px solid black;
  height: 17px;
}
.floatNum {
  border-left: 1px solid black;
  height: 10px;
}
</style>
