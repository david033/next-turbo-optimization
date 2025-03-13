'use client';

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

type BtnProps = {
  handleClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Btn: FC<BtnProps> = ({ handleClick, children, style }) => {
  return (
    <button onClick={handleClick} style={{ ...style, padding: '1rem' }}>{children}</button>
  );
}

const formulaOneDrivers = [
  'Lewis Hamilton',
  'Max Verstappen',
  'Sebastian Vettel',
  'Charles Leclerc',
  'Valtteri Bottas',
  'Sergio Perez',
  'Lando Norris',
  'Daniel Ricciardo',
  'Carlos Sainz',
  'Fernando Alonso'
];

const Client: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [clickInvalCount, setClickInvalCount] = useState(0);
  const [keyword, setKeyword] = useState('');

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  const cachedHandleClick = useCallback(() => {
    setClickCount(prevCount => prevCount + 1);
  }, [clickInvalCount]);

  const triggerCacheInvalidation = useCallback(() => {
    setClickInvalCount(prevCount => prevCount + 1);
  }, []);

  useEffect(() => {
    console.log('Handle click function changed');
  }, [handleClick]);

  useEffect(() => {
    console.log('Cached handle click function changed');
  }, [cachedHandleClick]);

  const filterDrivers = useCallback((_keyword: string) => {
    return formulaOneDrivers.filter(driver => driver.toLowerCase().includes(_keyword.toLowerCase()));
  }, []);

  const memoDrivers = useMemo(() => {
    console.log('Filtering memo drivers');
    return filterDrivers(keyword);
  }, [filterDrivers, keyword]);

  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  return (
    <div>
      <p>Click count: {clickCount}</p>
      <br />
      <Btn handleClick={handleClick}>Uncached click handler</Btn><br /><br />
      <Btn handleClick={cachedHandleClick} style={{ backgroundColor: 'green', color: 'white' }}>Cached click handler</Btn><br /><br />
      <Btn handleClick={triggerCacheInvalidation} style={{ backgroundColor: 'green', color: 'white' }}>Trigger cached fn render</Btn>
      <br />
      <br />
      <br />

      <h3>Formula one drivers</h3>
      <input type="text" placeholder="Filter driver" onChange={handleKeywordChange} />
      <br />
      <br />
      <br />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <p>Filtered memo list:</p>
          <ul>
            {memoDrivers.map(driver => (
              <li key={driver}>{driver}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Original drivers&apos; list:</p>
          <ul>
            {formulaOneDrivers.map(driver => (
              <li key={driver}>{driver}</li>
            ))}
          </ul>
        </div>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
};

export default Client;