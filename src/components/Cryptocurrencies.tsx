import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Input,
} from 'antd';
import { Loader } from '.';

import { useGetCryptosQuery } from '../api/cryptoApi';

interface ICryptocurrencies {
  simplified?: boolean;
}

const Cryptocurrencies: React.FC<ICryptocurrencies> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const filteredData = cryptosList
      ?.data
      ?.coins
      .filter((coin: any) => coin.name.toLowerCase().includes(searchItem.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchItem]);

  if (!cryptosList && isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptocurrencies'
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency: any) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className='crypto-card'
            key={`${currency.name}-key`}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img alt='crypto' className='crypto' src={currency.iconUrl} width={40} height={40} />}
                hoverable
              >
                <p>
                  Price:
                  {' '}
                  {millify(currency.price)}
                </p>
                <p>
                  Market Cap:
                  {' '}
                  {millify(currency.marketCap)}
                </p>
                <p>
                  Daily Change:
                  {' '}
                  {millify(currency.change)}
                  %
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
