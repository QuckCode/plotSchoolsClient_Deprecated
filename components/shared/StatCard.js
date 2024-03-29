import { Button, Card, Col, Row } from 'antd';

import PropTypes from 'prop-types';

const StatCard = ({ type, title, value, icon, color, clickHandler, notCapital }) => {
  let before = null,
    after = null;

  const cardIcon = (
    <Col>
      <Button
        shape="circle"
        size="large"
        type="primary"
        style={{ backgroundColor: color, borderColor: color }}
        className={type !== 'fill' ? 'mr-4' : null}
      >
        {icon}
      </Button>
    </Col>
  );

  if (icon) {
    type === 'fill' ? (after = cardIcon) : (before = cardIcon);
  }

  return (
    <Card
      className="mb-4"
      style={type === 'fill' ? { backgroundColor: color } : null}
      onClick={clickHandler}
    >
      <Row type="flex" align="middle" justify="start">
        {before}
        <Col>
          <h5  style = {{textTransform: !notCapital ? "capitalize":"lowercase"}}  className={`mb-0 ${type === 'fill' ? 'text-white' : null}`}>
            {value}
          </h5>
          <small className={type === 'fill' ? 'text-white-50' : null}>
            {title}
          </small>
        </Col>
        <span className="mr-auto" />
        {after}
      </Row>
    </Card>
  );
};

StatCard.propTypes = {
  type: PropTypes.oneOf(['fill']),
  title: PropTypes.string,
  value: PropTypes.number,
  icon: PropTypes.element,
  color: PropTypes.string
};

export default StatCard;

