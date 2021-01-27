import { Modal, Button } from "antd";


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

 export function warning(title, content, ok =()=>{}, okText) {
  Modal.warn({
    title: title,
    content: (
      <div>
        <span> {content}</span>
        <br/>
        <br/>
        <Button onClick={Modal.destroyAll} style={{marginLeft:"22%"}} type="danger" value="cancel"> Cancel </Button>
        <Button  style={{margin:"1rem", marginRight:0}} onClick={()=>{ok(),Modal.destroyAll()}} type="primary"> {okText} </Button> 
      </div>
    ),
    okButtonProps:{style:{display:"none"}}
  });
}
