import Head from "next/head";
import { ReactNode, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { UserAddIcon, UserCircleIcon } from "@heroicons/react/solid";

export interface HeaderProps {
    title: string;
    description: string;
    children?: ReactNode;
    background?: boolean;
    className?: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { user, error, isLoading } = useUser();

    // Component to display when logging in
    const Login: React.FC = () => (
        <Link href="/api/auth/login">
            <a className="login ml-auto mr-4 flex text-white hover:bg-black hover:bg-opacity-20 p-3 px-6 rounded-sm">
                <UserCircleIcon className="h-6 w-6 mr-2" />
                <p className="text-white">Login</p>
            </a>
        </Link>
    );

    // Component to display when user is logged in
    const ManageAccount: React.FC<{ profile: UserProfile }> = ({ profile }) => {
        const [dropDownOpen, setDropDownOpen] = useState(false);

        return (
            <div className="relative inline-block text-left ml-auto mr-4 text-white hover:bg-black hover:bg-opacity-20 p-3 px-6 rounded-sm z-50">
                <a
                    className="flex cursor-pointer"
                    onClick={() => setDropDownOpen((open) => !open)}
                >
                    <UserCircleIcon className="h-6 w-6 mr-2" />
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
                            {
                                <Link href="/profile">
                                    <a
                                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="menu-item-3"
                                    >
                                        Account settings
                                    </a>
                                </Link>
                            }
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

    const background =
        props.background !== false
            ? "bg-gradient-to-r from-orange to-blood"
            : "";

    return (
        <>
            <Head>
                <title>{props.title} | TigerTix</title>
                <meta name="description" content={props.description} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://tigertix.bren.app" />
                <meta
                    name="twitter:title"
                    content={props.title + " | TigerTix"}
                />
                <meta name="twitter:description" content={props.description} />
                <meta
                    name="twitter:image"
                    content="https://tigertix.bren.app/icons/icon-192x192.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="TigerTix" />
                <meta property="og:description" content={props.description} />
                <meta property="og:site_name" content="TigerTix" />
                <meta property="og:url" content="https://tigertix.bren.app" />
                <meta
                    property="og:image"
                    content="https://tigertix.bren.app/icons/icon-192x192x.png"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header
                className={
                    `w-full h-24 ${background} rounded-b-md flex items-center justify-start ` +
                    props.className
                }
            >
                <Link href={"/"} passHref>
                    <h1 className="text-4xl italic bold text-white text-opacity-90 pl-6 cursor-pointer">
                        TigerTix
                    </h1>
                </Link>
                {props.children}
                {user ? <ManageAccount profile={user} /> : <Login />}
            </header>
        </>
    );
};

export default Header;
