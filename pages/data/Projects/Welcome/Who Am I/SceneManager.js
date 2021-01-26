const SceneManager = () => {
    let canvas, container;

    let content= <>
        <h2>
        I am <span style={{color: "red"}}>Michael Crum</span>, programming enthusiast and <span style={{color: "red"}}>CS Major</span> at <span style={{color: "red"}}>Cornell University</span>.
        <br></br><br></br>
        Check out my <a href="">personal website</a>.
        </h2>
    </>;

    function mount(CANVAS, CONTAINER){
        canvas = CANVAS;
        container = CONTAINER;
        canvas.style.visibility = "hidden";
        container.style.backgroundColor = "#141414";

    }
    
    function unmount(){ 
        canvas.style.visibility = "visible";
        container.style.backgroundColor = null;
    }

    function update() {
        
    }

    function onWindowResize() {
        const { width, height } = canvas;
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

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