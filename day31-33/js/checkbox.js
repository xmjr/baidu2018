/**
 * [渲染checkbox]
 * @param {element} ele [CheckBox容器]
 * @param {obejct} list [CheckBox选项的参数对象或者数组]
 */
function generateCheckBox (ele, list) {
  var list_len = list.length,
      label = {}, //label元素节点
      checkbox_all = {}, //全选checkbox元素节点
      checkbox_sub = {}, //子项checkbox元素节点
      checkbox_subs = []; //全部的checkbox元素节点
  //生成全选按钮
  label = document.createElement('label');
  label.innerText = '全选';
  checkbox_all = document.createElement('input');
  checkbox_all.type = 'checkbox';
  checkbox_all.setAttribute('checkbox-type', 'all');
  //添加元素到对于的DOM
  label.appendChild(checkbox_all);
  ele.appendChild(label);
  //生成子checkbox按钮
  for (var i = 0; i < list_len; i++) {
    label = document.createElement('label');
    label.innerText = list[i].text;
    checkbox_sub = document.createElement('input');
    checkbox_sub.type = 'checkbox';
    checkbox_sub.value = list[i].value;
    checkbox_sub.setAttribute('checkbox-type', 'sub');
    checkbox_sub.setAttribute('data-text', list[i].text);
    if (i === 0) {
      checkbox_sub.checked = true; //默认选中第一项
    }   
    //添加元素到对于的DOM   
    label.appendChild(checkbox_sub);
    ele.appendChild(label);
    checkbox_subs.push(checkbox_sub)
  }
  //事件委托
  ele.onclick = function (event) {
    var e = event || window.event,
        target = e.target || e.srcElment,
        sub_len = ele.querySelectorAll('input[checkbox-type=sub]:checked').length,
        node_name = target.nodeName,
        type_name = target.getAttribute('checkbox-type'),
        checkboxs_len = checkbox_subs.length;//子checkbox_subs数组的长度
    if (node_name === 'INPUT') {
      //点击全选按钮
      if (type_name === 'all') {
        for (var i = 0; i < checkboxs_len; i++) {
          checkbox_subs[i].checked = 'true';
        }
        if (sub_len === 3) {
          //如果是全部都为选择状态 则组止默认事件 且退出函数不做任何改变 减少渲染
          e.preventDefault();
          return;
        }
      //点击子checkbox
      } else {  
        if (sub_len < 1) {
          //如果是唯一的选择 不允许取消选择 且退出函数不做任何改变 减少渲染
          target.checked = 'true';
          return; 
        }
        sub_len === 3 ? (checkbox_all.checked = true) : (checkbox_all.checked = false);
      } 
      updateTable();
    }
  }
}