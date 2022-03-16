import type { NextPage } from "next";
import { Container, Header } from "../components";

const EventPage: NextPage = () => {
    return (
        <Container>
            <Header
                title="Events"
                description="A list of all events on Clemson's Campus!"
            />
            <main className="p-4">
                <section className="filter flex items-center px-4 w-full h-16 rounded-lg bg-white shadow-md">
                    <h1 className="font-bold mr-2">Filter</h1>
                    <select
                        placeholder="Venue"
                        className="form-select px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange  focus:outline-none"
                    >
                        <option value="hsc">Hendrix Student Center</option>
                        <option value="hsc">Barnes Center</option>
                        <option value="hsc">Littlejohn Coliseum</option>
                    </select>
                    <select
                        placeholder="Venue"
                        className="form-select px-3 mx-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange  focus:outline-none"
                    >
                        <option value="hsc">Hendrix Student Center</option>
                        <option value="hsc">Barnes Center</option>
                        <option value="hsc">Littlejohn Coliseum</option>
                    </select>
                </section>
            </main>
        </Container>
    );
};

export default EventPage;
