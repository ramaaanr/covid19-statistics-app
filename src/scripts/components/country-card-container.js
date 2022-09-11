class CountryCardContainer extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    this._data = data;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        .card-container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-direction: row;
        }

        .card-item {
          border-radius: 15px;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
          min-width: 220px;
          height: 150px;
          margin: 10px 15px;
          background-color: #E8F9FD;
          border: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stats {
          font-size: 1.5rem;
          margin: 0;
        }

        .count {
          font-size: 1.5rem;
          margin: 0;
          font-weight: bold;
        }

        #country-confirmed {
          color: #007bff;
        }

        #country-deaths {
          color: #dc3545;
        }

        #country-recovered {
          color: #28a745;
        }

        .last-update {
          display: flex;
          justify-content: center;
        }

        @media only screen and (max-width: 768px) {
          .card-item {
            width: 40vw;
          }
        
          .card-container {
            flex-direction: column;
          }
        }
      
      </style>
       <div class="card-container">

        <div class="card card-item ">
          <div class="card-body ">
            <p class="stats ">Confirmed</p>
            <p class="count " id="country-confirmed">${this._data.confirmed}</p>
          </div>
        </div>

        <div class="card card-item ">
          <div class="card-body ">
            <p class="stats ">Recovered</p>
            <p class="count" id="country-recovered">${this._data.recovered}</p>
          </div>
        </div>

        <div class="card card-item ">
          <div class="card-body ">
            <p class="stats ">Deaths</p>
            <p class="count" id="country-deaths">${this._data.deaths}</p>
          </div>
        </div>
        
      </div>
      <p id="country-last-update" class="last-update">${this._data.lastUpdate}</p>
    `;
  }
}
customElements.define('country-card-container', CountryCardContainer);
