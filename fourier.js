/* 
This is a javascript code for visualizing 
estimating square wave-function with Fourier
series.
*/

const bgclr = 0;
const circlclr = 255;
const width = 700;
const height = 600;
let balls = 1;
teksti = "Press 'a' to add a iteration";
teksti2 = "Press 'r' to set iterations to 0";
teksti21 = "Hold 's' to add iterations fast";
teksti3 = "Function, where L is the frequency of the largest circle:";
teksti4 = "Change time"

function setup() {
	canvas = createCanvas(width, height);
	angle = 0;
	pisteet = [];
	circlsetup();
    rSlider = createSlider(20, 250, 30, 10);
  	rSlider.position(530, 30);
    button = createButton("What is this?");
  	button.position(610, 92);
    button.mousePressed(ohjeet);
}


function draw() {
    
	canvas.background(bgclr);
    
    fill(255);
    rect(0,0, width, height / 8);
    
	noFill();

	add_circles_maybe();

	n = "n: " + balls;
    
    fill(0);
	text(n, 10, 20);
	text(teksti, 10, 35);
	text(teksti2, 10, 50);
    text(teksti21, 10, 65);
    //text(teksti3, 10, 70);
    text(teksti4, 530, 20);

	for (i = 0; i < balls; i++) {
		lista[i].draw();
	}


	viivay = lista[balls - 1].get_endpoint('y');
	viivax = lista[balls - 1].get_endpoint('x');

	pisteet.push(400);
	pisteet.push(viivay);

	line(viivax, viivay, 400, viivay);
    
    angle -= 1 / rSlider.value();


	for (var i = 0; i < pisteet.length - 4; i += 4) {
		stroke(255);
		line(pisteet[i], pisteet[i + 1], pisteet[i + 2], pisteet[i + 3]);
		pisteet[i] += 1 / 2;
		pisteet[i + 2] += 1 / 2;
	}

	while (pisteet.length > 1000) {
		pisteet.shift();
	}
    
    if (keyIsPressed === true) {
        if (key === 'r') {
        	balls = 1;
        } else if (key === 's'){
            if (balls < 300) {
            balls += 1;
            }
        }
    }
}

class Circle {

	constructor(Circl, n) {
		this.xcoor = width / 5;
		this.ycoor = height / 2 + height / 10;
		this.n = n;
		this.r = 4 / (3 * this.n) * 100;
		this.angle = 0;
		this.Circl = Circl;
		this.draw();
	}

	get_endpoint(yx) {
		if (yx == 'x') {
			return this.xcoor + cos(angle * this.n) * this.r / 2;
		} else {
			return this.ycoor + sin(angle * this.n) * this.r / 2;
		}
	}

	draw() {

		if (this.Circl != 0) {
			this.xcoor = this.Circl.get_endpoint('x');
			this.ycoor = this.Circl.get_endpoint('y');
		}

		noFill();
		stroke(circlclr);
		let elps = ellipse(this.xcoor, this.ycoor, this.r, this.r);
		line(this.xcoor,
			this.ycoor,
			this.xcoor + cos(angle * this.n) * this.r / 2,
			this.ycoor + sin(angle * this.n) * this.r / 2);
	}
}

function circlsetup() {
	lista = [new Circle(0, 1)];
}

function add_circles_maybe() {
	if (lista.length < balls) {
		lista.push(new Circle(lista[balls - 2], (balls - 1) * 2 + 1));
	}
}

function keyReleased() {
    if(key === 'a') {
        balls += 1
    }
}
function ohjeet() {
    let url = "http://bilimneguzellan.net/en/purrier-series-meow-and-making-images-speak/"
    window.open(url);
}

