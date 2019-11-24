insertLine();


window.mainTextArea.onkeydown = (event) => {
  if(event.code === "Enter") { /* disable paragraph */
    insertLine();
    event.preventDefault();
    return false;
  }
  else if(event.code === "Tab" && event.ctrlKey) { /* disable underline */
    return false;
  }
  else if(event.code === "KeyB" && event.ctrlKey) { /* disable bold */
    return false;
  }
  else if(event.code === "KeyI" && event.ctrlKey) { /* disable italic */
    return false;
  }
  else if(event.code === "KeyU" && event.ctrlKey) { /* disable underline */
    return false;
  }
};

function insertLine(){
  let element = document.createElement("div");
  element.setAttribute("class", "line");
  element.setAttribute("contenteditable", "true");
  element.setAttribute("id", document.getElementById('mainTextArea').childElementCount);
  document.getElementById('mainTextArea').appendChild(element);
  element.focus();
  updateLineCount();
}

function updateLineCount(){
  document.getElementById('lineCount').textContent = document.getElementById('mainTextArea').childElementCount;
}