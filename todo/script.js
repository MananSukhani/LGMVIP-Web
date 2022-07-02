var todo = {
    // (A) INITIALIZE TO DO LIST
    data : [], // todo list data array
    hAdd : null, // html add item text field
    hTemplate : null, // html item row template
    hList : null, // html to do list
    init : () => {
      //  INIT LOCALSTORAGE
      if (localStorage.todo == undefined) { localStorage.todo = "[]"; }
  
      //  RESTORE PREVIOUS SESSION
      todo.data = JSON.parse(localStorage.todo);
  
      //  GET HTML ELEMENTS
      todo.hAdd = document.getElementById("todo-item");
      todo.hTemplate = document.getElementById("todo-template").content;
      todo.hList = document.getElementById("todo-list");
  
      //  "ENABLE" ADD ITEM FORM
      document.getElementById("todo-add").onsubmit = todo.add;
  
      //  DRAW TO DO LIST
      todo.draw();
    },
  
    //  DRAW TO DO LIST
    draw : () => {
      // RESET LIST
      todo.hList.innerHTML = "";
  
      //  LOOP & GENERATE ROWS
      if (todo.data.length>0) { for (let id in todo.data) {
        let row = todo.hTemplate.cloneNode(true);
        row.querySelector(".todo-item").textContent = todo.data[id][0];
        row.querySelector(".todo-done").onclick = () => { todo.toggle(id); };
        row.querySelector(".todo-del").onclick = () => { todo.del(id); };
        if (todo.data[id][1]) {
          row.querySelector(".todo-item").classList.add("todo-ok");
        }
        todo.hList.appendChild(row);
      }}
    },
  
    //  HELPER - SAVE DATA INTO LOCAL STORAGE
    save: () => {
      localStorage.todo = JSON.stringify(todo.data);
      todo.draw();
    },
  
    //  ADD A NEW ITEM TO THE LIST
    add : () => {
      todo.data.push([todo.hAdd.value, false]);
      todo.hAdd.value = "";
      todo.save();
      return false;
    },
  
    //  UPDATE TODO ITEM DONE/NOT YET
    toggle: (id) => {
      todo.data[id][1] = !todo.data[id][1];
      todo.save();
    },
  
    //  DELETE ITEM
    del: (id) => {
      todo.data.splice(id, 1);
      todo.save();
    }
  };
  
  //  PAGE INIT
  window.addEventListener("load", todo.init);
  