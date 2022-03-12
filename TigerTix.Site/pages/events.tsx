import type { NextPage } from "next";
import { Container, Header } from "./components";

const EventPage: NextPage = () => {
    return <Container>
        <Header title="Events" description="A list of all events on Clemson's Campus!" />
    </Container>;
};

export default EventPage;