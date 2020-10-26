import { Row } from 'antd';
import { mapSection } from '../showcase-components/showcase-utils';
import { showCase } from '../index';

const {
  CustomRadiusRadialChart,
  DonutChartExample,
  SimpleRadialChart,
  GradientPie
} = showCase;
/* eslint-disable max-len */
const RADIAL = [
  {
    name: 'Simple Radial Chart',
    component: SimpleRadialChart,
    componentName: SimpleRadialChart,
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/radial-chart/index.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/other-charts/radial-chart'
  },
  {
    name: 'Simple Donut Chart',
    component: DonutChartExample,
    componentName: DonutChartExample
  },
  {
    name: 'Custom Radius',
    component: CustomRadiusRadialChart,
    componentName: CustomRadiusRadialChart
  },
  {
    name: 'Gradient Pie',
    component: GradientPie,
    componentName: GradientPie
  }
];

function RadialShowcase(props) {
  return (
    <article id="radial-charts">
      <Row type="flex" align="top" gutter={16}>
        {RADIAL.map(mapSection)}
      </Row>
    </article>
  );
}

export default RadialShowcase;
