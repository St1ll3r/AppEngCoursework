/* =========================== */
/* DECLARATION OF VARIABLES    */
/* RUNNING ESSENTIAL FUNCTIONS */
/* =========================== */

let lineCounter = 0;
let paragraphCounter = 0;
let outlineRootCounter = 0;

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
      }
      /*deleteLine(line);*/
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

  if(document.getElementById("starter").nextElementSibling == null || previousLine.parentElement.classList.contains("outline") != true){ /* root level */
    console.log("is null");
    document.getElementById("mainTextArea").appendChild(element);
    element.focus();
  }else if(previousLine.parentElement.classList.contains("outline")){
    /* child level */
    while(previousLine.parentElement.classList.contains("root") != true){
      previousLine = previousLine.parentElement;
      console.log(previousLine);
    }
    element.classList.add("outlineMargin");
    document.getElementById(previousLine.parentElement.id).appendChild(element);
    element.focus();
  }
  setLineType("paragraph");
  countersOperations("line","add");
}



  /*if(element.previousSibling != null && element.previousSibling.classList.contains("root") || element.previousSibling.classList.contains("outlineChild")){
    if(element.parentNode.classList.contains("outlineChild") != true){
      element.classList.add("outlineLevel1");
    }else if(element.parentNode.classList.contains("outlineLevel1")){
      element.classList.add("outlineLevel2");
    }else if(element.parentNode.classList.contains("outlineLevel2")){
      element.classList.add("outlineLevel3");
    }else if(element.parentNode.classList.contains("outlineLevel3")){
      element.classList.add("outlineLevel4");
    }else if(element.parentNode.classList.contains("outlineLevel4")){
      element.classList.add("outlineLevel5");
    }else if(element.arentNode.classList.contains("outlineLevel5")){
      element.classList.add("outlineLevel6");
    }else if(element.parentNode.classList.contains("outlineLevel6")){
      element.classList.add("outlineLevel7");
    }
    if(document.getElementById(element.parentNode) != null){
      document.getElementById.appendChild(element);
      element.classList.add("outlineChild");
      element.focus();
    }
  }*/



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

/*function setLineType(typeOfElement){
  let line = document.activeElement;
  let textContent = document.createElement("div");
  let hasOutlineClass = line.parentNode.classList.contains("outline");
  let outlineLevel = 7;
  switch(typeOfElement){
    case "outline":
      if(hasOutlineClass != true || line.parentNode.classList.contains("root") || line.parentNode.classList.contains("outlineChild")){
        if((line.parentNode).parentNode == document.getElementById("mainTextArea")) {
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
        }else if(line.parentNode.classList.contains("outline") != true){
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
      }
    break;
    case "paragraph":
      line.classList.add("paragraph");
      line.setAttribute("id", paragraphCounter);
      textContent.classList.add("text");

      if(line.previousSibling != null && line.previousSibling.classList.contains("root") || line.previousSibling.classList.contains("outlineChild")){
        console.log(line.previousSibling);
        document.getElementById(line.id).appendChild(textContent);
      }else{
        document.getElementById(line.id).appendChild(textContent);
      }
      textContent.setAttribute("contenteditable", "true");
      line.setAttribute("contenteditable", "false");
      textContent.focus();
      countersOperations("paragraph","add");
    break;
  }
}*/

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

/* ================= */
/* testing functions */
/* ================= */

document.addEventListener("click", function(e) {
  console.log(e.target);
});

function getFocusedElement(){
  console.log(document.activeElement);
}

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
