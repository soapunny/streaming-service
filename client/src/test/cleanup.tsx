import { useEffect, useState } from "react";

const Title = () => {
    useEffect(() => {
        console.log("Component created.."); // 마운트 시 출력
        return () => console.log("Component destoryed..");// 언마운트 시 출력
    }, []);
    
    return <h1>Title Component</h1>
}

export const CleanupTest = () => {
    const [show, setShow] = useState(false);

    const toggle = () => setShow(prev => !prev);
    
    return (
        <div>
            <button onClick={toggle}>{show ? "Hide" : "Show"}</button>
            {show && <Title />}
        </div>
    );

}

export default CleanupTest;