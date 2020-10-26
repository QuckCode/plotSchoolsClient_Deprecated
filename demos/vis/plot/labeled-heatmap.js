// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {
  FlexibleWidthXYPlot,
  HeatmapSeries,
  LabelSeries,
  XAxis,
  YAxis
} from 'react-vis';

import { scaleLinear } from 'd3-scale';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const data = alphabet.reduce((acc, letter1, idx) => {
  return acc.concat(
    alphabet.map((letter2, jdx) => ({
      x: `${letter1}1`,
      y: `${letter2}2`,
      color: (idx + jdx) % Math.floor(jdx / idx) || idx
    }))
  );
}, []);
const { min, max } = data.reduce(
  (acc, row) => ({
    min: Math.min(acc.min, row.color),
    max: Math.max(acc.max, row.color)
  }),
  { min: Infinity, max: -Infinity }
);

export default function LabeledHeatmap() {
  const exampleColorScale = scaleLinear()
    .domain([min, (min + max) / 2, max])
    .range(['#007bff', '#52c41a', '#f5222d']);
  return (
    <FlexibleWidthXYPlot
      xType="ordinal"
      xDomain={alphabet.map(letter => `${letter}1`)}
      yType="ordinal"
      yDomain={alphabet.map(letter => `${letter}2`).reverse()}
      margin={50}
      height={355}
    >
      <XAxis orientation="top" style={{ strokeWidth: 0.5 }} />
      <YAxis style={{ strokeWidth: 0.5 }} />
      <HeatmapSeries
        colorType="literal"
        getColor={d => exampleColorScale(d.color)}
        style={{
          stroke: 'white',
          strokeWidth: '1px',
          rectStyle: {
            rx: 0,
            ry: 0
          }
        }}
        className="heatmap-series-example"
        data={data}
      />
      <LabelSeries
        data={data}
        labelAnchorX="middle"
        labelAnchorY="baseline"
        getLabel={d => `${d.color}`}
      />
    </FlexibleWidthXYPlot>
  );
}
