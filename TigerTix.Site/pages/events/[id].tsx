import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import {
    Button,
    Container,
    Header,
    Loading,
    EventPreview,
} from "../../components";
import { getEvents, Event } from "../../services/events";

const EventsListError: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-lg">Could not load events list!</h1>
        </div>
    );
};

const EventPage: NextPage<{ event: Event }> = ({ event }) => {
    return (
        <Container>
            <Header title={event.title} description={event.description} />
            <main className="p-4 pt-12 container mx-auto">
                
                <section className="image mt-4 relative">
                    <Image
                        src={event.image_hero}
                        width={1500}
                        height={500}
                        layout="responsive"
                        className="rounded-md"
                    />
                    <nav className="quick-actions absolute top-4 right-4 bg-white rounded-md shadow-lg">
                        <Button color="none" onClick={() => {}} className="flex items-center p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                            Share
                        </Button>
                    </nav>
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
