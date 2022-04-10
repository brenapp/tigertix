import type { NextPage } from "next";
import { Header, Button, Container, Spinner } from "../components";
import React, { useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Link from "next/link";

import { initiatePasswordReset } from "../services/auth0";

const Field = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="flex my-2 p-4 items-center rounded-md bg-white border-2">
            <label className="text-lg font-bold">{label} </label>
            {onChange ? (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="form-select ml-6 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange hover:border-gray-200 focus:outline-none"
                />
            ) : (
                <p className="ml-6 text-lg text-gray-700">{value}</p>
            )}
        </div>
    );
};

const AccountInfo: NextPage<{}> = () => {
    const { user } = useUser();
    const router = useRouter();

    if (!user) {
        if (typeof window !== "undefined") {
            router.push("/");
        }
        return null;
    }

    const [resetStatus, setResetStatus] = useState<
        "default" | "loading" | "success" | "errored"
    >("default");
    async function resetPassword() {
        setResetStatus("loading");
        try {
            const response = await initiatePasswordReset(user?.email ?? "");
            if (!response.ok) {
                setResetStatus("errored");
            } else {
                setResetStatus("success");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <Header
                title="Account Information"
                description="Your account information"
            />

            <main className="p-8 my-8 rounded-lg container mx-auto">
                <h1 className="text-2xl mb-4">Account Settings</h1>
                <section>
                    <Field
                        label="Name"
                        value={user.name ?? ""}
                    />
                    <Field label="Email" value={user.email ?? ""} />
                    <div className="my-2 p-4 mt-8 items-center rounded-md bg-white border-2">
                        <p className="text-lg font-bold">
                            Change Your Password
                        </p>
                        <p>
                            A link to reset your password will be sent to your
                            email.
                        </p>
                        <div className="flex items-center">
                            <Button
                                onClick={resetPassword}
                                color="primary"
                                className="p-2 px-4 my-2"
                            >
                                Initiate Password Reset
                            </Button>
                            <div className="ml-4 text-slate-700 text-base">
                                {
                                    {
                                        default: "",
                                        loading: <Spinner />,
                                        success: (
                                            <p>
                                                The reset email has been
                                                successfully! Check your inbox
                                                to reset your password
                                            </p>
                                        ),
                                        errored: (
                                            <p className="text-blood">
                                                Could not initiate password
                                                reset! Try again later.
                                            </p>
                                        ),
                                    }[resetStatus]
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Container>
    );
};

export default AccountInfo;
