import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import SelectButton from './SelectButton';

const Button = styled.button`
  font-size: 15px;
  padding: 5px 0;
  margin: 20px 0;
  width: 220px;
  display: block;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 5px 0;
  margin: 10px 0;
  width: 195px;
  display: block;
`;

export default function App() {
  const [topTextInput, setTopTextInput] = useState('');
  const [bottomTextInput, setBottomTextInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMemeSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const clean = (str) => {
    return str.trim().replace(/\s+/g, '_') || '_';
  };

  const currentMemeUrl =
    selectedOption?.value &&
    `https://api.memegen.link/images/${selectedOption.value}/${clean(topTextInput)}/${clean(bottomTextInput)}.png`;

  const handleInputChange = (setter) => {
    return (e) => {
      setter(e.target.value);
    };
  };

  const handleDownload = async () => {
    if (!currentMemeUrl) return;
    try {
      const response = await fetch(currentMemeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'meme.png';
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <Container
      style={{
        height: '100vw',
        width: '100',
      }}
    >
      <Row
        style={{
          padding: '30px',
          textAlign: 'center',
        }}
      >
        <h1>Meme Generator </h1>
      </Row>

      <Row>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '300px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <p>
              Choose a background image, then enter your text for the top and
              for the bottom of the meme and click the download button to
              generate your personalized meme
            </p>
          </div>
          <SelectButton
            selectedOption={selectedOption}
            onMemeSelect={handleMemeSelect}
          />
          <Input
            value={topTextInput}
            onChange={handleInputChange(setTopTextInput)}
          />

          <Input
            value={bottomTextInput}
            onChange={handleInputChange(setBottomTextInput)}
          />

          <Button onClick={handleDownload}>Download Meme</Button>
        </Col>

        <Col>
          <div>
            {currentMemeUrl && (
              <img
                data-test-id="meme-image"
                src={currentMemeUrl}
                alt="Custom Meme"
                style={{
                  maxWidth: '400px',
                  maxHeight: '400px',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
