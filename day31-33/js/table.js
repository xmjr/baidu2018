/**
 * [/渲染新的表格]
 */
function updateTable () {
  var states = true,
      table = {},
      tr = {},
      product = {},
      region = {},
      month = {},
      item = {},
      sale_len = 0,
      data = getData(),
      data_len = data.length;
  var regionlen = regionWrapper.querySelectorAll('input[checkbox-type=sub]:checked').length;
  var productlen = productWrapper.querySelectorAll('input[checkbox-type=sub]:checked').length;
  var product_before = productlen === 1 && regionlen > productlen;
  var region_before = regionlen === 1 && productlen > regionlen;
  
  tableWrapper.innerHTML = ''; //每次渲染之前先重置表格
  //渲染表头
  table = document.createElement('table');
  tr = document.createElement('tr');
  product = document.createElement('th');
  product.innerText = '商品';
  region = document.createElement('th');
  region.innerText = '地区';
  /*
  if：
    商品选择一个,地区作为第二列;
    地区选择一个,商品作为第二列;
  else：
    商品作为第一列, 地区作为第二列;
  */
  if (product_before || region_before) {
    if (product_before) {
      tr.appendChild(product);
      tr.appendChild(region);
    } 
    if (region_before) {
      tr.appendChild(region);
      tr.appendChild(product);
    } 
  } else {
    tr.appendChild(product);
    tr.appendChild(region);
  }
  for (var i = 1; i <= 12; i++) {
    month = document.createElement('th');
    month.innerText = i + '月';
    tr.appendChild(month);
  } 
  table.appendChild(tr);
  //渲染表格主题内容
  for (var i = 0; i < data_len; i++) {
    item = document.createElement('tr');
    regionTd = document.createElement('td');
    regionTd.innerText = data[i].region;
    productTd = document.createElement('td');
    productTd.innerText = data[i].product;
    /*
    if：
      商品选择一个,地区作为第二列,并且合并商品列;
      地区选择一个,商品作为第二列,并且合并地区列;
    else：
      商品作为第一列, 地区作为第二列,并且合并商品列;
    */
    if(product_before > productlen || region_before){
      //商品选择一个
      if (product_before) {
        productTd.setAttribute('rowspan', regionlen); 
        if (states) {
          states = false;
          item.appendChild(productTd);
        }
        item.appendChild(regionTd);
      } 
      // 地区选择一个
      if (region_before) { 
        regionTd.setAttribute('rowspan', productlen);
        if (states) {
          states = false;
          item.appendChild(regionTd);
        }
        item.appendChild(productTd);
      } 
    } else {
      // 商品作为第一列, 地区作为第二列,并且合并商品列;
      productTd.setAttribute('rowspan', regionlen); 
      if (states) {
        states = false;
        item.appendChild(productTd);
      }
      //这一行是关键
      if (i % regionlen == 0) {
        item.appendChild(productTd);
      }
      item.appendChild(regionTd);
    }
    sale_len = data[i]['sale'].length
    //渲染每月对应的数据到表格中
    for (var j = 0; j < sale_len; j++) {
      sales = document.createElement('td');
      sales.innerText = data[i]['sale'][j];
      item.appendChild(sales);
    }
    table.appendChild(item);
  } 
  tableWrapper.appendChild(table);
}