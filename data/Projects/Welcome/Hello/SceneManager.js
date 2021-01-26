import React from 'react'
import { Line } from 'three';
import DOMProject from '../../../Project Utils/DOM/DOMProject'
import P5Project from '../../../Project Utils/P5/P5Project'

//export default new DOMProject(<h1>This is the hello project.</h1>);


function sketch (p) {
    let rotation = 0;
    let width = 0;
    let height = 0;

    let tileSize = 60;
    let cornerChance = 0.9;
    let colorOne = p.color(0);
    let colorTwo = p.color(10);

    function cornerTile(x, y, rot){
        p.push();
        p.translate(x, y);
        p.rotate(rot);
        //p.rect(0, 0, tileSize, tileSize);
        for(let i = 0; i < 7; i++){
            let rad = 2 * tileSize - 2 * (i + 0.5) * (tileSize / 7);
            let color = i % 2 == 0 ? colorOne : colorTwo;
            p.stroke(color);
            p.arc(-tileSize/2, -tileSize/2, rad, rad, 0, p.HALF_PI);
        }
        for(let i = 0; i < 7; i++){
            let rad = 2 * tileSize - 2 * (i + 0.5) * (tileSize / 7);
            let color = i % 2 == 0 ? colorOne : colorTwo;
            p.stroke(color);
            p.arc(tileSize/2, tileSize/2, rad, rad, p.PI, p.PI+p.HALF_PI);
        }
        p.pop();
    }

    function straightTile(x, y, rot){
        p.push();
        p.translate(x, y);
        p.rotate(rot);
        for(let i = 0; i < 7; i++){
            let y = (-tileSize / 2) + (i + 0.5) * (tileSize / 7);
            let color = i % 2 == 0 ? colorOne : colorTwo;
            p.stroke(color);
            p.line(-tileSize / 2, y, tileSize / 2, y);
        }

        //p.line(0, -tileSize / 2, 0, tileSize / 2);
        p.pop();
    }

    p.setup = function () {
        p.createCanvas(width, height);
        p.background(0);
        p.rectMode(p.CENTER);
        p.strokeCap(p.SQUARE);
        p.stroke(0);
        p.strokeWeight(p.ceil(tileSize/7));
        p.noFill();
        
        for(let x = 0; x < p.width + tileSize; x += tileSize){
            for(let y = 0; y < p.height + tileSize; y += tileSize){
                let corner = p.random() < cornerChance ? true : false;
                let rotation = p.floor(p.random(0, 4)) * p.HALF_PI;
                if(corner)
                    cornerTile(x, y, rotation);
                else
                    straightTile(x, y, rotation);
            }
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if(props.width && props.height){
            width = props.width;
            height = props.height;
            p.resizeCanvas(props.width, props.height);
            p.setup();
        }
    };

    p.draw = function () {
        
    };
};

export default new P5Project(sketch);