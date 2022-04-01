import Image from "next/image";
import Link from "next/link";
import { Event } from "../services/events";


const EventPreview: React.FC<{ event: Event, className?: string }> = ({ event, className }) => {
    const start = new Date(event.start).toLocaleDateString();

    return (
        <div className={"my-4 last:mb-0 p-4 lg:mt-0 lg:ml-3 pl-0 flex items-center h-28 bg-white rounded-md border-2 " + className}>
            <div className="h-full aspect-square ml-4 mr-6">
                <Image
                    src={event.image_thumbnail}
                    height={400}
                    width={400}
                    className="rounded-md"
                />
            </div>
            <div>
                <Link href={`/events/${event.id}`}>
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

export default EventPreview;