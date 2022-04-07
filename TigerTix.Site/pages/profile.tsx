import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Header, Button, Container } from "../components";
import React, { FormEventHandler, ReactNode, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { userInfo } from "os";
import { connectUserManagement, changePassword } from "../services/auth0";
import { connect } from "http2";
import { resolve } from "node:path/win32";

const AccountInfo: NextPage<{}> = () => {
    const { user } = useUser();
    const [needToDisplayForm, setNeedToDisplayForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [validPassword, setValPassword] = useState('');


    if (user && needToDisplayForm) {

        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            
            

            if (!newPassword || !validPassword) {
                alert('Please be sure to fill out both entries with matching passwords.');
            }

            else if (newPassword != validPassword) {
                alert('Please enter matching passwords. Provided passwords did not match.');
            }

            else {
                var token_req_response = connectUserManagement();

                token_req_response.then((jsonResponse)=> {
                    changePassword(jsonResponse.access_token, user, newPassword);
                    alert('Your password was successfully changed!')
                })
            }

            setNewPassword('');
            setValPassword('');

            setNeedToDisplayForm(false);
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
                

                <form onSubmit={onSubmit}>
                    <label className={styles.user_info_titles} htmlFor="fname">
                        New Password:
                    </label>
                    <input
                        className={styles.user_info_input_box}
                        type="text"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                    <br/>
                    <br/>
                
                    <label className={styles.user_info_titles} htmlFor="fname">
                        Verify New Password:
                    </label>
                    
                    <input
                        className={styles.user_info_input_box}
                        type="text"
                        onChange={(e) => setValPassword(e.target.value)}
                        value={validPassword}
                    />
                    <br/>
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
