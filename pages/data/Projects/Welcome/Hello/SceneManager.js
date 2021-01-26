import Sketch from 'react-p5';

const SceneManager = () => {
    let canvas, container;

    let screenDimensions;

    function mount(CANVAS, CONTAINER){
        canvas = CANVAS;
        container = CONTAINER;
        canvas.style.visibility = "hidden";
        container.style.backgroundColor = "#141414";
        screenDimensions = {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
        };
        //text-align: center;
        container.style.textAlign = "center";
        console.log(screenDimensions);
    }
    
    function unmount(){ 
        container.style.textAlign = "left";
        canvas.style.visibility = "visible";
        container.style.backgroundColor = null;
    }

    function update() {
        
    }

    function onWindowResize() {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    function cornerSquare(p5, x, y, rot){
        p5.fill(255, 0, 0);
    }

    function straightSquare(p5, x, y, rot){
        p5.fill(0, 255, 0);
    }

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(screenDimensions.width, screenDimensions.height).parent(canvasParentRef);

        p5.background(20, 20, 20);

        //for(var y = 0; y < width)
        
    }
 
    const draw = (p5) => {
    }

    const windowResized = (p5) => {
        p5.resizeCanvas(screenDimensions.width, screenDimensions.height);
    }

    /*let content= <>
        <h1>H E L L O</h1>
        <p>
        This is a collection of web experiments and personal projects, with the purpose of exploring the capabilities of the web and expressing art through that medium. 
        <br></br>
        <br></br>
        Poke around!
        <br></br>
        </p>
        <h2 style={{color: "red"}}>This is a work in progress, check back soon for more...</h2>
    </>;*/

    let content = <>
        <h1 style={{fontSize: "10em"}}>Hello</h1>
        <Sketch setup={setup} draw={draw} windowResized={windowResized}/>
    </>

    return {
        mount,
        unmount,
        update,
        onWindowResize,
        onMouseMove,
        content
    }
}

export default SceneManager;