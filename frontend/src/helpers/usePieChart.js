import { useEffect } from 'react';
import * as d3 from 'd3';

const usePieChart = (data_V1, setComponent) => {
  useEffect(() => {
    const pieChartElement = d3.select('#pieChart');
    const width = parseInt(pieChartElement.style('width'), 10);
    const height = width;
    const radius = 90;
    const inner = Math.min(radius, 150);
    const outer = Math.max(radius, 150);

    const arc = d3.arc()
      .outerRadius(inner - 10)
      .innerRadius(outer);

    const arcOver = d3.arc()
      .outerRadius(inner - 10)
      .innerRadius(outer + 20);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.Amount);

    const svg = d3.select("#pieChart").append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("overflow", 'unset')
      .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append("g")
      .attr("transform", window.innerWidth <= 1000 ? "translate(" + width / 2 + "," + height / 2 + ") rotate(270)" : "translate(" + width / 2 + "," + height / 2 + ")");

    const g = svg
      .selectAll("path")
      .data(pie(data_V1))
      .enter().append("path")
      .style("fill", d => d.data.Color)
      .style("stroke", d => d.data.Color)
      .style("stroke-width", d => d.data.Type === "Pozostało" ? "0px" : "2px")
      .attr("d", arc)
      .attr("id", d => `pieArc${d.data.Type}`)
      .attr("fill-opacity", 0.3)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("fill-opacity", 0.4);
        d3.select(`#chartArea${d.data.Type}`).attr('fill-opacity', '0.4');
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).attr("fill-opacity", 0.3); 
        d3.select(`#chartArea${d.data.Type}`).attr('fill-opacity', '0.3');
      })
      .on("mouseenterchart", function (event, d) {
        d3.select(this).attr("fill-opacity", 0.4);
      })
      .on("mouseleavechart", function (event, d) {
          d3.select(this).attr("fill-opacity", 0.3);
      })
      .on("click", function (event, d) {
        change(d, this);
      });

      const change=(d, i)=>{
        const angle = 90 - ((d.startAngle * (180 / Math.PI)) + ((d.endAngle - d.startAngle) * (180 / Math.PI) / 2));
        const pieChartContainer = document.querySelector('#pieChartContainer');
        if (d.data.Type !== "Pozostało") {
          pieChartContainer.style.transform = 'translateX(0)';
          // setTimeout(() => {
            if (typeof setComponent === 'function') {
              setComponent(d.data);
            }
          // }, 800);
          svg.transition()
          .duration(1000)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(" + angle + ")");
        } else {
            if (window.innerWidth >= 1000)
              pieChartContainer.style.transform = 'translateX(270px)';
            if (typeof setComponent === 'function') {
              setComponent(null);
            }
            svg.transition()
              .duration(1000)
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(0)");
        }
        svg.selectAll("path")
          .transition()
          .duration(1000)
          .attr("d", arc);
        d3.select(i)
          .transition()
          .duration(1000)
          .attr("d", arcOver);
      };

      return () => {
        d3.select("#pieChart").select("svg").remove();
      };
  }, [data_V1, setComponent]);
};

export default usePieChart;