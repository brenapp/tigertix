import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Header, Loading } from "../components";

export interface Event {
    id: number;
    title: string;
    start: string;
    end: string;
    capacity_total: number;
    capacity_remaining: number;
    registration_price: number;
    description: string;
    image_hero: string;
    image_thumbnail: string;
    venue_description: string;
    venue_id: number;
    venue_address: string;
    blocks: {
        title: string;
        description: string;
    }[];
}

const EventsList: React.FC<{ data: Event[] }> = ({ data }) => {
    const render = (event: Event) => {

        const start = new Date(event.start).toLocaleDateString();

        return (
            <div className="my-4 last:mb-0 p-4 lg:mt-0 lg:ml-3 pl-0 flex items-center h-28 bg-white rounded-md border-2">
                <div className="h-full aspect-square ml-4 mr-6">
                    <Image
                        src={event.image_thumbnail}
                        height={400}
                        width={400}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <Link href="/events">
                        <a className="flex items-center group text-orange hover:text-blood">
                            {event.title}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 group-hover:ml-3 ml-2 transition-all"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </a>
                    </Link>
                    <h5 className="italic">{event.description}</h5>
                    <div className="tags flex">
                        <p className="text-sm bg-slate-200 p-1 px-3 my-2 mr-2 rounded-lg">
                            {event.venue_description}
                        </p>
                        <p className="text-sm bg-slate-200 p-1 px-3 my-2 mr-2 rounded-lg">
                            {start}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return <>{data.map(render)}</>;
};

const EventsListError: React.FC = () => {
    return <p>Something went wrong!</p>;
};

const EventPage: NextPage = () => {
    const data = fetch("https://localhost:7291/list").then(
        (r) => r.json() as Promise<Event[]>
    );

    return (
        <Container>
            <Header
                title="Events"
                description="A list of all events on Clemson's Campus!"
            />
            <main className="p-4 flex flex-col lg:flex-row">
                <section className="filter flex flex-col lg:items-center py-4 lg:py-2 px-4 rounded-lg bg-white border-2">
                <label className="font-bold mb-4 w-full">
                        <p>Event Name</p>
                        <input
                            placeholder="Event Name..."
                            type="text"
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange  focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Venue</p>
                        <select
                            placeholder="Venue"
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange  focus:outline-none"
                        >
                            <option value="hsc">Hendrix Student Center</option>
                            <option value="hsc">Barnes Center</option>
                            <option value="hsc">Littlejohn Coliseum</option>
                        </select>
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>After</p>
                        <input
                            placeholder="Event Name..."
                            type="date"
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange  focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Before</p>
                        <input
                            placeholder="Event Name..."
                            type="date"
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange  focus:outline-none"
                        />
                    </label>
                    <Button color="primary" onClick={() => {}} className="w-full">Filter</Button>
                </section>
                <section className="events flex-1">
                    <Loading render={EventsList} promise={data} />
                </section>
            </main>
        </Container>
    );
};

export default EventPage;
