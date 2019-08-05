/**
 * [渲染checkbox]
 * @param { element} ele [CheckBox容器]
 * @param {object} list [CheckBox选项的参数对象或者数组]
 */
function generateCheckBox(ele, list) {
	var list_len = list.length, 
		label = {},  // label元素节点
		checkbox_all = {}, //  全选checkbox元素节点
		checkbox_sub = {}, // 子项checkbox元素节点
		checkbox_subs = []; //全部的子项checkbox元素节点

	// 生成全选按钮
	label = document.createElement("label");
	label.innerText = "全选";
	checkbox_all = document.createElement("input");
	checkbox_all.type = "checkbox";
	checkbox_all.setAttribute("checkbox-type", "all");
	label.appendChild(checkbox_all);
	ele.appendChild(label);

	// 生成子checkbox按钮
	for (var i = 0; i < list_len; i++) {
		label = document.createElement("label");
		label.innerText = list[i].text;
		checkbox_sub = document.createElement("input");
		checkbox_sub.type = "checkbox";
		checkbox_sub.value = list[i].value;
		checkbox_sub.setAttribute("checkbox-type", "sub");
		checkbox_sub.setAttribute("data-text", list[i].text);

		// 默认选中第一项
		if(i === 0) {
			checkbox_sub.checked = true;
		}

		// 添加元素到对应的DOM中
		label.appendChild(checkbox_sub);
		ele.appendChild(label);
		checkbox_subs.push(checkbox_sub)
	}

	// 复选框的事件委托
	ele.onclick = function(event) {
		var e = event || window.event,
			target = e.target || e.srcElement,
			sub_len = ele.querySelectorAll("input[checkbox-type=sub]:checked").length,
			node_name = target.nodeName,
			type_name = target.getAttribute("checkbox-type"),
			checkboxs_len = checkbox_subs.length;

		if (node_name === "INPUT") {
			// 当点击的是全选按钮时
			if (type_name === "all") {
				// 遍历子checkbox，让它们全部为选中状态
				for (var i = 0; i < checkboxs_len; i++) {
					checkbox_subs[i].checked = "true";
				}
				// 如果子checkbox全部为选中状态，则阻止默认事件，且退出函数，避免再次渲染表格
				if (sub_len === list_len) {
					// 也可写成 target.checked = "true"
					e.preventDefault();   
					return;
				}
			} else {   // 当点击的是子checkbox时
				// 如果是唯一的选中，不允许取消选中，退出函数不做任何改变，减少渲染
				if (sub_len < 1) {
					target.checked = "true";
					return;
				}
				// 当全部都是选中状态时，则将全选设为选中状态
				sub_len === list_len ? (checkbox_all.checked = true) : (checkbox_all.checked = false);
			}
			updateTable();
		}

	}	
}