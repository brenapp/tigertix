import type { NextPage } from "next";
import Link from "next/link";
import { Header, Container, Button } from "../../components";
import { Event, shim } from "../../services/events";
import {
    ArrowRightIcon,
    BeakerIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    LocationMarkerIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const EventCreatePrecursor = ({ onClick }: { onClick: () => void }) => {
    return (
        <Container className="container mx-auto md:p-2">
            <h1 className="text-2xl">Create An Event</h1>
            <p className="mt-2">
                To get started, we will ask you some details about your event.
                Once you have the event posted, you can view or manage it on the
                admin page. Additionally, you will be able to download a list of
                registrations for your own purposes.
            </p>
            <Button
                color="primary"
                className="p-1 px-6 mt-4 flex items-center"
                onClick={onClick}
            >
                Next
                <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
        </Container>
    );
};

const EventCreateForm = () => {
    const [event, setEvent] = useState<Event>(shim);
    const dateString = new Date(event.start).toLocaleString();

    return (
        <section className="create grid lg:grid-cols-3 gap-2 mt-4">
            <section className="bg-white rounded-md border-2 px-4 py-2 col-span-2">
                <h2 className="text-orange text-lg italic">Basic Details</h2>

                <div className="form-group grid lg:grid-cols-3 lg:gap-2 col-span-2">
                    <label className="font-bold mb-4 w-full">
                        <p>Event Name</p>
                        <input
                            placeholder="Event Name..."
                            type="text"
                            value={event.title}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Start</p>
                        <input
                            placeholder="Start"
                            type="datetime-local"
                            value={event.start}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    start: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>End</p>
                        <input
                            placeholder="End"
                            type="datetime-local"
                            value={event.end}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    end: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                </div>

                <div className="form-group grid lg:grid-cols-3 lg:gap-2 col-span-2">
                    <label className="font-bold mb-4 w-full">
                        <p>Venue</p>
                        <select
                            placeholder="Venue"
                            style={{ height: 40 }}
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        >
                            <option value="hsc">Hendrix Student Center</option>
                            <option value="hsc">Barnes Center</option>
                            <option value="hsc">Littlejohn Coliseum</option>
                        </select>
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Venue Description</p>
                        <input
                            placeholder="Hendrix 2nd Floor"
                            type="text"
                            value={event.venue_description}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    venue_description: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Address</p>
                        <input
                            placeholder="24 Wallaby Way, Sydney"
                            type="text"
                            value={event.venue_address}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    venue_address: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                </div>
                <div className="form-group grid lg:grid-cols-3 lg:gap-2 col-span-2">
                    <label className="font-bold mb-4 w-full">
                        <p>Registration Price</p>
                        <CurrencyInput
                            placeholder="5.00"
                            // prefix="$"
                            value={event.registration_price || 0}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    registration_price: Number.parseFloat(
                                        e.target.value
                                    ),
                                }))
                            }
                            className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    <label className="font-bold mb-4 w-full">
                        <p>Capacity</p>
                        <input
                            placeholder="100 spots"
                            type="number"
                            value={event.capacity_total}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    capacity_total: Number.parseInt(
                                        e.target.value
                                    ),
                                    capacity_remaining: Number.parseInt(
                                        e.target.value
                                    ),
                                }))
                            }
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                </div>
                <div className="form-group grid lg:grid-cols-3 lg:gap-2 col-span-2">
                    <label className="font-bold mb-4 w-full col-span-2">
                        <p>Event Description</p>
                        <textarea
                            value={event.description}
                            onChange={(e) =>
                                setEvent((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            className="border-2 rounded-md w-full h-24 p-2 outline-orange"
                        ></textarea>
                    </label>
                    <p className="lg:mt-6 ml-2 italic text-sm">The event description should be a brief, one-sentence overview of your event. You can enter more information in the content blocks below. </p>
                </div>
            </section>
            <section className="preview lg:col-span-1 col-span-2">
                <section className="grid grid-cols-1">
                    <section className="image relative mx-auto w-full h-full rounded-md">
                        <Image
                            src={event.image_hero}
                            height={500}
                            width={1500}
                            className="rounded-md"
                        />
                        <nav className="quick-actions absolute top-4 right-4 bg-white rounded-md shadow-lg">
                            <Button
                                color="none"
                                onClick={() => {}}
                                className="flex items-center p-2"
                            >
                                <BeakerIcon className="h-5 w-5 text-gray-700 mr-2" />
                                Event Preview
                            </Button>
                        </nav>
                    </section>
                    <section className="info bg-white rounded-md border-2 p-4 md:m-0 m-2">
                        <h2 className="text-2xl font-bold text-gray-700">
                            {event.title}
                        </h2>
                        <p className="pt-2">{event.description}</p>
                        <div className="flex mt-4 mx-1">
                            <CalendarIcon className="h-6 w-6" />
                            <span className="pl-2">
                                <p>{dateString}</p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <LocationMarkerIcon className="h-6 w-6" />
                            <span className="pl-2">
                                <p className="leading-tight italic">
                                    {event.venue_description}
                                </p>
                                <p className="leading-tight">
                                    {event.venue_address}
                                </p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <GlobeAltIcon className="h-6 w-6" />
                            <span className="pl-2">
                                <p>{event.capacity_remaining} tickets remain</p>
                            </span>
                        </div>
                        <div className="flex mt-4 mx-1 items-center">
                            <CurrencyDollarIcon className="h-6 w-6" />
                            <span className="pl-2">
                                <p>
                                    ${event.registration_price.toFixed(2)} per
                                    ticket
                                </p>
                            </span>
                        </div>
                        <div className="w-full mt-4 mx-2">
                            <Button
                                color="primary"
                                className="p-2 px-6 mt-2"
                                onClick={() => {}}
                            >
                                Register
                            </Button>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    );
};

const EventCreate: NextPage = () => {
    const [showForm, setShowForm] = useState(false);
    return (
        <Container>
            <Header
                title="Post An Event"
                description="Post an event you are hosting to TigerTix!"
            />
            <main className={"mx-4 md:p-2 mt-4"}>
                {showForm ? (
                    <EventCreateForm />
                ) : (
                    <EventCreatePrecursor onClick={() => setShowForm(true)} />
                )}
            </main>
        </Container>
    );
};

export default EventCreate;
