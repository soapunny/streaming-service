import { useEffect, useState } from "react";

interface Coin {
    ask: string;
    bid: string;
    change_24_hour: string;
    high: string;
    last_price: string;
    low: string;
    market: string;
    timestamp: number;
    volume: string;
}

export const CryptoTracker = () => {

    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [amount, setAmount] = useState<Number | "">("");
    const [coinCount, setCoinCount] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState("");

    useEffect(() => {
        fetch("https://api.coindcx.com/exchange/ticker")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCoins(data);
                setLoading(false);
            });
    }, []);

    const handleInputMinor = (amount: string) => {
        return Math.round(Number(amount) * 100000000) / 100000000;
    };

    const CryptoList = () => {
        return (
            <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
                <option value={"0"}>Select Crypto</option>
                {coins.map((coin: Coin) => (
                    <option key={coin.market} value={coin.last_price}>{coin.market} : ${handleInputMinor(coin.last_price)}</option>
                ))}
            </select>
        );
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(Number(amount) <= 0) {
            alert("Value must be bigger than 0");
            return;
        }
        setCoinCount(Math.floor(Number(amount)/Number(selectedCoin)*100)/100);

    }

    const OnChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    }
    

    return (
        <div>
            <h1>Crypto Tracker ({coins.length})</h1>
            <hr/>
            {loading ? <strong>Loading...</strong> : <CryptoList/>}
            <form onSubmit={onSubmit}>
                $<input type="number" value={Number(amount)} onChange={(e) => OnChangeAmount(e)} placeholder="Enter money you want to invest"/>
                <button type="submit">Enter</button>
                <br/>
                <p>You can buy: {coinCount} coins</p>
            </form>
        </div>
    );
}

export default CryptoTracker;