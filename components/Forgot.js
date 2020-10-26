import { Button, Form, Input, Message, Row } from 'antd';
import { Eye,User, Terminal} from 'react-feather';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Forgot = ({ form }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white"
    style={{ minHeight: '100vh' }}
  >
    <Content>
      <div className="text-center mb-5">
        <Link href="/forgot">
          <a className="brand mr-0">
            <Terminal size={32} strokeWidth={1} />
          </a>
        </Link>
        <h5 className="mb-0 mt-3">Recover your password</h5>

        <p className="text-muted">receive password reset instructions.</p>
      </div>

      <Form
        layout="vertical"
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              Message.success(
                'We just sent a  your password to your mail'
              ).then(() => Router.push('/signin'));
            }
          });
        }}
      >
      <FormItem label="Reg Number">
          {form.getFieldDecorator('Reg Number', {rules: [ {required: true,message: 'Please input your Reg Number!'}]
          })(
            <Input
              prefix={ <User size={16}  strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }}/> }
              type="text"
              placeholder="RegNumber"
            />
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Reset password
          </Button>
        </FormItem>
      </Form>
    </Content>
  </Row>
);

export default Form.create()(Forgot);
