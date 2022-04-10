import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Header, Container, EventPreview } from "../components";
import { Event, getEvents } from "../services/events"; 


const Home: NextPage<{ events: Event[] }> = ({ events }) => {
    return (
        <Container>
            <Header
                title="Home"
                description="TigerTIX is a site to help find events on Clemson's campus!"
            />
            <main className={"container mx-auto md:p-2 " + styles.main}>
                <section className="events mx-4 mt-4">
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
                        {events.map((event) => <EventPreview key={event.id} event={event} className="bg-inherit border-0 lg:ml-0" />)}
                    </div>
                </section>
                <section className="venues mx-4 mt-12">
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
                    <div className="venues grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-4 gap-y-4 mt-4 md:px-0">
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

export async function getServerSideProps() {
    const events = await getEvents(3);

    return { props: { events } };
}
