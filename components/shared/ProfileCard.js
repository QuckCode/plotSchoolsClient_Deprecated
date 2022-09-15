import { Avatar, Button, Card, Carousel, Col, Row } from "antd";
import { MessageCircle, PhoneCall } from "react-feather";

import PropTypes from "prop-types";
import styled from "styled-components";

const Cover = styled.div`
   position: relative;
   width: 100%;
   .ant-carousel {
      position: absolute;
      width: 100%;
      height: 100%;
   }
   .slick-slider {
      width: 100%;
      height: 100%;
   }
   .slick-slide > div {
      display: flex;
   }
   .image {
      position: relative;
      background-size: cover;
      background-position: top center;
      width: 100%;
   }
   .weakColor & .image {
      -webkit-filter: invert(100%);
      filter: invert(100%);
   }
   .content {
      position: relative;
      z-index: 9;
   }
`;

const Picture = styled.div`
   position: relative;
   .message,
   .phone {
      position: absolute;
      top: 60%;
      margin-top: -8px;
      z-index: 1;
   }
   .message {
      left: -8px;
   }
   .phone {
      right: -8px;
   }
`;

const ProfileCard = ({
   name,
   avatar,
   admissionNumber,
   className,
   phone,
   gender,
   school,
   callHandler,
   messageHandler,
}) => {
   return (
      <Card
         className="mb-4"
         cover={
            <Cover>
               <div className="content text-center p-4">
                  <Row
                     type="flex"
                     align="middle"
                     justify="space-around"
                     className="mb-4"
                  >
                     <Picture>
                        <Avatar
                           alt={name}
                           src={avatar}
                           size={128}
                           className="shadow"
                        />
                     </Picture>
                  </Row>
                  <h2> Name: {name}</h2>
                  <br />
                  <h2>AdmissionNumber: {admissionNumber}</h2>
                  <br />
                  <h2>Class: {className}</h2>
                  <br />
                  <h2>Phone :{phone}</h2>
                  <br />
                  <h2>Gender :{gender}</h2>
                  <br />
                  <h2>School :{school}</h2>
               </div>
            </Cover>
         }
      ></Card>
   );
};

ProfileCard.propTypes = {
   name: PropTypes.string.isRequired,
   avatar: PropTypes.string.isRequired,
   admissionNumber: PropTypes.string.isRequired,
   className: PropTypes.string.isRequired,
   phone: PropTypes.string.isRequired,
   gender: PropTypes.string.isRequired,
   school: PropTypes.string.isRequired,
};

export default ProfileCard;
