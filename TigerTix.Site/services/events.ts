
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

export async function getEvents(n: number) {
    try {
        return fetch(`https://localhost:7291/list?n=${n}`).then(
            (r) => r.json() as Promise<Event[]>
        );
    } catch (e) {
        console.error(e);
        return [];
    }
};
