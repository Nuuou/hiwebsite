import p5 from 'p5';
import * as util from './util.js';
import CoolLine from './CoolLine.js';
import CoolParticleGroup from './CoolParticleGroup.js';

new p5((sketch) => {
    let canvas;
    let previousPoint = sketch.createVector(sketch.random(0, sketch.windowWidth), sketch.random(0, sketch.windowHeight));
    let lines = [];
    let activeColor = sketch.color(sketch.random(100, 255), sketch.random(100, 255), sketch.random(100, 255), sketch.random(20, 255));

    let particleGroups = [];

    sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.id('cool-thing');
        sketch.frameRate(60);
    };
    sketch.draw = () => {
        sketch.background('#32323E');
        sketch.strokeWeight(util.alphaCalc(activeColor._getAlpha()));

        // Figure out if lines need to go away
        lines = lines.filter(x => !x.isDead());

        // Draw lines
        for(let line of lines) {
            line.update();
            line.draw();
        }

        // Figure out if particles need to go away
        particleGroups = particleGroups.filter(x => !x.isDead());

        // Draw particles
        for(let particleGroup of particleGroups) {
            particleGroup.update();
            particleGroup.draw();
        }

        sketch.push();
        sketch.stroke(activeColor);
        sketch.line(previousPoint.x, previousPoint.y, sketch.mouseX, sketch.mouseY);
        sketch.pop();

        sketch.push();
        sketch.stroke(activeColor);
        const activeFillColor = sketch.color(activeColor.toString());
        activeFillColor.setAlpha(activeFillColor._getAlpha() / 2);
        sketch.fill(activeFillColor);
        const radius = sketch.dist(previousPoint.x, previousPoint.y, sketch.mouseX, sketch.mouseY);
        sketch.ellipseMode(sketch.RADIUS);
        sketch.ellipse(previousPoint.x, previousPoint.y, radius, radius, 0);
        sketch.pop();
    };
    sketch.mouseClicked = () => {
        lines.push(new CoolLine(
            sketch,
            sketch.createVector(previousPoint.x, previousPoint.y),
            sketch.createVector(sketch.mouseX, sketch.mouseY),
            sketch.color(activeColor.toString())
        ));

        particleGroups.push(new CoolParticleGroup(
            sketch,
            sketch.createVector(sketch.mouseX, sketch.mouseY),
            sketch.color(activeColor.toString())
        ));

        activeColor = sketch.color(sketch.random(100, 255), sketch.random(100, 255), sketch.random(100, 255), sketch.random(20, 255));
        previousPoint = sketch.createVector(sketch.mouseX, sketch.mouseY);
    };
    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };

    sketch.mouseMoved = () => {
    };
});
