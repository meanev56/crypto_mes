import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { fetchChartData, fetchCoinData } from '../api/coinGecko';

export const CoinDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCoinData();
        loadChartData();
      }, [id]);

    const loadCoinData = async () => {
        try {
          const data = await fetchCoinData(id);
          setCoin(data);
        } catch (err) {
          console.error("Error fetching crypto: ", err);
        } finally {
          setIsLoading(false);
        }
      };
      
    const loadChartData = async () => {
        try {
          const data = await fetchChartData(id);
    
          const formattedData = data.prices.map((price) => ({
            time: new Date(price[0]).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price: price[1].toFixed(2),
          }));
    
          setChartData(formattedData);
        } catch (err) {
          console.error("Error fetching crypto: ", err);
        } finally {
          setIsLoading(false);
        }
      };

    if (isLoading) {
      return (
        <div className="app">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading coin data...</p>
          </div>
        </div>
      );
    }

    if (!coin) {
      return (
        <div className="app">
          <div className="no-results">
            <p>Coin not found</p>
            <button onClick={() => navigate("/")}>Go Back</button>
          </div>
        </div>
      );
    }

  return (
    <div className="app">
      <header className='header'>
        <div className="header-content">
          <div className='logo-section'>
            <h1>🚀 Crypto Tracker</h1>
            <p>Real-time cryptocurrency prices and market data</p>
          </div>

          <button>
            ← Back to List
          </button>
        </div>
      </header>

      <div className="coin-detail"  >
        <div className="coin-header">
          <div className="coin-title">
            <img src="" alt="" />
            <div>
              <h1>Coin Name</h1>
              <p className='symbol'>Coin Symbol</p>
            </div>
          </div>
          <span className='rank'>Rank #</span>
        </div>

        <div className="coin-price-section">
          <div className="current-price">
            <h2>Coin Market</h2>
            <span>Price</span>
          </div>

          <div className='price-ranges'>
            <div className="price-range">
              <span className='range-label'>24th High</span>
              <span className='range-value'>
                Price
              </span>
            </div>
            <div className='price-range'>
              <span className='range-label'>24th Low</span>
              <span className='range-value'>
                Price
              </span>
            </div>
          </div>
        </div>

        <div className='chart-section'>
          <h3>Price Chart (7 Days)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={[]}>
              <CartesianGrid 
                strokeDasharray="3 3"
                stroke='rgba(255, 255, 255, 0.1)'
              />

              <XAxis 
                dataKey="time"
                stroke='#9ca3af'
                style={{fontSize: '12px'}}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
                domain={["auto", "auto"]}
              />
              <Tooltip 
                 contentStyle={{
                  backgroundColor: "rgba(20, 20, 40, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#e0e0e0",
                }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#ADD8E6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">Market Cap</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Volume (24)</span>
            <span className="stat-value">Market Cap</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Circulating Supply</span>
            <span className="stat-value">Market Supply</span>
          </div>

          <div className="stat-card" >
            <span className="stat-label">Total Supply</span>
            <span className='stat-value'>Market Supply</span>
          </div>
        </div>
      </div>
      <footer className='footer'>
        <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
      </footer>
      
    </div>
  )
}
