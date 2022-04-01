import Head from "next/head";
import { ReactNode } from "react";


const Container: React.FC<{ className?: string }> = ({ children, className }) => {
    return (
        <div className={"min-h-screen bg-gray-50 relative overflow-hidden " + className}>
            { children }
        </div>
    );
};

export default Container;
