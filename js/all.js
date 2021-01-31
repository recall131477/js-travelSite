let data;
let dataUrl = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
let nowZone;

// 撈json資料
axios.get(dataUrl).then((res) => {
  data = res.data.result.records;
  renderOption(data);
  renderList(data);
});

// let xhr = new XMLHttpRequest();
// xhr.open('get', dataUrl, true);
// xhr.setRequestHeader('Content-type', 'application/json');
// xhr.send();
// xhr.onload = function () {
// }


// 指定DOM

let select = document.querySelector('.selection'); // 選單
let title = document.querySelector('.title') // 景點名稱切換
let list = document.querySelector('.list') // 景點區域
let hotBtn = document.querySelectorAll('.hotAreaItem a'); // 熱門行政區切換

// 渲染option
function renderOption(data) {
  let dataList = [];
  for (let i = 0; i < data.length; i++) {
    if (dataList.indexOf(data[i].Zone) === -1) {
      dataList.push(data[i].Zone);
    }
  }
  for (let i = 0; i < dataList.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", dataList[i]);
    option.textContent = dataList[i];
    select.appendChild(option);
  }
}

// 顯示內容
function renderList(data) {
  let str = '';
  for (let i = 0; i < data.length; i++) {
    str +=
      `
      <li>
          <div class="listBox">
            <div class="listBoxImg" style="background-image: url('${data[i].Picture1}');">
              <h3 class="text-2xl">${data[i].Name}</h3>
              <span>${data[i].Zone}</span>
            </div>
          <div class="listBoxInfo">
            <p><img src="images/icons_clock.png" alt="">${data[i].Opentime}</p>
            <p><img src="images/icons_pin.png" alt="">${data[i].Add}</p>
            <p><img src="images/icons_phone.png" alt="">${data[i].Tel}</p>
            <span class="free"><img src="images/icons_tag.png" alt="">${data[i].Ticketinfo}</span>
          </div>
        </div>     
       </li>
      `
  }
  list.innerHTML = str;
}

// 從 data裡面去找尋地區跟string相同的資料並回傳
function filterList(zone) {
  let currentData = []
  for (let i = 0; i < data.length; i++) {
    if (zone == data[i].Zone) {
      currentData.push(data[i]);
    }
  }
  return currentData;
}


// 選單點選
function changeArea(e) {
  nowZone = e.target.value;
  let nowData = filterList(nowZone);
  if (nowZone === '高雄旅遊景點') {
    renderList(data);
  } else {
    renderList(nowData);
  }
  title.textContent = nowZone;
}

// 熱門行政區點選
function clickArea(e) {
  nowZone = e.target.innerText;
  let currentData = filterList(nowZone);
  renderList(currentData);
  title.textContent = nowZone;
}

// 監聽
select.addEventListener('change', changeArea, false);
hotBtn.forEach(function (btn) {
  btn.addEventListener('click', clickArea, false);
});
// lingya.addEventListener('click', clickArea, false);
// sanmin.addEventListener('click', clickArea, false);
// sinsing.addEventListener('click', clickArea, false);
// yancheng.addEventListener('click', clickArea, false);

// for (let i = 0; i < hotBtn.length; i++) {
//   hotBtn[i].addEventListener('click', clickArea, false);
// }

