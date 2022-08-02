import { useRouter } from "next/router";
import { client, getProfiles, getPublications } from '../api/queries';
import { useState, useEffect } from 'react';
import Image from 'next/image';


const Profile = ()=>{

    const router = useRouter();
    const { id } = router.query;
    const [profile, setProfile] = useState([]);
    const [pubs, setPubs] = useState([]);

    useEffect(()=>{
        if(id){
            fetchProfile()
        }
    },[id]);


    async function fetchProfile(){
        try{
            const response = await client.query(getProfiles, {id}).toPromise();
            console.log({response});
            setProfile(response.data?.profiles?.items[0])

            const publicationData = await client.query(getPublications,{id}).toPromise()
            console.log({publicationData})
        } catch(err){
            console.log({err})
        }
    }

    // if(!profile) return null

    return(
        <>
        {profile?.picture ? (<>
        <Image 
            width="200px"
            height="200px"
            src={profile?.picture?.original.url}
            />
        </>) : (<>
            <div style={{width: '200px', height: '200px', backgroundColor: 'black'}}></div>
        </>)}
        <div>
            <h4>{profile?.handle}</h4>
            <p>{profile?.bio}</p>
            <p>Followers: {profile?.stats?.totalFollowers}</p>
            <p>Following: {profile?.stats?.totalFollowing}</p>
        </div>
        </>
    )
}

export default Profile;