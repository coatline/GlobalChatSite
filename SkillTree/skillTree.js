//Canvas(width:1255, height:578)
//Screen(width:1280, heigth:720)

//Create Canvas
const canvas = document.getElementById('myCanvas');
const cWidth = 1255
const cHeight = 578

//Variables
let skillPointDisplay = document.getElementById("skillPointDisplay");

//Skill One Image (Current one is just a placeholder)
move("skill1", window.screen.width/2 - 50, 100);

//Heading
move("homePageButton", 25, 25);
move("h1", (1280/2) - (130.688/2), 0)
move("skillPointDisplay", (1280/2) - (63.740/2), 65)

//Connecting Line One
draw(cWidth/2, 100, cWidth/2, 200, 3, "black");



//Functions
//Draw Function
function draw(x1, y1, x2, y2, width, color){
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
//Move Function
function move(ID, x, y){
    let d = document.getElementById(ID);
    d.style.position = 'absolute';
    d.style.left = x + 'px';
    d.style.top = y + 'px';
}
//Change Page Function
function goTo(page = String){
    if(page == `Home Page`){
        window.location.href = "/index.html";
    }else if(page == `Settings`){
        window.location.href = "/Setting/settings.html";
    }
}