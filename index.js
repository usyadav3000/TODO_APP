var inputField = document.getElementById('todo-input-field');

var todoList = document.getElementById('todo-list');


function createTODOCard(msg,idx) {
//     <div id="first-elem" class="todo-item">
//     <div class="horizontal-align todo-message-container">
//         <h3 class="todo-message">Buy Apples</h3>

//         <div>
//             <i class="far fa-edit"></i>
//             <i class="fas fa-trash-alt"></i>
//         </div>
//     </div>

//     <div class="horizontal-align todo-edit-container">
//         <input class="edit-todo" type="text" placeholder="TODO Here" /><button>Update</button>
//     </div>
// </div>

    var mainCard = document.createElement('div');
    mainCard.className = 'todo-item';
    mainCard.id = idx;

    var messageContainer = document.createElement('div');
    messageContainer.className = 'horizontal-align todo-message-container';

    var message = document.createElement('h3');
    message.innerHTML = msg;
    message.className = 'todo-message'
    messageContainer.appendChild(message);

    var buttonWrapper = document.createElement('div');

    var editIcon = document.createElement("i")
    editIcon.className = "far fa-edit";
    buttonWrapper.appendChild(editIcon);

    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    buttonWrapper.appendChild(deleteIcon);
    messageContainer.appendChild(buttonWrapper);

    var editContainer = document.createElement("div");
    editContainer.className = "horizontal-align todo-edit-container";
    var inputArea = document.createElement("input");
    inputArea.className = "edit-todo";
    inputArea.type = "text";
    inputArea.placeholder="TODO Here";
    var updateButtom = document.createElement("button");
    updateButtom.innerHTML = "Update";
    editContainer.appendChild(inputArea);
    editContainer.appendChild(updateButtom);
    deleteIcon.onclick = function(){
        var remCard = document.getElementById(idx);
        remCard.remove();
        var beforeData = JSON.parse(localStorage.getItem("todoData"));
        var updatedData = beforeData.filter(function(e) { return e.id != idx; }); 
        var setData = JSON.stringify(updatedData);
        localStorage.setItem("todoData",setData);
    }
    editIcon.onclick = function(){
        messageContainer.style.display = "none";
        editContainer.style.display = "flex";
        inputArea.value = message.innerText;
    }
    updateButtom.onclick = function(){
        messageContainer.style.display = "flex";
        editContainer.style.display = "none";
        message.innerHTML = inputArea.value;
        var beforeData = JSON.parse(localStorage.getItem("todoData"));
        objIdx = beforeData.findIndex((obj => obj.id == idx));
        beforeData[objIdx].msg = inputArea.value;
        localStorage.setItem("todoData",JSON.stringify(beforeData));
    }
    inputArea.onkeydown = function(e) {
        if(e.key === 'Enter') {
            messageContainer.style.display = "flex";
            editContainer.style.display = "none";
            message.innerHTML = inputArea.value;
            var beforeData = JSON.parse(localStorage.getItem("todoData"));
            objIdx = beforeData.findIndex((obj => obj.id == idx));
            beforeData[objIdx].msg = inputArea.value;
            localStorage.setItem("todoData",JSON.stringify(beforeData));
        }
    }

    mainCard.appendChild(messageContainer);
    mainCard.appendChild(editContainer);
    return mainCard;
}

function getTimeStamp(){
    var time = new Date();
    return time.getTime();
}

function handleTODOCreation() {
    // TASKs:
    // 1.) Add card to the todo list on screen
    // 2.) On successful addition empty the input box
    // 3.) On delete click remove the TODO item
    var timeStamp = getTimeStamp();
    var card = createTODOCard(inputField.value,timeStamp);
    var beforeData = JSON.parse(localStorage.getItem("todoData"));
    var newCardVal = {
        id : timeStamp,
        msg : inputField.value
    }
    beforeData.push(newCardVal);
    var setData = JSON.stringify(beforeData);
    localStorage.setItem("todoData",setData);
    inputField.value="";
    todoList.appendChild(card);
}

inputField.onkeyup = function(e) {
    if(e.key === 'Enter') {
        handleTODOCreation();
    }
}

var btnAddTODO = document.getElementById('btn-add-todo');
btnAddTODO.onclick = function(e) {
    handleTODOCreation();
}


window.onload = function(){
    // localStorage.clear();
    var localData = localStorage.getItem("todoData");
    console.log("onload",localData)
    if(localData !== undefined && localData !== " " && localData !== null && JSON.parse(localData).length !== 0){console.log("onload if");
        var msgData = JSON.parse(localData);
        console.log("msg onload",msgData)
        for(var i=0; i<msgData.length; i++){
            var card = createTODOCard(msgData[i].msg,msgData[i].id);
            todoList.appendChild(card);
        }
    }
    else{console.log("onload else");
        var appArr = [
            {
                id : 567890,
                msg : "Good Morning"
            },
            {
                id : 567891,
                msg : "Good AfterNoon"
            },
            {
                id : 567892,
                msg : "Good Evening"
            }
        ]
        for(var i=0; i<appArr.length; i++){
            var card = createTODOCard(appArr[i].msg,appArr[i].id);
            todoList.appendChild(card);
        }
        var setData = JSON.stringify(appArr);
        localStorage.setItem("todoData",setData);
    }
}