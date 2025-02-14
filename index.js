//Questions/To-Do's:
//Can you add something that updates the money text content after buying something?
//Add ripple effect when clicking the buttons (Ex. https://www.youtube.com/watch?v=Azp-IONVzfM)

let buttonContainer = document.getElementById("buttonHolder");
let clickButton = document.getElementById("clickButton");
let moneyLabelHTML = document.getElementById("moneyLabelHTML");
let moneyPerClick = 1;
let Money = {
    _value: 0,

    get _value(){
        return this._value;
    },

    set _value(newVal){
        this._value = newVal;
        moneyLabelHTML.textContent = `$${this._value}`;
    }
};

clickButton.onclick = function() {
    Money += moneyPerClick;
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
        this.CreateUI();
    }

    TryBuy(){
        if(Money < this.cost)
            return;

        Money -= this.cost;
        this.bought++;
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
        Money += this.ProducedPerInterval();
        document.getElementById("moneyLabelHTML").textContent = `$${Money}`;
    }

    CreateUI(){
        // Add the holder for this button.
        let wrapper = document.createElement("div");
        
        wrapper.id= `buttonWrapper`;
        
        // Put the holder for this button in the button container.
        buttonContainer.appendChild(wrapper);

        // Create the button
        let button = document.createElement("button");
        button.textContent = `${this.name} (${this.bought})`;
        button.id = "clickButton";
        button.onclick = () => this.TryBuy();
        
        // Create the label next to the button.
        let label = document.createElement("span");
        label.innerHTML = `+$${this.producedPerInterval} per ${this.interval / 1000}s <br> (Cost: ${this.cost})`;
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

//Fullscreen function
let fullscreen = false;
function fullScreen(){
    if(fullscreen == false){
        document.documentElement.requestFullscreen();
        fullscreen = true;
    }else if(fullscreen == true){
        document.exitFullscreen();
        fullscreen = false;
    }
}

//Change HTML Pages
function goTo(page = String){
    if(page == `Skill Tree`){
        window.location.href = "SkillTree/skillTree.html";
    }else if(page == `Settings`){
        window.location.href = "Settings/settings.html";
    }
}