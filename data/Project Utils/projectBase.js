import React from 'react'

export default class ProjectBase {
    active = false;
    container;

    constructor(){
    }

    bindEventListeners() {
        window.addEventListener('resize', () => {this.resizeCanvas()});
        window.addEventListener('scroll', () => {this.handleScroll()});
    }

    handleScroll(){
        this.checkActive();
    }

    checkActive(){
        let visible = this.checkVisible(this.container);
        if(!this.active && visible){
            this.active = true;
            this.render();
        }
        this.active = visible;
    }

    checkVisible(elm){
		let threshold = 100
        let mode = 'visible';

        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        var above = rect.bottom - threshold < 0;
        var below = rect.top - viewHeight + threshold >= 0;

        return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
	}

    get components(){
        return <div>The return components of this project hasn't been properly configured.</div>;
    }

    resizeCanvas(){}; 

    render(time) {
        if(this.active) requestAnimationFrame(() => {this.render()});
        this.update(time);
    }
    
    setup(container){
        this.container = container;
        this.checkActive();
        this.resizeCanvas();
        this.bindEventListeners();
        this.render();
    }

    update(time){};
}