import { useEffect, useRef } from "react";
import {
    axisBottom,
    axisLeft,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    select
} from "d3";

export interface IData {
    label: string
    value: number
}

export interface BarChartProps {
    data: IData[];
}

export interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

export interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

export interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}

export const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g ref={ref} transform={transform} />;
}

export const AxisLeft = ({ scale }: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return <g ref={ref} />;
}

export const Bars = ({ data, height, scaleX, scaleY }: BarsProps) => {
    // const randomColor = data.map((_, index) => {
    //     const rand = 'rgb(' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ',' + (Math.floor((256 - 199) * Math.random()) + 200) + ')';
    //     return rand
    // })
    return (
        <>
            {data.map(({ value, label }, ind) => (
                <rect
                    key={`bar-${label}`}
                    x={scaleX(label)}
                    y={scaleY(value)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(value)}
                    fill={`teal`}
                />
            ))}
        </>
    );
}

export function BarChart() {

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
        // { label: "Blueberries", value: 150 },
        // { label: "Blackberries", value: 150 },
        // { label: "Dragon fruit", value: 150 },
        // { label: "Papayas", value: 150 },
        // { label: "Plums", value: 150 },
        // { label: "Lychees", value: 150 },
        // { label: "Figs", value: 150 },
        // { label: "Apricots", value: 150 },
        // { label: "Pineapples", value: 150 },
        // { label: "Limes", value: 150 },
        // { label: "Peaches", value: 150 },
        // { label: "Pomegranates", value: 150 },
        // { label: "Tamarinds", value: 150 },
        // { label: "Melons", value: 150 },
        // { label: "Mulberries", value: 150 },
        // { label: "Gooseberries", value: 150 },
        // { label: "Sapodillas", value: 150 },
        // { label: "Cashews", value: 150 },
    ];

    const margin = { top: 10, right: 0, bottom: 20, left: 30 };
    const width = 900 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width])
        .padding(0.5);
    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ value }) => value))])
        .range([height, 0]);

    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
                <AxisLeft scale={scaleY} />
                <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
            </g>
        </svg>
    );
}
