import { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import { easeElastic, max, scaleBand, scaleLinear, select, Selection } from 'd3'
import styled from 'styled-components'
import { AxisBottom, AxisLeft } from './ChartLine'

let initialData = [
    { label: "Apples", value: 20 },
    { label: "Bananas", value: 100 },
    { label: "Oranges", value: 50 },
    { label: "Kiwis", value: 150 },
    { label: "Mangoes", value: 40 },
    { label: "Guavas", value: 120 },
    { label: "Pears", value: 220 },
    { label: "Watermelons", value: 130 },
    { label: "Tomatoes", value: 135 },
    { label: "Strawberries", value: 150 },
    { label: "Jackfruits", value: 180 },
]
const D3Transition = () => {
    const dimensions = { width: 800, height: 700 }
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };

    const newData = initialData.map((item) => {
        const rand = 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')';
        return { ...item, color: rand }
    })

    const svgRef = useRef<SVGSVGElement | null>(null)
    const [data, setData] = useState(newData)

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

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current))
            console.log(selection);

        } else {
            selection
                .select('g')
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => x(d.label)!)
                .attr('y', dimensions.height)
                .attr('width', x.bandwidth)
                .attr('fill', d => d.color)
                .attr('height', 0)
                .transition()
                .duration(700)
                .delay((_, i) => i * 100)
                .ease(easeElastic)
                .attr('height', d => dimensions.height - y(d.value))
                .attr('y', d => y(d.value))
        }
    }, [selection])

    useEffect(() => {
        if (selection) {
            const rects = selection.select('g').selectAll('rect').data(data)

            rects
                .exit()
                .transition()
                .ease(easeElastic)
                .duration(300)
                // .attr('height', 0)
                .attr('y', dimensions.height)
                .remove()

            rects
                .transition()
                .delay(300)
                .attr('x', d => x(d.label)!)
                .attr('y', d => y(d.value))
                .attr('width', x.bandwidth)
                .attr('height', d => dimensions.height - y(d.value))
                .attr('fill', d => d.color)

            rects
                .enter()
                .append('rect')
                .attr('x', d => x(d.label)!)
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('y', dimensions.height)
                .transition()
                .delay(400)
                .duration(500)
                .ease(d3.easeElastic)
                .attr('height', d => dimensions.height - y(d.value))
                .attr('y', d => y(d.value))
                .attr('fill', d => d.color)
        }
    }, [data])

    const addData = () => {
        const dataToAdd = {
            label: (Math.random() + 1).toString(36).substring(7),
            value: Math.round(Math.random() * 80 + 60),
            color: 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')'
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
        display: flex;
        flex-direction: column;
    `

    return (
        <>
            <svg
                ref={svgRef}
                width={dimensions.width + margin.left + margin.right}
                height={dimensions.height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom scale={x} transform={`translate(0, ${dimensions.height})`} />
                    <AxisLeft scale={y} />
                </g>
            </svg>
            <div>
                <button onClick={addData}>Add Data</button>
                <button onClick={removeData}>Remove Data</button>
            </div>
        </>
    )
}

export default D3Transition