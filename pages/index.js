import { useState, useEffect } from "react";
import { client, recommendProfiles} from '../api'

export default function Home() {

  useEffect(()=>{
    fetchProfiles()
  },[])

  async function fetchProfiles(){
    try{
      const response = await client.query(recommendProfiles).toPromise();
      console.log({response});
    } catch(err){
      console.log({err});
    }
  }

  return (
    <div>
      
    </div>
  )
}
