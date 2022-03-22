import type { NextPage } from "next";
import { useState } from "react";
import { Button, Container, Header, Loading, EventPreview } from "../components";
import { getEvents, Event } from "../services/events";

const EventsList: React.FC<{ data: Event[] }> = ({ data }) => {
    return <>{data.map(event => <EventPreview key={event.id} event={event} />)}</>;
};

const EventsListError: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-lg">Could not load events list!</h1>
        </div>
    );
};

const EventPage: NextPage<{ events: Event[] }> = ({ events }) => {
    const [data, setData] = useState(Promise.resolve(events));
    const [num, setNum] = useState(5);

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
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Venue</p>
                        <select
                            placeholder="Venue"
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
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
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Before</p>
                        <input
                            placeholder="Event Name..."
                            type="date"
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Number of Events</p>
                        <input
                            placeholder="Number"
                            type="number"
                            value={num}
                            onChange={(e) => setNum(parseInt(e.target.value))}
                            className="form-select w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <Button
                        color="primary"
                        onClick={() => setData(getEvents(num))}
                        className="w-full"
                    >
                        Filter
                    </Button>
                </section>
                <section className="events flex-1">
                    <Loading render={EventsList} promise={data} />
                </section>
            </main>
        </Container>
    );
};

export default EventPage;

export async function getServerSideProps() {

    const events = await getEvents(5);

    return { props: { events } }
};
