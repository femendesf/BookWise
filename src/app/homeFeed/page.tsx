import { buildNextAuthOptions } from "@/utils/buildAuth";

import { getServerSession } from "next-auth";
import { Feed } from "./feed";

export const metadata = {
    title: 'BookWise/Feed',
}

export default async function PageFeed() {

    const session = await getServerSession(buildNextAuthOptions());
    
    return(
       <>
        <Feed session={session}/>
       </>
    )
}