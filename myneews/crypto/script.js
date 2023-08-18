async function getCrypto(){
    const res = await (await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false")).json()
    res.slice(0, 50).forEach(coin => {
    //    console.log(coin)
         addCrypto(coin);
    });
}
document.addEventListener("DOMContentLoaded", getCrypto);

function addCrypto(coin){
    let increase = coin.price_change_percentage_24h > 0 ? "green" : "red";
    let changeIcon = coin.price_change_percentage_24h > 0 ? "positive" : "negative";
   const coinDiv= document.createElement("div");
   coinDiv.classList.add("item", "flex" ,"justify-between", "items-center");
   coinDiv.innerHTML=`
        <div class="left flex justify-between items-center gap-x-3">
            <img src=${coin.image}
            alt="" class="h-11 w-11 rounded-full p-2">
            <div>
                <p class="crypto-name text-base font-bold">${coin.name}</p>
                <p class="crypto-abbr text-gray-400">${coin.symbol.toUpperCase()}</p>
            </div>
        </div>
        <div class="text-right ">
            <p class="crypto-cost text-gray-700 font-semibold text-base">$${coin.current_price}</p>
            <p class="crypto-increase text-${increase}-500">
                <i class="fas fa-triangle fa-xs align-middle ${changeIcon}-inc"></i>
                ${(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
        </div>
   `;
   document.querySelector(".items").appendChild(coinDiv);
}