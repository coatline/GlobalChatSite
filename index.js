let clickButton = document.getElementById("clickButton");
let moneyLabelHTML = document.getElementById("moneyLabelHTML");
let buttonContainer = document.getElementById("buttonHolder")
let moneyPerClick = 1;
let money = 100;

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
        // Assuming there's a global 'money' variable
        money += AmountPerInterval();
        document.getElementById("moneyLabelHTML").textContent = `$${money}`;
    }

    CreateUI(){
        let wrapper = document.createElement("div");
        
        wrapper.style.display = "flex"
        wrapper.style.gap = "10px";
        wrapper.style.alignItems = "center"
        
        buttonContainer.appendChild(wrapper)

        let button = document.createElement("button");
        button.textContent = `${this.name} ($${this.cost})`;
        button.id = "clickButton";
        button.onclick = () => this.TryBuy();
        
        let label = document.createElement("span");
        label.textContent = `+$${this.amountPerInterval} per ${this.interval / 1000}s`;
        
        wrapper.appendChild(button);
        wrapper.appendChild(label)
    }
}

let clickGainerTypes = {  }

let gainer = new ClickGainer(5, 1000, 10, "Grandma", (255, 255, 255));
gainer.CreateUI();

// Simulate Update being called every frame (assuming 60 FPS)
setInterval(() => gainer.Update(1000 / 60), 1000 / 60);