import React from 'react';

import {  Layout,} from 'antd';

import HomeSider from '../components/HomeSider';
import HomeContent from '../components/HomeContent';
import HomeHeader from '../components/HomeHeader';

const HomePage = () => {
  
  return (
    <Layout>
      <HomeSider/>
      <Layout>
        <HomeHeader/>
        <HomeContent/>
      </Layout>
    </Layout>
  );
};
export default HomePage;