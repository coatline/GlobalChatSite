//Questions/To-Do's:
//Can you add something that updates the money text content after buying something?
//Add ripple effect when clicking the buttons (Ex. https://www.youtube.com/watch?v=Azp-IONVzfM)

let buttonContainer = document.getElementById("buttonHolder");
let clickButton = document.getElementById("clickButton");
let moneyLabelHTML = document.getElementById("moneyLabelHTML");
let moneyPerClick = 1;
let money = 0;

clickButton.onclick = function() {
    money += moneyPerClick;
    moneyLabelHTML.textContent = `$${money}`;
}

class ClickGainer{
    constructor(amountPerInterval, interval, cost, name, bgColor){
        this.amountPerInterval = amountPerInterval;
        this.interval = interval;
        this.bgColor = bgColor;
        this.name = name;
        this.cost = cost;
        this.timer = 0;
        this.bought = 0;
        this.CreateUI();
    }

    TryBuy(){
        if(money < this.cost)
            return;

        money -= this.cost;
        this.bought++;
    }

    AmountPerInterval(){
        return this.bought = this.amountPerInterval;
    }

    Update(dt){
        this.timer += dt;

        if (this.timer >= this.interval) {
            this.timer = 0;
            this.GainMoney();
        }
    }

    GainMoney() {
        money += AmountPerInterval();
        document.getElementById("moneyLabelHTML").textContent = `$${money}`;
    }

    CreateUI(){
        // Add the holder for this button.
        let wrapper = document.createElement("div");
        
        wrapper.style.display = "flex";
        wrapper.style.gap = "10px";
        wrapper.style.alignItems = "center";
        
        // Put the holder for this button in the button container.
        buttonContainer.appendChild(wrapper);

        // Create the button
        let button = document.createElement("button");
        button.textContent = `${this.name} ($${this.cost})`;
        button.id = "clickButton";
        button.onclick = () => this.TryBuy();
        
        // Create the label next to the button.
        let label = document.createElement("span");
        label.textContent = `+$${this.amountPerInterval} per ${this.interval / 1000}s`;
        label.id="label";

        wrapper.appendChild(button);
        wrapper.appendChild(label);
    }
}

let clickGainerTypes = {  }

let gainerNames = [`Gain 1`, `Gain 2`, `Gain 3`, `Gain 4`, `Gain 5`]

let gainer = new ClickGainer(5, 1000, 10, gainerNames[0], (255, 255, 255));
let gainer1 = new ClickGainer(5, 1000, 10, gainerNames[1], (255, 255, 255));
let gainer2= new ClickGainer(500, 1000, 100, gainerNames[2], (255, 255, 255));
let gainer3 = new ClickGainer(5, 1000, 10, gainerNames[3], (255, 255, 255));
let gainer4 = new ClickGainer(5, 1000, 10, gainerNames[4], (255, 255, 255));

// Simulate Update being called every frame (assuming 60 FPS)
setInterval(() => gainer.Update(1000 / 60), 1000 / 60);