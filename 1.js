const url1 = "https://fapi.binance.com/fapi/v1/ticker/24hr";

setInterval(() => {
    fetch(url1)
        .then(res => res.json())
        .then(data => {
            let table = document.querySelector('#table');
            let negativeCount = 0; // Variable to count negative numbers            
            let upCount = 0; // Variable to count negative numbers            

            table.innerHTML = '';

            let btc = document.createElement('tr');   //first trHeader
            let btcSymbol = document.createElement('th');
            let btcPrice = document.createElement('th');
            let btcPercent = document.createElement('th');

            let dataitem = data.filter(ww => ww.symbol === 'BTCUSDT');
            btcSymbol.textContent = dataitem[0].symbol;
            btcPrice.textContent = parseFloat(dataitem[0].lastPrice);
            btcPercent.textContent = (parseFloat(dataitem[0].priceChangePercent)).toFixed(2);

            if (btcPercent.textContent > 0) {
                btcPercent.style.background = 'rgb(120, 247, 139)';
            } else {
                btcPercent.style.background = 'rgb(253, 64, 64)';
                btcPercent.style.color = 'white';
            }

            let trHeader = document.createElement('tr'); //second trHeader
            let thSymbol = document.createElement('th');
            thSymbol.classList.add('thSymbol');
            let thPrice = document.createElement('th');
            thPrice.classList.add('price');
            let thPercent = document.createElement('th');
            thPercent.classList.add('percent');
            thSymbol.textContent = 'Symbol';
            thPrice.textContent = 'Price';

            btc.appendChild(btcSymbol)
            btc.appendChild(btcPrice)
            btc.appendChild(btcPercent)
            trHeader.appendChild(thSymbol);
            trHeader.appendChild(thPrice);
            trHeader.appendChild(thPercent);
            table.appendChild(btc);
            table.appendChild(trHeader);

            data.sort((a, b) => {                      // sort to min persent
                if (+a.priceChangePercent < +b.priceChangePercent) return -1;
                return 0;
            });

            data.forEach(item => {
                if (item.symbol.endsWith('USDT')) {  // sort by usd ticket
                    let tr = document.createElement('tr');
                    let symbol = item.symbol;
                    let price = parseFloat(item.lastPrice);
                    let percent = parseFloat(item.priceChangePercent);

                    let tdSymbol = document.createElement('td');
                    let tdPrice = document.createElement('td');
                    let tdPercent = document.createElement('td');
                    tdSymbol.textContent = symbol;
                    tdPrice.textContent = price.toFixed(4);
                    tdPercent.textContent = percent.toFixed(2);

                    if (percent > 0) {  // sort by color
                        tdPercent.style.background = 'rgb(120, 247, 139)';
                        tdPercent.style.color = "black";
                        upCount++;
                    } else if (percent < 0) {
                        tdPercent.style.background = 'rgb(253, 64, 64)';
                        tdPercent.style.color = 'white';
                        negativeCount++; // Increment count for negative numbers
                    }

                    tr.appendChild(tdSymbol);
                    tr.appendChild(tdPrice);
                    tr.appendChild(tdPercent);
                    table.appendChild(tr);
                }
            });

            let percentTicket = (((negativeCount + upCount) / 1000) * negativeCount);
            let spanElement = document.createElement('span');
            spanElement.style.color = '#f45e5e';
            spanElement.textContent = percentTicket.toFixed(0) + '%';
            thPercent.innerHTML = '%' + ' ' + '24hr' + ' ' + '-' + ' ' + spanElement.outerHTML;

            document.querySelector('.thSymbol').addEventListener('click', () => {
                let table = document.querySelector('#table');
                let rows = Array.from(table.querySelectorAll('tr'));

                rows.sort((a, b) => {
                    let tdA = a.querySelector('td');
                    let tdB = b.querySelector('td');
                    let symbolA = tdA ? tdA.textContent : '';
                    let symbolB = tdB ? tdB.textContent : '';
                    return symbolA.localeCompare(symbolB);
                });

                table.innerHTML = '';
                table.appendChild(trHeader); // Re-add the header row
                rows.forEach(row => table.appendChild(row));
            });

            
        })
        .catch(err => {
            console.log(err);
        });
}, 5000);