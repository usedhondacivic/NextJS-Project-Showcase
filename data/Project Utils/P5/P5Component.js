import React from 'react'
import P5Wrapper from 'react-p5-wrapper'

export default class P5Component extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            width: 0,
            height: 0,
            flag: false
        };

        this.containerRef = React.createRef();
    }

    componentDidMount(){
        this.setState({
            width: this.containerRef.current.offsetWidth,
            height: this.containerRef.current.offsetHeight
        });
        window.addEventListener('resize', (e) => {
            this.setState({
                width: this.containerRef.current.offsetWidth,
                height: this.containerRef.current.offsetHeight
            });
        });
    }

    render(){
        return(
            <div style={{width: "100%", height: "100%"}} ref={this.containerRef}>
                <P5Wrapper sketch={this.props.sketch} width={this.state.width} height={this.state.height} flag={this.state.flag}/>
            </div>
        )
    }
}