/* 
This is a javascript code for visualizing 
estimating square wave-function with Fourier
series.
*/

const bgclr = 0;
const circlclr = 255;
const width = 700
const height = 600
balls = 1
teksti = "Click screen to add precision"
teksti2 = "Refresh page to start over"

function setup() {
	canvas = createCanvas(width, height)
	angle = 0
	pisteet = []
	circlsetup()
}


function draw() {
	canvas.background(bgclr)
	noFill()

	add_circles_maybe()

	n = "n: " + balls
	text(n, 10, 20)
	text(teksti, 10, 35)
	text(teksti2, 10, 50)

	for (i = 0; i < balls; i++) {
		lista[i].draw()
	}

	angle -= 1 / 35

	viivay = lista[balls - 1].get_endpoint('y')
	viivax = lista[balls - 1].get_endpoint('x')

	pisteet.push(400)
	pisteet.push(viivay)

	line(viivax, viivay, 400, viivay)


	for (var i = 0; i < pisteet.length - 4; i += 4) {
		stroke(255)
		line(pisteet[i], pisteet[i + 1], pisteet[i + 2], pisteet[i + 3])
		pisteet[i] += 1 / 2
		pisteet[i + 2] += 1 / 2
	}

	while (pisteet.length > 400) {
		pisteet.shift()
	}

}

class Circle {

	constructor(Circl, n) {
		this.xcoor = width / 5
		this.ycoor = height / 2
		this.n = n
		this.r = 4 / (3 * this.n) * 100
		this.angle = 0
		this.Circl = Circl
		this.draw()
	}

	get_endpoint(yx) {
		if (yx == 'x') {
			return this.xcoor + cos(angle * this.n) * this.r / 2
		} else {
			return this.ycoor + sin(angle * this.n) * this.r / 2
		}
	}

	draw() {

		if (this.Circl != 0) {
			this.xcoor = this.Circl.get_endpoint('x')
			this.ycoor = this.Circl.get_endpoint('y')
		}

		noFill()
		stroke(circlclr)
		let elps = ellipse(this.xcoor, this.ycoor, this.r, this.r)
		line(this.xcoor,
			this.ycoor,
			this.xcoor + cos(angle * this.n) * this.r / 2,
			this.ycoor + sin(angle * this.n) * this.r / 2)
	}
}

function circlsetup() {
	lista = [new Circle(0, 1)]
}

function add_circles_maybe() {
	if (lista.length < balls) {
		lista.push(new Circle(lista[balls - 2], (balls - 1) * 2 + 1))
	}
}

function mouseClicked() {
	balls += 1
}
