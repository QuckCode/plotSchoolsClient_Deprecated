import { Modal } from "antd";


 export function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

 export function success(content) {
  Modal.success({
    content,
  });
}

 export function error(title, content) {
  Modal.error({
    title: title,
    content: content,
  });
}

 export function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}
