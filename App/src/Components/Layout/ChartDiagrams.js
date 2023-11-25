import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component{

    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    
    componentDidMount(){
        //let accessToRef = d3.select(this.myRef.current);
        //accessToRef.style("background-color", "green");
        this.drawChart();
    }

    

    drawChart(){
        const data = [12, 36, 40, 25, 35, 55, 20];

        const w = 500;
        const h = 400;

        const accessToRef = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("background-color", "#cccccc")
            .style("padding", 10)
            .style("margin-left", 50)

        accessToRef.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", (d, i) => 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", (d, i) => d > 35 ? "tomato" : "yellow")

    }

    render(){
        return <>
            <div ref={this.myRef}></div>
        </>
    }
}

export default BarChart;

