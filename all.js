const btn_add = document.querySelector(".btn_add");
const txt = document.querySelector(".txt");
const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
const remainNum = document.querySelector(".remainNum");
const deleteDone = document.querySelector(".deleteDone");

let data = [];

//add todos
btn_add.addEventListener("click", addTodo);
txt.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    addTodo();
  }
});
function addTodo() {
  let obj = {
    content: txt.value.trim(),
    id: new Date().getTime(),
    checked: "",
  };
  if (obj.content.trim() == "") {
    return;
  }
  data.unshift(obj);
  if (tabStatus == "done" || tabStatus == "remain") {
    tabs.forEach((item) => {
      item.classList.remove("active");
    });
    tabs[0].classList.add("active");
    tabStatus = "all";
  }
  txt.value = "";
  updateTab();
}

//render data
function render(arr) {
  let str = "";
  arr.forEach((item, index) => {
    str += `<li data-id="${item.id}">
          <label class="checkbox" for="">
              <input type="checkbox" ${item.checked}/>
              <span>${item.content}</span>
          </label>
          <a href="#" class="delete" data-num="${index}"></a>
      </li>`;
  });
  list.innerHTML = str;
}

//delete & checkbox
list.addEventListener("click", function (e) {
  let num = e.target.getAttribute("data-num");
  let id = parseInt(e.target.closest("li").dataset.id);
  if (e.target.getAttribute("class") == "delete") {
    e.preventDefault();
    data.splice(num, 1);
  } else if (e.target.getAttribute("type") === "checkbox") {
    data.forEach((item, index) => {
      if (item.id == id) {
        if (data[index].checked === "") {
          data[index].checked = "checked";
        } else {
          data[index].checked = "";
        }
      }
    });
  }
  updateTab();
});

//change tab
let tabStatus = "all";
let tabs = document.querySelectorAll(".tab li");
tab.addEventListener("click", function (e) {
  tabStatus = e.target.dataset.tab;
  tabs.forEach(function (item) {
    item.classList.remove("active");
  });
  e.target.classList.add("active");
  updateTab();
});

//tab content
function updateTab() {
  let tabData = [];
  if (tabStatus == "all") {
    tabData = data;
  } else if (tabStatus == "remain") {
    tabData = data.filter((item) => item.checked == "");
  } else if (tabStatus == "done") {
    tabData = data.filter((item) => item.checked == "checked");
  }
  render(tabData);
  remainNum.textContent = data.filter((item) => item.checked == "").length;
}

//delete checked todos
deleteDone.addEventListener("click", function (e) {
  e.preventDefault();
  data = data.filter((item) => item.checked == "");
  updateTab();
});

updateTab();
