
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

const shim = {
    id: 37474,
    title: "The Scrum Kings' Karaoke Night",
    start: "2022-04-03T19:14:59.86237-04:00",
    end: "2022-04-03T19:14:59.862379-04:00",
    capacity_total: 100,
    capacity_remaining: 100,
    registration_price: 5,
    description: "The Scrum Kings perform several songs by Billie Eilish.",
    image_hero: "https://i.picsum.photos/id/649/1500/500.jpg?hmac=SI_WcYv1QQbcJaD_8LkBfgutxK2nWgZwnM2g9WSTkhk",
    image_thumbnail: "https://picsum.photos/400/400",
    venue_description: "Barnes Center",
    venue_id: 383838,
    venue_address: "Cherry Rd, Clemson, SC 29631",
    blocks: [
        {
            title: "Health & Safety Policy",
            description: "Be safe out there!",
        },
        {
            title: "Refund Policy",
            description: "No refunds",
        },
    ],
};


export async function getEvents(n: number) {

    // shim 😎
    if (process.env.NODE_ENV === "production") {
        return new Array(n).fill(shim);
    };

    try {
        return fetch(`https://localhost:7291/list?n=${n}`).then(
            (r) => r.json() as Promise<Event[]>
        ).catch(e => []);
    } catch (e) {
        // console.error(e);
        return [];
    }
};






