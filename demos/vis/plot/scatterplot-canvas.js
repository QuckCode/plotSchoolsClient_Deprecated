// Copyright (c) 2016 Uber Technologies, Inc.
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
  Hint,
  HorizontalGridLines,
  MarkSeries,
  MarkSeriesCanvas,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import NoSSR from 'react-no-ssr';

function getRandomData() {
  return new Array(100).fill(0).map(row => ({
    x: Math.random() * 10,
    y: Math.random() * 20,
    size: Math.random() * 10,
    color: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.5
  }));
}
const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};

const randomData = getRandomData();
const nextType = {
  typeA: 'typeB',
  typeB: 'typeA'
};

const nextModeContent = {
  canvas: 'SWITCH TO SVG',
  svg: 'SWITCH TO CANVAS'
};

const drawModes = ['canvas', 'svg'];

export default class Example extends React.Component {
  state = {
    drawMode: 0,
    data: randomData,
    colorType: 'typeA',
    value: false
  };

  render() {
    const { drawMode, data, colorType } = this.state;
    const markSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      seriesId: 'my-example-scatterplot',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      data,
      onNearestXY: value => this.setState({ value })
    };

    const mode = drawModes[drawMode];
    return (
      <div className="canvas-wrapper">
        <NoSSR>
          <FlexibleWidthXYPlot
            onMouseLeave={() => this.setState({ value: false })}
            height={300}
            color="#007bff"
          >
            <VerticalGridLines style={{ strokeWidth: 0.5 }} />
            <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
            <XAxis style={{ strokeWidth: 0.5 }} />
            <YAxis style={{ strokeWidth: 0.5 }} />
            {mode === 'canvas' && <MarkSeriesCanvas {...markSeriesProps} />}
            {mode === 'svg' && <MarkSeries {...markSeriesProps} />}
            {this.state.value ? <Hint value={this.state.value} /> : null}
          </FlexibleWidthXYPlot>
        </NoSSR>
      </div>
    );
  }
}
