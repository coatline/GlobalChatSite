//Questions/To-Do's:
//Can you add something that updates the money text content after buying something?
//Add ripple effect when clicking the buttons (Ex. https://www.youtube.com/watch?v=Azp-IONVzfM)

let buttonContainer = document.getElementById("buttonHolder");
let clickButton = document.getElementById("clickButton");
let moneyLabelHTML = document.getElementById("moneyLabelHTML");
let moneyPerClick = 1;
let money = 0;


function AddMoney(delta){
    money += delta;
    document.getElementById("moneyLabelHTML").textContent = `$${money}`;
}

clickButton.onclick = function() {
    AddMoney(moneyPerClick);
}

class ClickGainer{
    constructor(amountPerInterval, interval, cost, name, bgColor){
        this.producedPerInterval = amountPerInterval;
        this.interval = interval;
        this.bgColor = bgColor;
        this.name = name;
        this.cost = cost;
        this.timer = 0;
        this.bought = 0;
        this.button = null;
        this.CreateUI();
    }

    TryBuy(){
        if(money < this.cost)
            return;

        AddMoney(-this.cost);
        this.bought++;

        this.button.textContent = `${this.name} (${this.bought})`;
    }

    ProducedPerInterval(){
        return this.bought * this.producedPerInterval;
    }

    Update(dt){
        this.timer += dt;

        if (this.timer >= this.interval) {
            this.timer = 0;
            this.GainMoney();
        }
    }

    GainMoney() {
        AddMoney(this.ProducedPerInterval());
    }

    CreateUI(){
        // Add the holder for this button.
        let wrapper = document.createElement("div");
        
        wrapper.id= `buttonWrapper`;
        
        // Put the holder for this button in the button container.
        buttonContainer.appendChild(wrapper);

        // Create the button
        this.button = document.createElement("button");
        this.button.textContent = `${this.name} (${this.bought})`;
        this.button.id = "clickButton";
        this.button.onclick = () => this.TryBuy();
        
        // Create the label next to the button.
        let label = document.createElement("span");
        label.innerHTML = `+$${this.producedPerInterval} per ${this.interval / 1000}s <br> (Cost: ${this.cost})`;
        label.id="label";

        wrapper.appendChild(this.button);
        wrapper.appendChild(label);
    }
}

let clickGainerTypes = {  }

let gainers = [
    gainer = new ClickGainer(5, 1000, 10, "Gainer 1", (255, 255, 255)),
    gainer1 = new ClickGainer(5, 1000, 10, "IDK", (255, 255, 255)),
    gainer2 = new ClickGainer(500, 1000, 100, "Grandma", (255, 255, 255)),
    gainer3 = new ClickGainer(5, 1000, 10, "Your mother", (255, 255, 255)),
    gainer4 = new ClickGainer(5, 1000, 10, "Friendship", (255, 255, 255))
]

// Simulate Update being called every frame (assuming 60 FPS)
gainers.forEach(gainer => {
    setInterval(() => gainer.Update(1000 / 60), 1000 / 60);
});

function fullScreen(){
    if(document.documentElement.fullScreen == false)
        document.documentElement.requestFullscreen();
    else
        document.exitFullscreen();
}

// Change HTML Pages
function goTo(page = String){
    if(page == `Skill Tree`){
        window.location.href = "SkillTree/skillTree.html";
    }else if(page == `Settings`){
        window.location.href = "Settings/settings.html";
    }
}