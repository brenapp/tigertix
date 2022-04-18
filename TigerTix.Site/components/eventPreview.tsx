import { ArrowRightIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../services/events";


const EventPreview: React.FC<{ event: Event, className?: string }> = ({ event, className }) => {
    const start = new Date(event.start).toLocaleDateString();

    return (
        <div className={"my-4 last:mb-0 p-4 lg:mt-0 lg:ml-3 pl-0 flex items-center md:h-28 h-36 bg-white rounded-md border-2 " + className}>
            <div className="h-full aspect-square ml-4 mr-6">
                <Image
                    src={event.image_thumbnail}
                    height={400}
                    width={400}
                    className="rounded-md"
                    alt={event.description}
                />
            </div>
            <div>
                <Link href={`/events/${event.id}`}>
                    <a className="flex items-center group text-orange hover:text-blood">
                        {event.title}
                        <ArrowRightIcon className="h-4 w-4 group-hover:ml-3 ml-2 transition-all"/>
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