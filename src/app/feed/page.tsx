import { buildNextAuthOptions } from "@/utils/buildAuth";
import { Feed } from "./components/homeFeed";
import { getServerSession } from "next-auth";

export default async function PageFeed() {

    const session = await getServerSession(buildNextAuthOptions());

    return(
       <>
        <Feed session={session}/>
       </>
    )
}