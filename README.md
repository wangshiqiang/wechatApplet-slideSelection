# wechatApplet-slideSelection
X轴方向，标尺滑动选择功能组件，适用于微信小程序

===== 使用方法 ======

slideSelection 目录为子组件，将该目录放到自己项目的目录中；

-- 父组件的 .json 文件中设置（根据自己存放的目录，自行修改）：

"usingComponents": {
  "slide-select": "/components/slideSelection/slide"
}


-- 父组件的 .wxml 文件中引用：
<!-- <slide-select class="slide-seletion"></slide-select> -->


-- 父组件的 .js 文件的 onReady 方法中调用：

onReady() {
  this.slideSelect = this.selectComponent(".slide-seletion");
}


说明：
有关父、子组件之间的数据传递、方法调用，本组件未提供相关功能，可根据项目情况自行优化。
