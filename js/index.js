let lineCounter = 0;
let paragraphCounter = 0;
let outlineRootCounter = 0;

createLine();

window.mainTextArea.onkeydown = (event) => {
  if(event.code === "Enter") { /* disable paragraph */
    createLine();
    event.preventDefault();
    return false;
  }
  else if(event.code === "Tab") { /* disable underline */
    setLineType("outline");
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

function createLine(){
  let element = document.createElement("div");
  element.setAttribute("class", "line");
  element.setAttribute("id", lineCounter);
  element.setAttribute("contenteditable", "true");
  document.getElementById('mainTextArea').appendChild(element);
  element.focus();
  setLineType("paragraph");
  countersOperations("line","add");
}


function setLineType(typeOfElement){
  let line = document.activeElement;
  let textContent = document.createElement("div");
  switch(typeOfElement){
    case "outline":
      /* if(focusedElement is child of something that is not main text area, create sub level under parent) */
      /* else(create root level outline) */
      if((line.parentNode).parentNode == document.getElementById('mainTextArea')) { /* check if its a root level outline */
        resetLineType(line);
        let expandElement = document.createElement("div");
        line.parentNode.classList.add("outline");
        line.parentNode.classList.remove("paragraph");
        expandElement.classList.add("icon");
        expandElement.append("-");
        document.getElementById(line.parentNode.id).appendChild(expandElement);
        document.getElementById(line.parentNode.id).appendChild(textContent);
      }else{
        /* when its a child */
      }
    break;
    case "paragraph":
      line.classList.add("paragraph");
      line.setAttribute("id", paragraphCounter);
      textContent.classList.add("text");
      document.getElementById(line.id).appendChild(textContent);
      textContent.setAttribute("contenteditable", "true");
      line.setAttribute("contenteditable", "false");
      textContent.focus();
      countersOperations("paragraph","add");
    break;
  }
}

function resetLineType(line){
  line.classList.remove("outline", "paragraph"); /* to add classes as they are created */
}

function countersOperations(typeOfElement, operation){
  switch(operation){
    case "add":
      if(typeOfElement == "line"){
        lineCounter++;
      }
      else if(typeOfElement == "paragraph"){
        paragraphCounter++;
      }else if(typeOfElement == "outlineRoot"){
        outlineRootCounter++;
      }
    break;

    case "subtract":
      if(typeOfElement == "line"){
        lineCounter--;
      }
      if(typeOfElement == "paragraph"){
        paragraphCounter--;
      }else if(typeOfElement == "outlineRoot"){
        outlineRootCounter--;
      }
    break;
  }
  updateCounterValues();
}

function updateCounterValues(){
  document.getElementById('lineCounter').textContent = lineCounter;
  document.getElementById('paragraphsCounter').textContent = paragraphCounter;
  document.getElementById('outlinesCounter').textContent = outlineRootCounter;
}

/* function createOutline(){ /* needs optimization */
  /* if there is a root already, dont do shit */
  /*let focusedElement = document.activeElement;
  let expandElement = document.createElement("div");
  let outlineDiv = document.createElement("div");
  let rootDiv = document.createElement("div");
  expandElement.append("-");
  expandElement.classList.add("icon", "outlineContent");
  focusedElement.classList.add("outlineContent");
  outlineDiv.classList.add("outline");
  rootDiv.classList.add("root");
  outlineDiv.setAttribute("id", "0-outline"); /* change later, number of outlines */
  /*rootDiv.setAttribute("id", "0-level"); /* change later, number of outlines */
  /* document.getElementById('mainTextArea').insertBefore(expandElement, focusedElement);
  document.getElementById('mainTextArea').insertBefore(rootDiv, expandElement);
  document.getElementById('mainTextArea').insertBefore(outlineDiv, rootDiv);
  rootDiv.appendChild(expandElement);
  rootDiv.appendChild(focusedElement);
  outlineDiv.appendChild(rootDiv);
}

function createSublevel(){
  /* is child of a root element? if yes proceed */
 /* console.log("awodawjdaw");
  let focusedElement = document.activeElement;
  if(focusedElement.parentNode.classList.contains("root")){
    console.log("fuck yeah");
  }
} */

/* testing functions */

document.addEventListener('click', function(e) {
  console.log(e.target);
});

/* FUNCTIONALITY NOTES

hide lower levels - hide everything from clicked element ID until .length

change icon/expand and w/e to a single div in every line, change class depending on type
  - create element
    -attach class depending on type of event triggered (i.e: tab gives outline)

*/
