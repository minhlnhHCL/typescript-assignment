import React, { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import { easeElastic, max, scaleBand, scaleLinear, select, Selection } from 'd3'
import styled from 'styled-components'
import { AxisBottom, AxisLeft, Bars } from './ChartLine'

let initialData = [
    {
        label: 'foo',
        value: 32,
    },
    {
        label: 'bar',
        value: 67,
    },
    {
        label: 'baz',
        value: 81,
    },
    {
        label: 'hoge',
        value: 38,
    },
    {
        label: 'piyo',
        value: 28,
    },
    {
        label: 'hogera',
        value: 59,
    },
]
const D3Transition = () => {
    const dimensions = { width: 800, height: 700 }
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };

    const svgRef = useRef<SVGSVGElement | null>(null)
    const [data, setData] = useState(initialData)

    let x = scaleBand()
        .domain(data.map(d => d.label))
        .range([0, dimensions.width])
        .padding(0.05)

    let y = scaleLinear()
        .domain([0, max(data, d => d.value)!])
        .range([dimensions.height, 0])

    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    // useEffect(() => {
    //     if (!selection) {
    //         setSelection(select(svgRef.current))
    //     } else {
    //         selection
    //             .selectAll('rect')
    //             .data(data)
    //             .enter()
    //             .append('rect')
    //             .attr('x', d => x(d.label)!)
    //             .attr('y', dimensions.height)
    //             .attr('width', x.bandwidth)
    //             .attr('fill', 'orange')
    //             .attr('height', 0)
    //             .transition()
    //             .duration(700)
    //             .delay((_, i) => i * 100)
    //             .ease(easeElastic)
    //             .attr('height', d => dimensions.height - y(d.value))
    //             .attr('y', d => y(d.value))
    //     }
    // }, [selection])

    // useEffect(() => {
    //     if (selection) {
    //         x = scaleBand()
    //             .domain(data.map(d => d.label))
    //             .range([0, dimensions.width])
    //             .padding(0.05)
    //         y = scaleLinear()
    //             .domain([0, max(data, d => d.value)!])
    //             .range([dimensions.height, 0])

    //         const rects = selection.selectAll('rect').data(data)

    //         rects
    //             .exit()
    //             .transition()
    //             .ease(easeElastic)
    //             .duration(400)
    //             // .attr('height', 0)
    //             .attr('y', dimensions.height)
    //             .remove()

    //         /**
    //          * a delay is added here to aid the transition
    //          * of removing and adding elements
    //          * otherwise, it will shift all elements
    //          * before the add/remove transitions are finished
    //          */
    //         rects
    //             .transition()
    //             .delay(300)
    //             .attr('x', d => x(d.label)!)
    //             .attr('y', d => y(d.value))
    //             .attr('width', x.bandwidth)
    //             .attr('height', d => dimensions.height - y(d.value))
    //             .attr('fill', 'orange')

    //         rects
    //             .enter()
    //             .append('rect')
    //             .attr('x', d => x(d.label)!)
    //             .attr('width', x.bandwidth)
    //             .attr('height', 0)
    //             .attr('y', dimensions.height)
    //             .transition()
    //             .delay(400)
    //             .duration(500)
    //             .ease(d3.easeElastic)
    //             .attr('height', d => dimensions.height - y(d.value))
    //             .attr('y', d => y(d.value))
    //             .attr('fill', 'orange')
    //     }
    // }, [data])

    const addData = () => {
        const dataToAdd = {
            label: (Math.random() + 1).toString(36).substring(7),
            value: Math.round(Math.random() * 80 + 20),
        }
        setData([...data, dataToAdd])
    }

    const removeData = () => {
        if (data.length === 0) {
            return
        }
        setData([...data.slice(0, data.length - 1)])
    }

    const Wrapper = styled.div`
        width: 100%;
        height: 700px;
    `

    return (
        <div>
            <svg
                ref={svgRef}
                width={dimensions.width + margin.left + margin.right}
                height={dimensions.height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom scale={x} transform={`translate(0, ${dimensions.height})`} />
                    <AxisLeft scale={y} />
                    <Bars data={data} scaleX={x} scaleY={y} height={dimensions.height - margin.top - margin.bottom} />
                </g>
            </svg>
            <button onClick={addData}>Add Data</button>
            <button onClick={removeData}>Remove Data</button>
        </div>
    )
}

export default D3Transition