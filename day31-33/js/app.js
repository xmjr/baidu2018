
// 获取地区复选框、产品复选框、表格外层
var regionWrapper = document.getElementById("region-radio-wrapper"),
	productWrapper = document.getElementById("product-radio-wrapper"),
	tableWrapper = document.getElementById("table-wrapper");



// 初始化地区、商品复选框（也可直接写在html中，这样js只需要做事件处理即可）
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

generateCheckBox(productWrapper,[{
	value: 1,
	text: "手机"
}, {
	value: 2,
	text: "笔记本"
}, {
	value: 3,
	text: "智能音箱"
}]);

// 页面加载时，根据默认选项调用一次数据来渲染表格
window.onload = function() {
	updateTable();
}