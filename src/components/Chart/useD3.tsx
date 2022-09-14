import React, { MutableRefObject, useEffect, useRef } from 'react'
import * as d3 from 'd3'

type TD3 = {
    renderChartFn: () => void
    dependencies: any
}

const useD3 = (renderChartFn: (variable: any) => void, dependencies: any): MutableRefObject<SVGSVGElement | null> => {
    const ref = useRef<SVGSVGElement>(null)
    useEffect(() => {
        renderChartFn(d3.select(ref.current))
    }, dependencies)
    return ref
}

export default useD3