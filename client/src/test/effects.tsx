// client/src/test/effects.tsx

import { useState, useEffect, useCallback } from "react";

export const EffectsTest = () => {
    const CLAP_IMOJI = "👋";
    
    const [count, setCount] = useState(0);
    const [claps, setClaps] = useState(false);

    useEffect(() => {
        console.log("effects.tsx rendered...");
    }, []);//최초 로드시 한번만 실행

    const addClap = () => {
        console.log("clap : ", CLAP_IMOJI);
    };

    useEffect(() => {
        if(claps) {
            addClap();
            setClaps(false);
        }
    }, [claps]);//claps가 바뀔때마다 실행

    useEffect(() => {
        console.log("render when count or claps changed")
    }, [count, claps])//count 또는 claps가 바뀔 때마다 실행

    //useCallback은 자식 컴포넌트 함수를 props로 넘길 때만 사용
    const countUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const currCount = count + 1;
        setCount(currCount);
        if(currCount % 5 === 0) setClaps(true);
        else console.log(currCount);
    }, [count]);

    return (// 자식 컴포넌트에 함수 *countUp*을 props로 넘김(return)
        <div>
            <p>{count}</p>
            <button onClick={(e) => countUp(e)}>Increment</button>
        </div>
    );

}

export default EffectsTest;