window.mainTextArea.onkeydown = (event) => {
  console.log(event.code,event.ctrlKey);
  if(event.code === "Enter") { /* disable paragraph */
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
