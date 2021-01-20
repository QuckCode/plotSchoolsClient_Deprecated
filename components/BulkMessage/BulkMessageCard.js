import { Button, Card, Col, Row, Typography } from 'antd';

import PropTypes from 'prop-types';
import { User } from 'react-feather';

const BulkMessageCard = ({  value, icon, color, clickHandler }) => {

  return (
    <Button
      className="cardBulk"
      style={{ backgroundColor: color, width:"10rem", height:"10rem", marginLeft:'7rem'  }}
      onClick={clickHandler}
    > 
      <div style={{flexDirection:"column", flex:1}}      onClick={clickHandler}>
           {icon}
          <Typography.Paragraph       onClick={clickHandler} > {value}</Typography.Paragraph>
      </div>
    </Button>
  );
};

BulkMessageCard.propTypes = {
  type: PropTypes.oneOf(['fill']),
  value: PropTypes.number,
  icon: PropTypes.element,
  color: PropTypes.string
};

export default BulkMessageCard;

