// components/slideSelection/slide.js
Component({
  properties: {},
  data: {
    dateList: ['随时取', null, null, null, null, '1个月', null, null, null, null, '2个月', null, null, null, null, '3个月', null, null, null, null, '4个月', null, null, null, null, '5个月', null, null, null, null, '6个月', null, null, null, null, '7个月', null, null, null, null, '8个月', null, null, null, null, '9个月', null, null, null, null, '10个月', null, null, null, null, '11个月', null, null, null, null, '一年及以上'],
    winWidth: wx.getSystemInfoSync().windowWidth,
    selectedTerm: 0,
    listIndex: [],
    listLeft: null,
    iMargin: 9, // 刻度之间的间距
    activeIndex: 0,
    dropTouch: {
      currX: null,
      moveX: null,
      moveY: null,
      startX: null,
      startY: null,
    }
  },
  ready() {
    this.data.dateList.forEach((v, i)=>{
      if (v) {
        // 窗口宽度/2-(索引值*(间距+标线宽度))-间距-标签左侧padding值
        this.data.listIndex.push(this.data.winWidth/2 - (i * (this.data.iMargin + 1)) - this.data.iMargin - this.data.winWidth/2);
      }
    });
    // console.log(this.data.listIndex);
    this.setResult(6);
  },
  methods: {
    touchstart(event){
      // console.log(event);
      this.setData({
        'dropTouch.startX': event.touches[0].pageX - event.currentTarget.offsetLeft,
        'dropTouch.currX': event.touches[0].clientX
      });
    },
    touchmove(event){
      // console.log(event);
      var touchPros = event.touches[0];
      this.setData({
        'dropTouch.moveX': touchPros.pageX - this.data.dropTouch.startX
      });
      var fangxiang = false;
      if (event.touches[0].clientX > this.data.dropTouch.currX) { // 向右
        fangxiang = true;
      }
      this.setDrop(this.data.dropTouch.moveX, fangxiang);
    },
    touchend(event){
      var _clientX = parseInt(event.changedTouches[0].clientX),
          _currX = parseInt(this.data.dropTouch.currX),
          _minX = Math.min(_clientX, _currX),
          _maxX = Math.max(_clientX, _currX);
      if(_clientX != _currX && _minX != _maxX - 1 && _minX != _maxX -2) { // 如果拖动了
        this.setResult();
      }
    },
    setDrop(m, fangxiang) {
      let _pos = this.data.dateList.length - 1;
      var currLeft = parseFloat(this.data.listLeft);
      if (currLeft >= 0 && fangxiang) {
        // this.listLeft = 0;
        // return false;
      }else if(currLeft >= this.data.listIndex[0] && fangxiang){ // 如果已到左侧
        this.setData({listLeft: this.data.listIndex[0]});
      } else if(currLeft <= this.data.listIndex[this.data.listIndex.length-1] && !fangxiang){ // 如果已到右侧
        this.setData({listLeft: this.data.listIndex[this.data.listIndex.length-1]});
      } else if (currLeft <= -(this.data.iMargin * _pos + _pos) && !fangxiang) { // 总长度 - 标尺父级元素宽度的1/2
        this.setData({listLeft: -(this.data.iMargin * _pos + _pos)});
      }else{
        this.setData({listLeft: m});
      }
      this.setActive();
      // console.log(this.data.listLeft);
    },
    setResult(toPosition){
      // console.log('=======开始 ', this.listLeft);
      let __left = 0;
      if (toPosition != undefined) {
        __left = this.data.listIndex[toPosition];
      }else{
        __left = this.limit(this.data.listIndex, this.data.listLeft);
      }
      this.setData({listLeft: __left});
      this.setActive();
      // console.log('=======结束 ', this.listLeft);
      // console.log('已选期限：', this.data.selectedTerm);
    },
    setActive(){
      let _index = this.data.listIndex.indexOf(this.limit(this.data.listIndex, this.data.listLeft));
      this.setData({
        selectedTerm: _index, // 设置已选期限
        activeIndex: _index
      });
    },
    limit(arr, num){
      var newArr = [];
      arr.map(function(x){
        newArr.push(Math.abs(x - num));// 对数组各个数值求差值
      });
      var index = newArr.indexOf(Math.min.apply(null, newArr));// 求最小值的索引
      return arr[index];
    },
  }
})