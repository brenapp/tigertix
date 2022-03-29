import type { NextPage } from "next";
import { Container, Header } from "../../components";

const EventPage: NextPage<{ events: Event[] }> = ({ events }) => {
    return (
        <Container>
            <Header
                title="Events"
                description="A list of all events on Clemson's Campus!"
            />
            <main className="p-4 flex flex-col lg:flex-row"></main>
        </Container>
    );
};

export default EventPage;
