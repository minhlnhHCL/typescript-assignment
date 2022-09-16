import { PieArcDatum, Selection } from 'd3'
import * as d3 from 'd3'
import { useRef, useEffect, useState } from 'react'
import { IData } from './ChartLine'

const data: IData[] = [
    { label: "Apples", value: 100 },
    { label: "Bananas", value: 200 },
    { label: "Oranges", value: 50 },
    { label: "Kiwis", value: 150 },
    { label: "Mangoes", value: 40 },
    { label: "Guavas", value: 120 },
    { label: "Pears", value: 220 },
    { label: "Watermelons", value: 130 },
    { label: "Tomatoes", value: 240 },
    { label: "Strawberries", value: 150 },
    { label: "Jackfruits", value: 180 },
    { label: "Rambutans", value: 210 },
    { label: "Starfruit", value: 160 },
    { label: "Avocadoes", value: 100 },
    { label: "Durians", value: 150 },
]

const D3DonutChart = () => {
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };
    const width = 900 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    const newData = data.map((item) => {
        const rand = 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')';
        return { ...item, color: rand }
    })


    const radius = Math.min(width, height) / 2 - margin.left

    const color = d3.scaleOrdinal().domain(newData.map(d => d.label)).range(newData.map(d => d['color']))

    const pie = d3
        .pie<IData>()
        .sort(null)
        .value((record) => record.value)

    const path = d3.arc<PieArcDatum<IData>>().innerRadius(radius * 0.5).outerRadius(radius * 0.8)

    const outerArc = d3.arc<PieArcDatum<IData>>()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    const pieData = pie(newData)


    useEffect(() => {
        if (!selection) setSelection(d3.select(svgRef.current))
        else {
            selection
                .select('g')
                .append('g')
                .attr('class', 'arc')
                .selectAll('.arc')
                .data(pieData)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => color(d.data.label) as string)
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)

            selection
                .select('g')
                .append('g')
                .attr('class', 'labels')
                .selectAll('.labels')
                .data(pieData)
                .enter()
                .append('text')
                .attr("dy", ".35em")
                .text(d => d.data.label)
                .attr('transform', d => {
                    const pos = outerArc.centroid(d);
                    const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', d => {
                    const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midAngle < Math.PI ? 'start' : 'end')
                })

            selection
                .select('g')
                .append('g')
                .attr('class', 'lines')
                .selectAll('.lines')
                .data(pieData)
                .enter()
                .append('polyline')
                .style('fill', 'none')
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.3)
                //@ts-ignore
                .attr('points', d => {
                    const posA = path.centroid(d)
                    const posB = outerArc.centroid(d)
                    const posC = outerArc.centroid(d);
                    const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
                    return [posA, posB, posC]
                })

        }
    }, [selection])


    return (
        <> <svg
            ref={svgRef}
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${width / 2},${height / 2})`} />
        </svg>
        </>
    )
}

export default D3DonutChart