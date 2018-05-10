import * as util from './util.js';
import CoolParticle from './CoolParticle.js';

export default class CoolParticleGroup {
    constructor(sketch, origin, color) {
        this.sketch = sketch;
        this.particleCount = Math.floor(Math.random() * 20) + 3;
        this.particles = [];
        this.dead = false;

        let colorString = color.toString();

        for(let i = 0; i < this.particleCount; i++) {
            this.particles.push(new CoolParticle(
                sketch,
                origin.copy(),
                this.sketch.color(colorString)
            ));
        }

        this.playSound();
    }

    playSound() {
        util.createAudio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/321098/yay.wav');
    }

    update() {
        // Check for dead particles
        this.particles = this.particles.filter(x => !x.isDead());

        if(this.particles.length <= 0) {
            this.dead = true;
        }
        for(let particle of this.particles) {
            particle.update();
        }
    }
    draw() {
        this.sketch.push();
        for(let particle of this.particles) {
            if(!particle.isDead()) {
                particle.draw();
            }
        }
        this.sketch.pop();
    }
    isDead() {
        return this.dead;
    }
}