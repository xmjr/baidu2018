/**
 * [根据表单选项获取数据]
 * @return list [返回符合表单的数据]
 */

function getData() {
	var list = [],  // 用来存储要返回的数据
		len = sourceData.length,
		region = "",
		product = "";

	var regions = regionWrapper.querySelectorAll("input[checkbox-type=sub]:checked");
	var products = productWrapper.querySelectorAll("input[checkbox-type=sub]:checked");

	for (var i = 0; i < len; i++) {
		for (var j = 0; j < regions.length; j++) {
			for (var k = 0; k < products.length; k++) {
				// 获取地区复选框中对应的名字
				region = regions[j].getAttribute("data-text");
				// 获取商品复选框中对应的名字
				product = products[k].getAttribute("data-text");

				if (sourceData[i].region === region && sourceData[i].product === product) {
					list.push(sourceData[i]);
				}
			}
		}
	}
	return list;
}
