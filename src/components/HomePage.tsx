import React from 'react';
import millify from 'millify';
import {
  Typography, Row, Col, Statistic,
} from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../api/cryptoApi';

import { Cryptocurrencies, News, Loader } from '.';

const { Title } = Typography;

const HomePage = (): JSX.Element => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const GlobalStats = data?.data?.stats;

  if (!GlobalStats && isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={GlobalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exhcanges'
            value={millify(GlobalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(GlobalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(GlobalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(GlobalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world (by market cap)
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/cryptocurrencies'>Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Crypto News
        </Title>
        <Title level={3} className='show-more'>
          <Link to='/news'>Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
