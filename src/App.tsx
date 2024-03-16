import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getLastBlockNumber, getUSDTBalance } from "con3xetherfunc";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./assets/styles/spinner.css";

const Defaul_USDT_CONTRACT_ADDRESS =
  "0xdac17f958d2ee523a2206206994597c13d831ec7";

const App: React.FC = () => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [address, setAddress] = useState<string>(Defaul_USDT_CONTRACT_ADDRESS); // Set the default value here
  const [USDTBalance, setUSDTBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // Timeout duration in milliseconds (e.g., 5000 = 5 seconds)

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  const handleLastBlockClick = async () => {
    setLoading(true);
    setError(null);
    setBlockNumber(null); // Clear blockNumber
    try {
      const lastBlock = await getLastBlockNumber();
      setBlockNumber(lastBlock);
    } catch (error) {
      setError("Failed to fetch last block number");
    } finally {
      setLoading(false);
    }
  };

  const handleUSDTBalanceClick = async () => {
    setLoading(true);
    setError(null);
    setUSDTBalance(null); // Clear USDTBalance
    try {
      const balance = await getUSDTBalance(address);
      setUSDTBalance(balance);
    } catch (error) {
      setError("Failed to fetch USDT balance");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };
  return (
    <Container>
      <h1 className="mt-4">Ethereum App</h1>
      {loading && (
        <div className="overlay">
          <Spinner
            animation="border"
            role="status"
            size="sm"
            className="spinner"
            data-testid="loading-spinner"
          />
        </div>
      )}
      {error && (
        <Alert
          variant="danger"
          className="mt-4"
          dismissible
          onClose={handleCloseError}
        >
          {error}
        </Alert>
      )}
      <Button
        variant="primary"
        onClick={handleLastBlockClick}
        className="mt-4"
        disabled={loading}
        data-testid="blockNumberButton"
      >
        Get Last Block Number
      </Button>
      {blockNumber && <p data-testid="blockNumber">Result: {blockNumber}</p>}
      <Form.Group className="mt-4">
        <Form.Label>Address</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
          <InputGroup.Text>
            <Button
              variant="primary"
              onClick={handleUSDTBalanceClick}
              disabled={loading}
            >
              Get USDT Balance
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      {USDTBalance && (
        <p data-testid="USDTBalance">USDT Balance: {USDTBalance}</p>
      )}
    </Container>
  );
};

export default App;
