import * as util from './util.js';

export default class CoolLine {
    constructor(sketch, start, end, color) {
        this.sketch = sketch;
        this.start = start;
        this.end = end;
        this.color = color;
        this.dead = false;
    }
    playSound() {
        util.createAudio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/321098/pop.wav');
    }
    update() {
        this.color.setAlpha(this.color._getAlpha() - 2);

        if(!this.dead) {
            if(this.color._getAlpha() <= 0) {
                this.dead = true;
                this.playSound();
            }
        }
    }
    draw() {
        this.sketch.push();
        this.sketch.strokeWeight(util.alphaCalc(this.color._getAlpha()));
        this.sketch.stroke(this.color);
        this.sketch.line(this.start.x, this.start.y, this.end.x, this.end.y);
        this.sketch.pop();
    }
    isDead() {
        return this.dead;
    }
}