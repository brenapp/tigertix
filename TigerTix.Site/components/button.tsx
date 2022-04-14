import { MouseEventHandler, TouchEventHandler } from "react";

export interface ButtonProps {
    color: "primary" | "none";
    className?: string;
    onClick?: MouseEventHandler;
    onMouseDown?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    onTouchStart?: TouchEventHandler;
    onTouchEnd?: TouchEventHandler;
    onTouchCancel?: TouchEventHandler;
}

const Button: React.FC<ButtonProps> = ({
    className,
    children,
    onClick,
    color,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
}) => {
    const bg = {
        primary: "bg-orange hover:bg-opacity-80 active:bg-blood text-white ",
        none: "bg-transparent hover:bg-opacity-80 active:bg-gray-200",
    };

    return (
        <button
            className={`${bg[color]} rounded-md text-lg ` + className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
        >
            {children}
        </button>
    );
};

export default Button;
