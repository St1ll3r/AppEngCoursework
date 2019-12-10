/* =========================== */
/* DECLARATION OF VARIABLES    */
/* RUNNING ESSENTIAL FUNCTIONS */
/* =========================== */

let lineCounter = 0;
let paragraphCounter = 0;
let outlineRootCounter = 0;
let backSpaceControl = 0;

createLine();
loadTheme();

/* =================================== */
/* END of start up variables/functions */
/* =================================== */

/* =============== */
/* key interaction */
/* =============== */

window.mainTextArea.onkeydown = (event) => {
  if(event.code === "Enter") { /* disable paragraph */
    createLine(document.activeElement);
    event.preventDefault();
    return false;
  }
  else if(event.code === "Backspace") { /* deletes current line if empty */
    let line = document.activeElement;
    if(line.innerHTML === ""){
      if(line.parentNode.classList.contains("outline")){
        deleteLineType("outline");
      }else{
        if(line.parentNode.classList.contains("line")){
          console.log(backSpaceControl);
          if(backSpaceControl == 1){
            deleteLine(line);
            backSpaceControl = 0;
          }else{
            document.getElementById(line.parentNode.parentNode.parentNode.id).appendChild(line.parentNode);
            line.focus();
            if(line.parentNode.parentNode == document.getElementById("mainTextArea")){
              console.log("entrou");
              line.parentNode.classList.remove("outlineMargin");
              backSpaceControl = 1;
            }
          }
        }
      }
    }
  }
  else if(event.code === "Tab") { /* set line to become an outline line */
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

/* ====================== */
/* END of key interaction */
/* ====================== */

/* =============== */
/* lines functions */
/* =============== */

function createLine(previousLine){
  let element = document.createElement("div");
  element.setAttribute("class", "line");
  element.setAttribute("id", lineCounter);
  element.setAttribute("contenteditable", "true");

  if(document.getElementById("starter").nextElementSibling == null){ /* root level */
    document.getElementById("mainTextArea").appendChild(element);
    element.focus();
  }else if(previousLine.parentElement.classList.contains("outline") || previousLine.parentElement.classList.contains("outlineMargin")){
    while(previousLine.parentElement.classList.contains("root") != true){
      previousLine = previousLine.parentElement;
      console.log(previousLine);
    }
    element.classList.add("outlineMargin");
    document.getElementById(previousLine.parentElement.id).appendChild(element);
    element.focus();
  }else{
    document.getElementById("mainTextArea").appendChild(element);
    element.focus();
  }
  setLineType("paragraph");
  countersOperations("line","add");
}

function deleteLine(line){
  line.parentElement.remove();
}

function deleteLineType(typeOfElement){
  let line = document.activeElement;
  switch(typeOfElement){
    case "outline":
      resetLineType(line);
      line.parentElement.classList.remove("outline");
      line.parentNode.classList.add("paragraph");
      line.parentElement.children[0].remove();
      countersOperations("outlineRoot","subtract");
    break;
  }
}

function setLineType(typeOfElement){
  let line = document.activeElement;
  let textContent = document.createElement("div");
  switch(typeOfElement){
    case "outline":
      if(line.parentNode.classList.contains("outline") != true){
        resetLineType(line);
        let expandElement = document.createElement("div");
        line.parentNode.classList.add("outline", "root");
        line.parentNode.classList.remove("paragraph");
        expandElement.classList.add("icon");
        expandElement.append("-");
        document.getElementById(line.parentNode.id).appendChild(expandElement);
        textElement = document.getElementById(expandElement.parentNode.id).getElementsByClassName("text");
        document.getElementById(expandElement.parentNode.id).insertBefore(expandElement, textElement[0]);
        countersOperations("outlineRoot","add");
      }
    break;
    case "paragraph": /* add the text div to the line */
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

/* ====================== */
/* END of lines functions */
/* ====================== */

/* ================= */
/* counter functions */
/* ================= */

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
  document.getElementById("lineCounter").textContent = lineCounter;
  document.getElementById("paragraphsCounter").textContent = paragraphCounter;
  document.getElementById("outlinesCounter").textContent = outlineRootCounter;
}

/* ======================== */
/* END of counter functions */
/* ======================== */

/* =============== */
/* theme functions */
/* =============== */

window.document.getElementById("light-theme").addEventListener("click", function() {
  setLightTheme();
});

window.document.getElementById("dark-theme").addEventListener("click", function() {
  setDarkTheme();
});

/*window.addEventListener('load', (event) => {
  if(localStorage.getItem("content") != null){
    document.getElementById("mainTextArea").innerHTML = localStorage.getItem("content");
  }
});*/

window.addEventListener('beforeunload', function (e) {
  content = document.getElementById("mainTextArea").innerHTML;
  localStorage.setItem("content", content);
  // Chrome requires returnValue to be set
  e.returnValue = '';
});

function setLightTheme(){
  document.body.classList.remove("dm-Background", "lm-background");
  document.getElementById("mainTextArea").classList.remove("dm-textArea", "lm-textArea");
  document.body.classList.add("lm-background");
  document.getElementById("mainTextArea").classList.add("lm-textArea");
  localStorage.setItem("theme", "light");
}

function setDarkTheme(){
  document.body.classList.remove("dm-background", "lm-background");
  document.getElementById("mainTextArea").classList.remove("dm-textArea", "lm-textArea");
  document.body.classList.add("dm-background");
  document.getElementById("mainTextArea").classList.add("dm-textArea");
  localStorage.setItem("theme", "dark");
}

/* ====================== */
/* END of theme functions */
/* ====================== */

/* ======================== */
/* load user data functions */
/* ======================== */

function loadTheme(){
  if(localStorage.getItem("theme") == "light"){
    setLightTheme();
  }else{
    setDarkTheme();
  }
}

function loadTextContent(){
  localStorage.getItem("theme") == "light"
}

/* =============================== */
/* END of load user data functions */
/* =============================== */

/* ======================== */
/* END of testing functions */
/* ======================== */

/* =================== */
/* FUNCTIONALITY NOTES
/* =================== */

/*

~~~~~~~~~~~~
~TO DO LIST~
~~~~~~~~~~~~

-hide lower levels
  ->hide childrens until next outline 

-when stuff is created, create objects and store them immediately in local storage
  ->(still need to think about creating and object that stores objects, then only store one object in the local storage and access the nested content)

-if outline is created eveything underneath become its children (for loop)



~~~~~~~~~~~
~DONE LIST~
~~~~~~~~~~~

-change icon/expand and w/e to a single div in every line, change class depending on type
  ->create element
  ->attach class depending on type of event triggered (i.e: tab gives outline)

*/

/* ========================== */
/* END of functionality notes */
/* ========================== */






/* ================= */
/* trash bin of code */
/* ================= */

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
  /* document.getElementById("mainTextArea").insertBefore(expandElement, focusedElement);
  document.getElementById("mainTextArea").insertBefore(rootDiv, expandElement);
  document.getElementById("mainTextArea").insertBefore(outlineDiv, rootDiv);
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

/* ======================== */
/* END of trash bin of code */
/* ======================== */
