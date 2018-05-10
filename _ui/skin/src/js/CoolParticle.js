import * as util from './util.js';

export default class CoolParticle {
    constructor(sketch, origin, color) {
        this.sketch = sketch;
        this.position = origin.copy();
        this.color = this.sketch.color(color);
        this.color.setAlpha(this.sketch.random(100, 255));
        this.size = Math.floor(Math.random() * 10) + 1;
        this.life = this.size / 2;
        this.acceleration = this.sketch.createVector(0, 0.1);
        this.velocity = this.sketch.createVector(this.sketch.random(-2, 2), this.sketch.random(-5, 0));
        this.dead = false;
    }
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.color.setAlpha(this.color._getAlpha() - 5);

        if(this.color._getAlpha() <= 0) {
            this.dead = true;
        }
    }
    draw() {
        this.sketch.push();
        this.sketch.strokeWeight(1);
        this.sketch.stroke(this.color);
        this.sketch.noFill();
        this.sketch.ellipse(this.position.x, this.position.y, this.size, this.size);
        this.sketch.pop();
    }
    isDead() {
        return this.dead;
    }
}