/*
*
*  name: Interactive Particles
*  author: Stephen Orr
*  desc: Visual simulation of interacting particles
*  year: 2014
*
*  file: main.js
*
*/

var stage;
var renderer;
var particles = [];
var greenParticleTexture;
var blueParticleTexture;

function init() {

	window.addEventListener("mousewheel", zoom, false);

	var interactive = true;
	stage = new PIXI.Stage(0x000000, interactive);

	// create a renderer instance.
	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	greenParticleTexture = new PIXI.Texture.fromImage('../images/green_particle.png');
	blueParticleTexture = new PIXI.Texture.fromImage('../images/blue_particle.png');
	redParticleTexture = new PIXI.Texture.fromImage('../images/red_particle.png');

	for (var i = 0; i < 100; i++) {
		var particle = new PIXI.Sprite(greenParticleTexture);
		particle.anchor.x = 0.5;
		particle.anchor.y = 0.5;
		// particle.position.x = (window.innerWidth / 2) + ((Math.random() * 26) - 13);
		// particle.position.y = (window.innerHeight / 2) + ((Math.random() * 26) - 13);
		particle.position.x = Math.random() * window.innerWidth;
		particle.position.y = Math.random() * window.innerHeight;
		particle.vector = {
			x: 0,
			y: 0
		};
		particle.force = -0.002;
		particle.type = 'green';
		particles.push(particle);
		stage.addChild(particle);
		//console.log(particle);
	}

	for (var i = 0; i < 40; i++) {
		var particle = new PIXI.Sprite(blueParticleTexture);
		particle.anchor.x = 0.5;
		particle.anchor.y = 0.5;
		// particle.position.x = (window.innerWidth / 2) + ((Math.random() * 26) - 13);
		// particle.position.y = (window.innerHeight / 2) + ((Math.random() * 26) - 13);
		particle.position.x = Math.random() * window.innerWidth;
		particle.position.y = Math.random() * window.innerHeight;
		particle.vector = {
			x: 0,
			y: 0
		};
		particle.force = 0.1;
		particle.type = 'blue';
		particles.push(particle);
		stage.addChild(particle);
		//console.log(particle);
	}

	for (var i = 0; i < 40; i++) {
		var particle = new PIXI.Sprite(redParticleTexture);
		particle.anchor.x = 0.5;
		particle.anchor.y = 0.5;
		// particle.position.x = (window.innerWidth / 2) + ((Math.random() * 26) - 13);
		// particle.position.y = (window.innerHeight / 2) + ((Math.random() * 26) - 13);
		particle.position.x = Math.random() * window.innerWidth;
		particle.position.y = Math.random() * window.innerHeight;
		particle.vector = {
			x: 0,
			y: 0
		};
		particle.force = -0.09;
		particle.type = 'red';
		particles.push(particle);
		stage.addChild(particle);
		//console.log(particle);
	}

	run();
}

function run() {
	requestAnimFrame(run);
	update();
	renderer.render(stage);
}

function update() {
	for (var p = 0; p < particles.length; p++) {
		for (var i = 0; i < particles.length; i++) {
			if (p != i) {
				var particleVector = new Vector(
					particles[p].position.x,
					particles[i].position.x,
					particles[p].position.y,
					particles[i].position.y
				);

				particles[p].vector.x += particleVector.x * (-particles[p].force * particles[i].force);
				particles[p].vector.y += particleVector.y * (-particles[p].force * particles[i].force);
			}
		}

		/*
		*
		*	Speed Limit
		*
		*/

		if (Math.abs(particles[p].vector.x) > .5) {
			if (particles[p].vector.x > 0) {
				particles[p].vector.x = .5;
			}
			else {
				particles[p].vector.x = -.5;
			}
		}
		if (Math.abs(particles[p].vector.y) > .5) {
			if (particles[p].vector.y > 0) {
				particles[p].vector.y = .5;
			}
			else {
				particles[p].vector.y = -.5;
			}
		}
		particles[p].position.x += particles[p].vector.x;
		particles[p].position.y += particles[p].vector.y;

		// if (particles[p].position.x > window.innerWidth || particles[p].position.x < 0) {
		// 	particles[p].position.x -= particles[p].vector.x * 1.2;
		// }
		// if (particles[p].position.y > window.innerHeight || particles[p].position.y < 0) {
		// 	particles[p].position.y -= particles[p].vector.y * 1.2;
		// }
	}
}

function zoom(e) {
	// console.log(e.wheelDeltaY);
	// // stage.scale.x += e.wheelDeltaY / 10;
	// // stage.scale.y += e.wheelDeltaY / 10;
	// stage.scale.x = 0.5;
	// stage.scale.y = 0.5;
}

window.onload = init;