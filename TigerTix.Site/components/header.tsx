import Head from "next/head";
import { ReactNode, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export interface HeaderProps {
    title: string;
    description: string;
    children?: ReactNode;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { user, error, isLoading } = useUser();

    // Component to display when logging in
    const Login: React.FC = () => (
        <Link href="/api/auth/login">
            <a className="login ml-auto mr-4 flex text-white hover:bg-black hover:bg-opacity-20 p-3 px-6 rounded-sm">
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
                <p className="text-white">Login</p>
            </a>
        </Link>
    );

    // Component to display when user is logged in
    const ManageAccount: React.FC<{ profile: UserProfile }> = ({ profile }) => {
        const [dropDownOpen, setDropDownOpen] = useState(false);

        return (
            <div className="relative inline-block text-left ml-auto mr-4 text-white hover:bg-black hover:bg-opacity-20 p-3 px-6 rounded-sm">
                <a
                    className="flex cursor-pointer"
                    onClick={() => setDropDownOpen((open) => !open)}
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
                    <p className="text-white">
                        {profile.name ?? profile.nickname}
                    </p>
                </a>
                {dropDownOpen ? (
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={1}
                    >
                        <div className="py-1" role="none">
                            {/* <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                            >
                                Account settings
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-1"
                            >
                                Support
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-2"
                            >
                                License
                            </a> */}
                            <Link href={"/api/auth/logout"}>
                                <a
                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                    tabIndex={-1}
                                    id="menu-item-3"
                                >
                                    Sign Out
                                </a>
                            </Link>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>{props.title} | TigerTix</title>
                <meta name="description" content={props.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="w-full h-24 bg-gradient-to-r from-orange to-blood rounded-b-md flex items-center justify-start">
                <h1 className="text-4xl italic bold text-white text-opacity-90 pl-6">
                    TigerTix
                </h1>
                {props.children}
                {user ? <ManageAccount profile={user} /> : <Login />}
            </header>
        </>
    );
};

export default Header;
