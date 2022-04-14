import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Header, Container, EventPreview } from "../components";
import { Event, getEvents } from "../services/events";
import { ArrowRightIcon } from "@heroicons/react/solid";

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
                                <ArrowRightIcon className="h-6 w-6 group-hover:ml-3 ml-2 transition-all" />
                            </a>
                        </Link>
                    </h1>
                    <div className="mt-4">
                        {events.map((event) => (
                            <EventPreview
                                key={event.id}
                                event={event}
                                className="bg-inherit border-0 lg:ml-0"
                            />
                        ))}
                    </div>
                    <section className="mt-2">
                        <p>Have an event of your own? Post it to TigerTix to increase its visibility, and unlock event management tools!</p>
                        <Link href="/events/create">
                            <a className="with-icon group italic text-orange">
                                Post An Event
                                <ArrowRightIcon className="h-4 w-4 group-hover:ml-3 ml-2 transition-all" />
                            </a>
                        </Link>
                    </section>
                </section>
                <section className="venues mx-4 mt-12">
                    <h1 className="text-2xl with-icon">
                        <Link href="/venues">
                            <a className="with-icon group hover:text-orange">
                                Venues
                                <ArrowRightIcon className="h-6 w-6 group-hover:ml-3 ml-2 transition-all" />
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
