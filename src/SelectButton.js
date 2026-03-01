import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function SelectButton({ selectedOption, onMemeSelect }) {
  const [options, setOptions] = useState([]);
  const [, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.memegen.link/templates')
      .then((response) => {
        const fetchedOptions = response.data.map((meme) => ({
          value: meme.id,
          label: meme.name,
        }));
        /* update state with the fetched options */
        setOptions(fetchedOptions);
        /* set Doge as default */
        const doge = fetchedOptions.find((opt) =>
          opt.label.toLowerCase().includes('doge'),
        );
        if (doge) {
          onMemeSelect(doge);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch memes:', err);
        setError('Sorry, could not load the memes.');
      })
      .finally(() => {
        console.log('Successfully loaded the memes.');
      });
  }, [onMemeSelect]);

  return (
    <div
      className="App"
      style={{
        fontSize: '15px',
        padding: '5px 0',
        margin: '10px 0',
        width: '195px',
        display: 'block',
      }}
    >
      <label htmlFor="meme-select-input">Meme template</label>
      <Select
        inputId="meme-select-input"
        value={selectedOption}
        options={options}
        onChange={onMemeSelect}
      />
    </div>
  );
}
