import { MouseEventHandler } from "react";

export interface ButtonProps {
    color: "primary";
    className?: string;
    onClick: MouseEventHandler;
};

const Button: React.FC<ButtonProps> = ({ className, children, onClick, color }) => {

    const bg = {
        "primary": "bg-orange hover:bg-opacity-80 active:bg-blood"
    };

    return (
        <button className={`${bg[color]} p-2 mt-4 rounded-md text-white text-lg ` + className} onClick={onClick}>
            { children }
        </button>
    );
};

export default Button;