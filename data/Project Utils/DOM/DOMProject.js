import React from 'react'
import ProjectBase from '../projectBase'

export default class DOMProject extends ProjectBase {
    component;

    constructor(component){
        super();

        this.component = component;
    }

    get components(){
        return this.component;
    }

    update(time){
        
    }
}