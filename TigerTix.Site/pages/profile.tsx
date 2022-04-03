import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Header, Button, Container } from "../components";
import React, { FormEventHandler, ReactNode, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { userInfo } from "os";

const AccountInfo: NextPage<{}> = () => {
    const { user } = useUser();
    const [needToDisplayForm, setNeedToDisplayForm] = useState(false);
    const [newUserName, setNewUserName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    let profile = null;

    if (user && needToDisplayForm) {
        profile = user;

        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!newUserName && !newEmail) {
                alert("Please fill out at least one form before submitting.");
            } else {
                setNewUserInfo();
            }

            setNeedToDisplayForm(false);
            setNewUserName("");
            setNewEmail("");
        };

        const setNewUserInfo = () => {
            if (newEmail) {
                user.email = newEmail;
            }

            if (newUserName) {
                user.name = newUserName;
            }
        };

        return (
            <Container>
                <Header
                    title="Account Information"
                    description="A tool for you to update your account information!"
                ></Header>
                <div className={styles.user_info_page_title}>
                    Change Your Account Information
                </div>
                <div className={styles.user_info_titles}>
                    Email:{" "}
                    <span className={styles.user_info_contents}>
                        {user.email}
                    </span>
                </div>

                <div className={styles.user_info_titles}>
                    Username:{" "}
                    <span className={styles.user_info_contents}>
                        {user.name}
                    </span>
                    <br />
                    <br />
                    <br />
                </div>

                <form onSubmit={onSubmit}>
                    <label className={styles.user_info_titles} htmlFor="fname">
                        New Email:
                    </label>
                    <input
                        className={styles.user_info_input_box}
                        type="text"
                        onChange={(e) => setNewEmail(e.target.value)}
                        value={newEmail}
                    />
                    <br />
                    <br />
                    <label className={styles.user_info_titles} htmlFor="lname">
                        New Username:
                    </label>
                    <input
                        className={styles.user_info_input_box}
                        type="text"
                        onChange={(e) => setNewUserName(e.target.value)}
                        value={newUserName}
                    />
                    <br />
                    <br />
                    <input
                        className={styles.user_info_submit}
                        type="submit"
                        value="Submit Changes"
                    />
                    <br />
                </form>
            </Container>
        );
    } else if (user && !needToDisplayForm) {
        return (
            <Container>
                <Header
                    title="Account Information"
                    description="Update your user information here."
                ></Header>
                <div className={styles.user_info_page_title}>
                    Your Account Information
                </div>
                <div className={styles.user_info_titles}>
                    Email:{" "}
                    <span className={styles.user_info_contents}>
                        {user.email}
                    </span>
                </div>
                <div className={styles.user_info_titles}>
                    Username:{" "}
                    <span className={styles.user_info_contents}>
                        {user.name}
                    </span>
                </div>

                <button
                    className={styles.change_account_info_option}
                    onClick={() => setNeedToDisplayForm(true)}
                >
                    Click here to update your account information.
                </button>
            </Container>
        );
    } else {
        return (
            <div>
                Oops, looks like we had a problem loading your account
                information! Please refresh.
            </div>
        );
    }
};

export default AccountInfo;
