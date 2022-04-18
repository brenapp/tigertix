import type { NextPage } from "next";
import { Header, Container, Button } from "../../components";
import { Event, shim } from "../../services/events";
import {
    ArrowRightIcon,
    BeakerIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    LocationMarkerIcon,
    PlusIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
    ContentState,
    convertFromRaw,
    convertToRaw,
    EditorState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import ContentBlockEditor, {
    ContentBlockDisplay,
} from "../../components/contentBlockEditor";

const EventCreatePrecursor = ({ onClick }: { onClick: () => void }) => {
    const { user } = useUser();

    if (!user) return null;

    return (
        <Container className="container mx-auto md:p-2">
            <h1 className="text-2xl">Create An Event</h1>
            <p className="mt-2">
                To get started, we will ask you some details about your event.
                Your name and email will be associated with this event. Once you
                have the event posted, you will be able to view and manage it
                from your account.
            </p>
            <div className="mt-4">
                <h2 className="text-lg text-orange italic">
                    Event Administrator
                </h2>
                <p className="bg-white mt-2 border-2 rounded-md px-4 py-2">
                    <span className="font-bold mr-4">Name</span> {user.name}
                </p>
                <p className="bg-white mt-2 border-2 rounded-md px-4 py-2">
                    <span className="font-bold mr-4">Email</span> {user.email}
                </p>
            </div>
            <Button
                color="primary"
                className="p-1 px-6 mt-2 flex items-center"
                onClick={onClick}
            >
                Next
                <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
        </Container>
    );
};

const EventCreateForm = () => {
    let start = shim;
    if (sessionStorage.getItem("event") !== null) {
        start = JSON.parse(sessionStorage.getItem("event") as string);
    }

    const [event, setEvent] = useState<Event>(start);
    const [blockIndex, setBlockIndex] = useState(0);
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
            event.blocks?.[blockIndex]?.description
                ? convertFromRaw(
                      JSON.parse(event.blocks[blockIndex].description)
                  )
                : ContentState.createFromText("")
        )
    );

    // Persist editor state to the event object
    useEffect(() => {
        const raw = convertToRaw(editorState.getCurrentContent());
        setBlock(blockIndex, {
            description: JSON.stringify(raw),
        });
        sessionStorage.setItem("event", JSON.stringify(event));
    });

    // Change content block state when you switch tabs
    useEffect(() => {
        setEditorState(
            EditorState.createWithContent(
                event.blocks[blockIndex].description
                    ? convertFromRaw(
                          JSON.parse(event.blocks[blockIndex].description)
                      )
                    : ContentState.createFromText("")
            )
        );
    }, [event.blocks, blockIndex]);

    function setBlock(
        index: number,
        block: { title?: string; description?: string }
    ) {
        // NOTE: I hate everything about this
        setEvent((event) => ({
            ...event,
            blocks: [
                ...event.blocks.slice(0, index),
                { ...event.blocks[index], ...block },
                ...event.blocks.slice(index + 1),
            ],
        }));
    }

    function removeIndex(index: number) {
        if (index === 0) return;
        setBlockIndex(index - 1);
        setEvent((event) => ({
            ...event,
            blocks: [
                ...event.blocks.slice(0, index),
                ...event.blocks.slice(index + 1),
            ],
        }));
    }

    // Save the current event data to session storage
    useEffect(() => {
        sessionStorage.setItem("event", JSON.stringify(event));
    }, [event]);

    const BasicDetailsForm = () => (
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
                                capacity_total: Number.parseInt(e.target.value),
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
                <p className="lg:mt-6 ml-2 italic text-sm">
                    The event description should be a brief, one-sentence
                    overview of your event. You can enter more information in
                    the content blocks below.{" "}
                </p>
            </div>
        </section>
    );
    const EventPreview = () => (
        <section className="preview lg:col-span-1 col-span-2">
            <section className="grid grid-cols-1">
                <section className="image relative mx-auto w-full h-full rounded-md">
                    <Image
                        alt={event.description}
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
                            ${event.registration_price.toFixed(2)}/ticket
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
    );
    const ContentBlockForm = () => (
        <section className="bg-white rounded-md border-2 px-4 py-2 col-span-3 md:col-span-2">
            <h2 className="text-orange text-lg italic">Content Blocks</h2>
            <p>
                Use content blocks to add more details about your event,
                including policies, safety information, payment information, and
                more.
            </p>
            <nav className="blocks flex flex-wrap pt-4">
                {event.blocks.map((block, index) => (
                    <Button
                        key={block.title}
                        onClick={() => setBlockIndex(index)}
                        color={index == blockIndex ? "primary" : "none"}
                        className={
                            "px-6 py-1.5 border-2 mr-2 mb-2 " +
                            (index == blockIndex ? "border-orange" : "")
                        }
                    >
                        {block.title}
                    </Button>
                ))}
                <Button
                    onClick={() => {
                        setBlock(event.blocks.length, {
                            title: "New Tab",
                            description: "",
                        });
                        setBlockIndex(event.blocks.length);
                    }}
                    color="none"
                    className="px-4 mb-2"
                >
                    <PlusIcon className="text-orange w-6 h-6" />
                </Button>
            </nav>
            {event.blocks.length > 0 && (
                <div>
                    <label className="font-bold mb-4 w-full">
                        <p>Tab Name</p>
                        <input
                            type="text"
                            defaultValue={event.blocks[blockIndex].title}
                            onBlur={(e) => {
                                setBlock(blockIndex, {
                                    title: e.target.value,
                                });
                            }}
                            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                        />
                    </label>
                    {blockIndex > 0 && (
                        <details className="mt-4 border-2 border-b-0 rounded-md pt-2">
                            <summary className="border-b-2 pb-2 px-2 text-blood pl-4">
                                Delete Tab
                            </summary>
                            <div className="border-b-2 p-2">
                                <p>
                                    By clicking delete below, you will{" "}
                                    <span className="font-bold">
                                        permanently
                                    </span>{" "}
                                    remove all of the tabs contents. This action
                                    cannot be undone.
                                </p>
                                <Button
                                    color="none"
                                    className="m-2 mt-4 py-1.5 px-4 bg-blood text-white"
                                    onClick={() => removeIndex(blockIndex)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </details>
                    )}
                    <div className="mt-4">
                        <p className="font-bold mt-4">Tab Content</p>
                        <ContentBlockEditor
                            state={editorState}
                            setState={setEditorState}
                        />
                    </div>
                </div>
            )}
        </section>
    );
    const ContentBlockPreview = () => {
        return (
            <section className="bg-white rounded-md border-2 col-span-2">
                <nav className="flex border-b-2 p-2">
                    {event.blocks.map((event, i) => (
                        <a
                            href="#"
                            key={event.title}
                            onClick={(e) => {
                                e.preventDefault();
                                setBlockIndex(i);
                            }}
                            className={
                                "text-orange px-4 py-2 rounded-md " +
                                (blockIndex == i ? "text-white bg-orange" : "")
                            }
                        >
                            {event.title}
                        </a>
                    ))}
                </nav>
                <div className="p-4">
                    <ContentBlockDisplay state={editorState} />
                </div>
            </section>
        );
    };

    const pages: [string, JSX.Element][] = [
        [
            "Basic Details",
            <>
                <BasicDetailsForm />
                <EventPreview />
            </>,
        ],
        [
            "Content Blocks",
            <>
                <ContentBlockForm />
            </>,
        ],
        [
            "Review",
            <>
                <EventPreview />
                <ContentBlockPreview />
                <div className="flex col-span-3 justify-center mt-8">
                    <Button color="primary" className="p-2 px-6">
                        Publish Event!
                    </Button>
                </div>
            </>,
        ],
    ];
    const [page, setPage] = useState(0);

    const dateString = new Date(event.start).toLocaleString();
    return (
        <section className="create grid lg:grid-cols-3 gap-2">
            <nav className="col-span-3 bg-white h-16 border-2 rounded-md flex justify-center items-center">
                {pages.map(([title], i) => (
                    <a
                        className={
                            "mx-4 text-orange " +
                            (i == page ? "font-bold underline" : "")
                        }
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setPage(i);
                        }}
                        key={title}
                    >
                        {title}
                    </a>
                ))}
            </nav>
            {pages[page][1]}
        </section>
    );
};

const EventCreate: NextPage = () => {
    const [showForm, setShowForm] = useState(
        typeof window !== "undefined" &&
            sessionStorage.getItem("event") !== null
    );

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

const AuthenticatedEventCreate = withPageAuthRequired(EventCreate);
export default AuthenticatedEventCreate;

export const getServerSideProps = withPageAuthRequired();
