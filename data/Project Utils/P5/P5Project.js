import React from 'react'
//import P5Wrapper from 'react-p5-wrapper'
import ProjectBase from '../projectBase'
import P5Component from './P5Component'

export default class P5Project extends ProjectBase{
    constructor(sketch){
        super();

        this.component = <P5Component sketch={sketch}/>
    }

    get components(){
        return this.component
    }
}

//Make p5wrapper - wrapper
//Stores object + 