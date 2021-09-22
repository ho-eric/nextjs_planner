import React, { useEffect } from 'react';
import * as d3 from 'd3';

function PieChart(props: any) {

  //console.log("calling piechart");
  //console.log("props", props.data);

  // gets connected to svg drawn by React by variable name and its ref attribute
  let d3Container = React.createRef<any>();

  let dimensions = ({
    width: props.width ? props.width : 200,
    height: props.height ? props.height : 200,
    padding: props.padding ? props.padding : 50
  });

  const data = [...props.data];

  let pie = (d3.pie<any>())
    .sort(null)
    .value((d: any) => d.value);

  let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(dimensions.width, dimensions.height) / 2 - 1);


  // init code - only run on startup
  useEffect(function () {

    if (!(d3Container.current && data))
      return;

    let chartSvg = d3.select(d3Container.current as any);

    chartSvg.append('g')
      .attr('id', "pieChart-" + props.task)
      .attr('class', 'chart-content')
      .attr('transform', `translate(
      ${dimensions.width / 2 + dimensions.padding},
      ${dimensions.height / 2 + dimensions.padding})`);
  });

  // update function
  useEffect(function () {

    //console.log("update effect");

    if (!(d3Container.current && data))
      return;

    const valueSum = d3.sum(data, (d: any) => d.value);
    if (valueSum - valueSum >= 0) {
      data.push({
        task: '$empty',
        value: (valueSum - valueSum),
        color: '#7f8187'
      });
    }

    const arcs = pie(data);

    const g = d3.select("#pieChart-" + props.task);
    g.selectAll('path')
      .data(arcs)
      .join('path')
      .on('mouseover', (event, d) => onSliceOver(event, d))
      .on('mouseout', (event, d) => onSliceOut(event, d))
      .transition().duration(500)
      .attr('fill', d => d.data.color)
      .attr('transform', d => (d.data.task) == '$empty' ? 'scale(0.95)' : '')
      .attr('d', arc as any);
  },
  ); // useEffect update function


  function onSliceOver(event: any, d: any) {
    if (d.data.task == '$empty')
      return;

    d3.select(event.currentTarget)
      .transition().duration(200)
      .attr('transform', 'scale(1.1)')

    const g = d3.select("#pieChart-" + props.task);
    g.select('#chart-tooltip').remove();
    g.append('text')
      .attr('x', 0)
      .attr('y', 130)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('id', 'chart-tooltip')
      .text(`${d.data.task}: ${d.data.value} mins`);
  }

  function onSliceOut(event: any, d: any) {
    if (d.data.task == '$empty')
      return;

    d3.select(event.currentTarget)
      .transition().duration(200)
      .attr('transform', 'scale(1)')

    const g = d3.select(".pie-chart");
    g.select('#chart-tooltip').remove();
  }

  return (
    <svg
      className="pie-chart"
      width={dimensions.width + 2 * dimensions.padding}
      height={dimensions.height + 2 * dimensions.padding}
      ref={d3Container}
    />
  );
}


export default PieChart;