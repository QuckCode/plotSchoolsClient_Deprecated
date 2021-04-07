import { useEffect, useState } from 'react'
import Head from 'next/head';
import { Card, Dropdown , Menu, Row} from 'antd';
import { MoreHorizontal,Save, Camera, Printer } from 'react-feather';
import { theme } from '../components/styles/GlobalStyles';
import GenerateScratchCard from '../components/ScratchCard/GenerateScratchCard';
import ViewScratchCard from '../components/ScratchCard/ViewScratchCard';
import DeleteScratchCard from '../components/ScratchCard/DeleteScratchCard';
import { wrapper } from '../redux/store';
import { AuthToken } from '../services/authToken';
import { loginSuccess } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { getScratchCard , getScratchCardStatsRequest , generateScratchCardRequest} from '../redux/actions/scratchCard';
import { redirectError } from '../services/redirectService';
import { school } from '../redux/varables';





const ScratchCardPage = ({cards, stats, getScratchCard,user, userType, generateScratchCardRequest,  getScratchCardStatsRequest }) => {
  const [type, setType] = useState("tab1")
  const [key, setKey] = useState("tab1")
  const tabList = [{key: "tab1", tab: 'Generate Scratch Card ',},{ key: "tab2",tab: 'View Scratch Card',},{ key: "tab3",tab: 'Delete Scratch Card',},];

  const menu = (
    <Menu>
      <Menu.Item>
        <Row type="flex" align="middle">
          <Camera size={16} strokeWidth={1} className="mr-3" />{' '}
          <span>SnapShot</span>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Row type="flex" align="middle">
          <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as pdf</span>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Row type="flex" align="middle">
          <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
          <span>Print</span>
        </Row>
      </Menu.Item>
    </Menu>
  );
  
   const contentList = {
     tab1: <GenerateScratchCard stats= {stats} generateScratchCardRequest={generateScratchCardRequest} getScratchCardStatsRequest={getScratchCardStatsRequest} />, 
     tab2: <ViewScratchCard  stats= {stats}/>,  
     tab3: <DeleteScratchCard  stats= {stats}/>,
    };
  
  const  onTabChange = (key, type) => {
    setKey(key), setType(type)
  };


  return (
    <>
       <Card
          style={{ width: '100%' }}
          extra={
            <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
          }
          tabList={tabList}
          activeTabKey={key}
          onTabChange={key => {
            onTabChange(key, 'key');
          }}
        >
          {contentList[key]}
        </Card>
    </>
  )

}

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      await store.dispatch(getScratchCardStatsRequest(school))
      let propStore =  await store.getState()  
      return {
        props:{
           user:propStore.auth.user,
           userType:propStore.auth.user.userType,
        }
      } 

    } catch (error) {
        console.trace(error)
        redirectError(ctx)
    }
  }
)


const mapStateToProps = state => ({
   cards:state.scratchCard.cards,
   stats:state.scratchCard.stats
});

const mapDispatchToProps = {
     getScratchCard, 
     getScratchCardStatsRequest,
     generateScratchCardRequest
    
};

export default  connect(mapStateToProps, mapDispatchToProps)(ScratchCardPage);
