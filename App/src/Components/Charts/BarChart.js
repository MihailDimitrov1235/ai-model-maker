import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function BarChart(){
    const chartRef = useRef(null)
    
    const data = [12, 36, 40, 25, 35, 55, 20];

    const w = 500;
    const h = 400;

    useEffect(() => {
        const svg = d3.select(chartRef.current).select("svg");
        if (svg.empty()) {
        const newSvg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("background-color", "#cccccc")
            .style("padding", 10)
            .style("margin-left", 50);

        newSvg
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", (d, i) => 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", (d, i) => (d > 35 ? "tomato" : "yellow"));
        }
        
      }, [data]);

    return (
        <div ref={chartRef}/>
    )
}



