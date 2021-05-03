import React from 'react';
import {Header} from '../components/Header';
import {Button} from "../components/Button";
import {ConversationCard} from "../components/ConversationCard";
import Link from 'next/link';
import Axios from "../core/axios";

export default function RoomsPage({rooms = []}) {
    return (
        <>
            <Header/>
            <div className="container">
                <div className=" mt-40 d-flex align-items-center justify-content-between">
                    <h1>All conversations</h1>
                    <Button color="green">+ Start room</Button>
                </div>
                <div className="grid mt-20">
                    {rooms.map(obj => (
                        <Link key={obj.id} href={`rooms/${obj.id}`}>
                            <a>
                                <ConversationCard
                                    title={obj.title}
                                    guests={obj.guests}
                                    avatars={obj.avatars}
                                    guestsCount={obj.guestsCount}
                                    speakersCount={obj.speakersCount}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const {data} = await Axios.get('/rooms.json');
        return {
            props: {
                rooms: data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                rooms: []
            }
        }
    }
}
