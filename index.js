let ClickButton = getElementById("ClickButton");
let moneyLabelHTML = getElementById("moneyLabelHTML");
let money = 0;
let moneyPerClick = 1;

ClickButton.onclick = function() {
    money += moneyPerClick;
    moneyLabelHTML.textContent = money;
}