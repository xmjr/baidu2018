
// 获取地区复选框、产品复选框、表格外层
var regionWrapper = document.getElementById('region-radio-wrapper'),
    productWrapper = document.getElementById('product-radio-wrapper'),
    tableWrapper = document.getElementById('table-wrapper');

window.onload = function () {
  //页面加载根据默认选择调用一次渲染表格
  updateTable();
} 
//初始化地区
generateCheckBox(regionWrapper, [{
  value: 1,
  text: "华东"
}, {
  value: 2,
  text: "华北"
}, {
  value: 3,
  text: "华南"
}]);
//初始化产品
generateCheckBox(productWrapper, [{
  value: 1,
  text: "手机"
}, {
  value: 2,
  text: "笔记本"
}, {
  value: 3,
  text: "智能音箱"
}]);    

