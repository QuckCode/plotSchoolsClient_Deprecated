import { Component } from 'react';
import { Form, Icon, InputNumber, Button, Checkbox, Row, Col, Card } from 'antd';

import React from 'react';
import PropTypes from 'prop-types';

 
const GenerateForm = ({form}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
     
      }
    });
  };

  return (
    <div style={{margin:20}}>
     <Row >
      <Col span={24}>
      <Card title="Scratch Card Form" style={{background:"#f2f2f2", borderWidth:10, borderColor:"rgba(0,0,0,0.1)"}}>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Amount Each Card Cost">
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: 'Please input card amount' }],
          })(
            <InputNumber
              style={{ width: "100%" }}
              formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Amount"
            />,
          )}
        </Form.Item>
        <Form.Item label="Total Number of Cards to be generated">
          {getFieldDecorator('numberOfCard', {
            rules: [{ required: true, message: 'Please input total number of generated card' }],
          })(
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Number Of Cards"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
             Generate
          </Button>
        </Form.Item>
      </Form>

      </Card>

      </Col>
    </Row>
    </div>
  );
}

export default Form.create()(GenerateForm)