function Bot(dnaString){
    var mutation = .01; //used to mutated randomly

	this.x = width/2;
	this.y = height;
	this.dna = [];
	this.crashed = false;

	if(dnaString != undefined){
	    this.dna = dnaString; //use given dna
    } else {
        for (var i = 0; i < 400; i++) { //else random new dna!
            this.dna.push(createVector(random(-10, 10), random(-5, 1)));
        }
    }


	this.move = function(step){
	    if( step >= 400 || this.crashed ) {  }
	    else
        {
            this.x += this.dna[step].x;
            this.y += this.dna[step].y;
        }

        // rect(300,400,200,10);
        if(this.x > 300 && this.x < 500 && this.y > 400 && this.y < 410) this.crashed = true;

    };

    this.reproduce = function(other){
	    var newDNA = [];
	    for(var i = 0; i < this.dna.length; i++){
	        if(random(1) < mutation){
	            //mutate!
                newDNA.push(createVector(random(-10, 10), random(-10, 10)));
            } else if (random(1) > .5) {
                // 50% chance to use me as parent, 50% other
                newDNA.push(this.dna[i]);
            } else {
                newDNA.push(other.dna[i]);
            }
        }
        return new Bot(newDNA);
    };

    this.fitness = function(){
        //hardcoded goal
        var DestX = 400;
        var DestY = 100;
        if(this.crashed) { return dist(DestX, DestY, this.x, this.y)*10;}
        return dist(DestX, DestY, this.x, this.y);
    }
}



