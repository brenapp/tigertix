import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { Button, Container, Header } from "../../components";
import { getEvents, Event } from "../../services/events";

const EventPage: NextPage<{ event: Event }> = ({ event }) => {
    const dateString = new Date(event.start).toLocaleString();
    const [tab, setTab] = useState<number>(0);

    return (
        <Container>
            <Header
                title={event.title}
                description={event.description}
                className="md:rounded-b-md rounded-b-none"
            />
            <main className="md:px-4 ">
                <section className="pt-4 grid lg:grid-cols-6 lg:gap-4 grid-cols-1">
                    <section className="image relative mx-auto lg:col-span-4 w-full h-full rounded-md">
                        <Image
                            src={event.image_hero}
                            height={500}
                            width={1500}
                            className="md:rounded-md"
                        />
                        <nav className="quick-actions absolute top-4 right-4 bg-white rounded-md shadow-lg">
                            <Button
                                color="none"
                                onClick={() => {}}
                                className="flex items-center p-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    />
                                </svg>
                                Share
                            </Button>
                        </nav>
                    </section>
                    <section className="info bg-white rounded-md border-2 p-4 lg:col-span-2 md:m-0 m-2">
                        <h2 className="text-2xl font-bold text-gray-700">
                            {event.title}
                        </h2>
                        <p className="pt-2">{event.description}</p>
                        <div className="flex mt-4 mx-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="pl-2">
                                <p>{dateString}</p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span className="pl-2">
                                <p className="leading-tight italic">
                                    {event.venue_description}
                                </p>
                                <p className="leading-tight">
                                    {event.venue_address}
                                </p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                            </svg>
                            <span className="pl-2">
                                <p>{event.capacity_remaining} tickets remain</p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="pl-2">
                                <p>
                                    ${event.registration_price.toFixed(2)} per
                                    ticket
                                </p>
                            </span>
                        </div>
                        <div className="w-full mt-4 mx-2">
                            <Button
                                color="primary"
                                className="p-2 px-6 mt-2"
                                onClick={() => {}}
                            >
                                Register
                            </Button>
                        </div>
                    </section>
                </section>
                <section className="grid md:grid-cols-6">
                    <nav className="flex md:flex-col mx-2 md:ml-0 md:mt-2 col-span-1 bg-white p-2 rounded-md border-2 border-b-0 md:border-b-2 rounded-b-none md:rounded-b-md">
                        {event.blocks
                            .map((e) => e.title)
                            .map((e, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setTab(i);
                                    }}
                                    className={
                                        "p-2 px-4 border-2 mx-1 my-1 rounded-md cursor-pointer " +
                                        (tab == i
                                            ? "border-orange text-orange"
                                            : "")
                                    }
                                >
                                    {e}
                                </a>
                            ))}
                    </nav>
                    <section className="lg:col-span-5 bg-white md:mt-2 mt-0 border-2 rounded-md md:rounded-t-md rounded-t-none p-4 m-2">
                        <h1 className="text-lg">{event.blocks[tab].title}</h1>
                        <p>
                            {event.blocks[tab].description}
                        </p>
                    </section>
                </section>
            </main>
        </Container>
    );
};

export default EventPage;

export async function getServerSideProps() {
    // TODO: Get events from the database
    const events = await getEvents(1);
    const event = events[0];

    return { props: { event } };
}
