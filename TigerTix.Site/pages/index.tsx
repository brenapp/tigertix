import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Header, Container } from "./components";

const Home: NextPage = () => {

    return (
        <Container>
            <Header title="Home" description="TigerTIX is a site to help find events on Clemson's campus!" />
            <main className={"container mx-auto p-2 " + styles.main}>
                <section className="events ml-4 mt-4">
                    <h1 className="text-2xl with-icon hover:text-orange">
                        <Link href="/events">
                            <a className="with-icon group">
                                What&apos;s Happening
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 group-hover:ml-3 ml-2 transition-all"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </h1>
                    <div className="mt-4">
                        <div className="event mt-4 flex items-center">
                            <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
                            <div className="text ml-4">
                                <h3 className="text-lg text-orange">
                                    Trivia Night
                                </h3>
                                <h6 className="text-base">
                                    Thu Mar 10 at 10 PM - Barnes Center
                                </h6>
                            </div>
                        </div>
                        <div className="event mt-4 flex items-center">
                            <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
                            <div className="text ml-4">
                                <h3 className="text-lg text-orange">
                                    Basketball vs. NC State
                                </h3>
                                <h6 className="text-base">
                                    Tue Mar 8 at 10 PM - Littlejohn Coliseum
                                </h6>
                            </div>
                        </div>
                        <div className="event mt-4 flex items-center">
                            <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
                            <div className="text ml-4">
                                <h3 className="text-lg text-orange">
                                    Tigertown Throwdown Robotics Tournament
                                </h3>
                                <h6 className="text-base">
                                    Sat Feb 5 at 8 AM - Hendrix Student Center
                                </h6>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="venues ml-4 mt-12">
                    <h1 className="text-2xl with-icon">
                        <Link href="/venues">
                            <a className="with-icon group hover:text-orange">
                                Venues
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 group-hover:ml-3 ml-2 transition-all"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </h1>
                    <div className="venues grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                        <div className="bg-gray-300 animate-pulse h-36 rounded-md grid content-center text-center text-lg">
                            <h1>Venue Name</h1>
                        </div>
                    </div>
                </section>
            </main>
        </Container>
    );
};

export default Home;
