var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(100,100,10,10);
    ball.shapeColor = "red";
    database= firebase.database();
    var ballpos = database.ref('ball/position');
    ballpos.on("value",readPosition,showError);
}

function draw(){
    background("white");
   if(position !== undefined){
        console.log(position);
     
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
}
    drawSprites();
}

function readPosition(data){
    position= data.val();
    //console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
}

function writePosition(x,y){
    database.ref('ball/position') .set({
    'x': ball.x + x,
    'y': ball.y + y
    })
}

function showError(){
    console.log("there is a error");
}
