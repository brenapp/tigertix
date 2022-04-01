import { MouseEventHandler } from "react";

export interface ButtonProps {
    color: "primary" | "none";
    className?: string;
    onClick: MouseEventHandler;
};

const Button: React.FC<ButtonProps> = ({ className, children, onClick, color }) => {

    const bg = {
        "primary": "bg-orange hover:bg-opacity-80 active:bg-blood text-white ",
        "none": "bg-transparent hover:bg-opacity-80 active:bg-gray-200"
    };

    return (
        <button className={`${bg[color]} rounded-md text-lg ` + className} onClick={onClick}>
            { children }
        </button>
    );
};

export default Button;