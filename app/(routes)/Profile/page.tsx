"use client";
import Image from "next/image";
import user from "../../../public/user1.png"
import profile from "../../../public/profile.png"
import email from "../../../public/email.png"
import { useState, useEffect } from "react";
type dataProps = {
    name: string,
    username: string,
    email: string,
    profile: string
}

const Profile = () => {

    const [data, setData] = useState<dataProps>();
    useEffect(() => {
        setTimeout(() => {
            if (typeof window !== "undefined") {
                const savedData = localStorage.getItem('Employee-LoginData');
                if (savedData) {
                    setData(JSON.parse(savedData));
                }
            }
        }, 0);
    }, []);

    return (
        <>

            {/* <div className="flex justify-center items-center min-h-screen bg-white mb-10"> */}
            <div className="w-full  max-w-sm  mx-auto  p-6 rounded-xl  shadow-lg bg-gray-300 mt-5">
                <Image src={profile} alt="User image" className="ml-30 mb-6 rounded-full" width={96} height={96} priority placeholder="empty" />
                <h5 className="mb-0.5  mt-0 text-2xl font-semibold tracking-tight text-heading ml-30">{data?.name}</h5>
                <span className="text-sm text-body text-gray-400 ml-30">@{data?.username}</span><br /><br /><hr />

                <div className="flex mt-5 ml-22">
                    <Image src={email} alt="email" className="w-5 h-5" />
                    <p className="ml-3">{data?.email}</p>
                </div>
                <div className="flex mt-3 ml-22">
                    <Image src={user} alt="User image" className="w-5 h-5" />
                    <p className="ml-3">{data?.username}</p>
                </div><br />
                <hr />
                <button className="bg-sky-600 pt-2 pb-2 pr-8 pl-8  rounded-lg text-white mt-9 ml-25">Edit Profile</button>
            </div>
            {/* </div> */}
        </>
    )
}
export default Profile
