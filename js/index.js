insertLine();

window.mainTextArea.onkeydown = (event) => {
  if(event.code === "Enter") { /* disable paragraph */
    insertLine();
    event.preventDefault();
    return false;
  }
  else if(event.code === "Tab") { /* disable underline */
    createOutline();
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

/* let focusedElement = document.activeElement */

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

function createOutline(){ /* needs optimization */
  let focusedElement = document.activeElement;
  let expandElement = document.createElement("div");
  let outlineDiv = document.createElement("div");
  expandElement.append("+");
  expandElement.classList.add("icon", "outlineContent");
  focusedElement.classList.add("outlineContent");
  outlineDiv.classList.add("outline");
  outlineDiv.setAttribute("id", "0"); /* change later, number of outlines */
  document.getElementById('mainTextArea').insertBefore(expandElement, focusedElement);
  document.getElementById('mainTextArea').insertBefore(outlineDiv, expandElement);
  outlineDiv.appendChild(expandElement);
  outlineDiv.appendChild(focusedElement);
}