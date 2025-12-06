import React from 'react'

export default function CoinDetail() {
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

        </div>
      </div>
      
    </div>
  )
}
