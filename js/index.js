/* =========================== */
/* DECLARATION OF VARIABLES    */
/* RUNNING ESSENTIAL FUNCTIONS */
/* =========================== */

let lineCounter = 0;
let headerCounter = 0;
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
  if(event.code === "Enter") { /* disable built-in enter */
    createLine(document.activeElement);
    event.preventDefault();
    return false;
  }
  else if(event.code === "Backspace") { /* deletes current line if empty */
    let line = document.activeElement;
    if(line.innerHTML === ""){
      if(line.parentNode.classList.contains("header")){
        deleteLineType("header");
      }else{
        if(line.parentNode.classList.contains("line")){
          if(backSpaceControl == 1){
            deleteLine(line);
            backSpaceControl = 0;
          }else{
            document.getElementById(line.parentNode.parentNode.parentNode.id).appendChild(line.parentNode);
            line.focus();
            if(line.parentNode.parentNode == document.getElementById("mainTextArea")){
              line.parentNode.classList.remove("headerMargin");
              backSpaceControl = 1;
            }
          }
        }
      }
    }
  }
  else if(event.code === "Tab") { /* set line to become an header line */
    setLineType("header");
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
  }else if(previousLine.parentElement.classList.contains("header") || previousLine.parentElement.classList.contains("headerMargin")){
    while(previousLine.parentElement.classList.contains("root") != true){
      previousLine = previousLine.parentElement;
    }
    element.classList.add("headerMargin");
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
    case "header":
      resetLineType(line);
      line.parentElement.classList.remove("header");
      line.parentNode.classList.add("paragraph");
      line.parentElement.children[0].remove();
      countersOperations("header","subtract");
    break;
  }
}

function setLineType(typeOfElement){
  let line = document.activeElement;
  let textContent = document.createElement("div");
  switch(typeOfElement){
    case "header":
      if(line.parentNode.classList.contains("header") != true){
        resetLineType(line);
        let expandElement = document.createElement("div");
        line.parentNode.classList.add("header", "root");
        line.parentNode.classList.remove("paragraph");
        expandElement.classList.add("icon");
        expandElement.append("-");
        document.getElementById(line.parentNode.id).appendChild(expandElement);
        textElement = document.getElementById(expandElement.parentNode.id).getElementsByClassName("text");
        document.getElementById(expandElement.parentNode.id).insertBefore(expandElement, textElement[0]);
        countersOperations("header","add");
      }
    break;
    case "paragraph": /* add the text div to the line */
      line.classList.add("paragraph");
      line.setAttribute("id", lineCounter);
      textContent.classList.add("text");
      document.getElementById(line.id).appendChild(textContent);
      textContent.setAttribute("contenteditable", "true");
      line.setAttribute("contenteditable", "false");
      textContent.focus();
    break;
  }
}

function resetLineType(line){
  line.classList.remove("header", "paragraph"); /* to add classes as they are created */
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
      }else if(typeOfElement == "header"){
        headerCounter++;
      }
    break;

    case "subtract":
      if(typeOfElement == "line"){
        lineCounter--;
      }else if(typeOfElement == "header"){
        headerCounter--;
      }
    break;
  }
  updateCounterValues();
}

function updateCounterValues(){
  document.getElementById("lineCounter").textContent = lineCounter;
  document.getElementById("headerCounter").textContent = headerCounter;
}

/* ======================== */
/* END of counter functions */
/* ======================== */

/* =============================== */
/* load previous content functions */
/* =============================== */

window.addEventListener('load', (event) => {
  if(localStorage.getItem("content") != null){
    document.getElementById("mainTextArea").innerHTML = localStorage.getItem("content");
    document.getElementById("lineCounter").innerHTML = localStorage.getItem("lines");
    document.getElementById("headerCounter").innerHTML = localStorage.getItem("headers");
    textNodes = document.querySelectorAll('.text');
    lastElement = textNodes[textNodes.length- 1];
    lastElement.focus();
    let tempString = lastElement.textContent;
    lastElement.textContent = '';
    lastElement.textContent = tempString;
  }
});

window.addEventListener('beforeunload', function (e) {
  content = document.getElementById("mainTextArea").innerHTML;
  localStorage.setItem("content", content);
  localStorage.setItem("lines", document.getElementById("lineCounter").textContent);
  localStorage.setItem("headers", document.getElementById("headerCounter").textContent);
  e.returnValue = '';
});

/* ====================================== */
/* END of load previous content functions */
/* ====================================== */

/* ================= */
/* toolbar functions */
/* ================= */

window.document.getElementById("clear-content").addEventListener("click", function() {

  document.getElementById("mainTextArea").innerHTML = "<div id='starter'></div>";
  lineCounter = 0;
  headerCounter = 0;
  createLine();
});

window.document.getElementById("light-theme").addEventListener("click", function() {
  setLightTheme();
});

window.document.getElementById("dark-theme").addEventListener("click", function() {
  setDarkTheme();
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

/* ======================== */
/* END of toolbar functions */
/* ======================== */

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