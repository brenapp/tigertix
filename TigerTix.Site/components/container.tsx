import Head from "next/head";
import { ReactNode } from "react";


const Container: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            { children }
        </div>
    );
};

export default Container;
