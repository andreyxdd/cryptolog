import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {
  Navbar, Exchanges, HomePage, CryptoDetails, Cryptocurrencies, News,
} from './components';
import './App.css';

function App(): JSX.Element {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout style={{ width: '100%' }}>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title
            level={5}
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            Cryptolog
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: 'white',
              textAlign: 'center',
            }}
            type='secondary'
          >
            Copyright @
            {' '}
            {new Date().getFullYear()}
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{
              color: 'white',
              textAlign: 'center',
            }}
            type='secondary'
          >
            Proudly created by
            {' '}
            <a style={{ color: 'grey' }} href='https://linktr.ee/andreyxdd'>Andrey Volkov</a>
          </Typography.Paragraph>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
