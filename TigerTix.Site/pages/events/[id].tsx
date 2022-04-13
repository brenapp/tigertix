import { CalendarIcon, CurrencyDollarIcon, GlobeAltIcon, LocationMarkerIcon, ShareIcon } from "@heroicons/react/solid";
import type { GetServerSideProps, NextPage } from "next";
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
                                <ShareIcon className="h-6 w-6 text-gray-700 mr-2" />
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
                            <CalendarIcon className="h-6 w-6" />
                            <span className="pl-2">
                                <p>{dateString}</p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <LocationMarkerIcon className="h-6 w-6"/>
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
                            <GlobeAltIcon className="h-6 w-6" />
                            <span className="pl-2">
                                <p>{event.capacity_remaining} tickets remain</p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <CurrencyDollarIcon className="h-6 w-6"/>
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
                        <p>{event.blocks[tab].description}</p>
                    </section>
                </section>
            </main>
        </Container>
    );
};

export default EventPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    // TODO: Get events from the database
    const events = await getEvents(1);
    const event = events[0];

    if (events.length < 1) {
        return { redirect: { destination: "/events", permanent: false } }
    }

    return { props: { event } };
}
