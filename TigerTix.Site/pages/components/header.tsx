import Head from "next/head";
import { ReactNode } from "react";

export interface HeaderProps {
    title: string;
    description: string;
    children?: ReactNode
}; 

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <>
            <Head>
                <title>{ props.title } | TigerTix</title>
                <meta
                    name="description"
                    content={props.description}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="w-full h-24 bg-gradient-to-r from-orange to-blood rounded-b-md flex items-center justify-start">
                <h1 className="text-4xl italic bold text-white text-opacity-90 pl-6">
                    TigerTix
                </h1>
                { props.children }
                <a
                    href="/user"
                    className="login ml-auto mr-4 flex text-white hover:bg-black hover:bg-opacity-20 p-3 px-6 rounded-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-white">Brendan McGuire</p>
                </a>
            </header>
        </>
    );
};

export default Header;
