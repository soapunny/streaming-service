// client/src/components/Button.tsx

import "@/global.css";

export const Button = ({label, onClick}: {label: string, onClick: ()=> void}) => {
    return (
        <button className="button" onClick={onClick}>{label}</button>
    );
}

export default Button;