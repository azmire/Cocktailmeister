/* show more/less text */
var startStatus = "less";
const myPTag = document.querySelector("#more-less");

const myMoreLessButton = document.querySelector("#more-less-button");
let someText;
if (myPTag != undefined) {
  someText = myPTag.innerText;
}
//const someText = myPTag.innerText;

function toggleText() {
  if (someText.length > 800) {
    if (startStatus == "less") {
      myPTag.innerHTML = `${someText.substring(0, 800)}...`;
      myMoreLessButton.innerText = "More";
      startStatus = "more";
    } else if (startStatus == "more") {
      myPTag.innerHTML = someText;
      myMoreLessButton.innerText = "Less";
      startStatus = "less";
    }
  } else {
    myPTag.innerHTML = someText;
  }
}
toggleText();
