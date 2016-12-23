var step = 0;
var bots = [];
var count = 0;
var botCount = 50;
var str = "Gen x: best = xxx";
var gen = 0;
var bestEver = 1000;
var bests = [];

function setup() {
    createCanvas(800, 800);
    stroke(255);
    noFill();
    for(var i = 0; i < botCount; i++){
        bots.push(new Bot()); //creates a bunch of new bots
    }
    str = "Gen x: xxx";
}

function draw() {
    count++;
    if(count % 1 === 0) {
        update();
    }
    background(237, 34, 93);
    fill(0);
    stroke(255);

    //draw every Bot
    for(var i = 0; i < bots.length; i++){
        ellipse(bots[i].x, bots[i].y, 20);
    }
    //ellipse(robot.x, robot.y, 80,80);
    //ellipse(80,80,80,80);

    //draw target
    ellipse(400,100,16,16);
    //draw obstacle
    rect(300,400,200,10);

    //display text
    textSize(25);
    text(str, width-150, 0, 150, 40);
    text("Best ever: " + bestEver, width-200, 40, 200, 40);
}

function update(){
    if (step < 401) {
        for (var i = 0; i < bots.length; i++) {
            bots[i].move(step);
        }
        step++;
    } else if (step === 401){
        //check each Bot for fitness
        count = 0;
        step = 0;
        var best = bots[0].fitness();

        var matingpool = [];
        var newBots = [];

        for( var i = 0; i < bots.length; i++){ //reproduction area
            if(bots[i].fitness > best) best = bots[i].fitness;
            //replace each bot
            var n = round((1/bots[i].fitness())*10000);


            for(var j = 0; j < n; j++){
                matingpool.push(bots[i]);
            }

        }
        for( var i = 0; i < bots.length; i++){
            newBots.push(random(matingpool).reproduce(random(matingpool)));
        }

        bots = newBots;


        bests.push(best);
        if(best < bestEver) bestEver = round(best);

        str = "Gen " + gen++ + ": " + round(best);
    }
}