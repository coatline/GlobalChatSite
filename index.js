let clickButton = document.getElementById("clickButton");
let moneyLabelHTML = document.getElementById("moneyLabelHTML");
let money = 0;
let moneyPerClick = 1;

clickButton.onclick = function() {
    money += moneyPerClick;
    moneyLabelHTML.textContent = `$${money}`;
}