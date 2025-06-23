import { Suspense } from "react";
import Login from "./Login";
export const metadata = {
    title: 'BookWise/Login',
}
export default function PageLogin() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Login/>
        </Suspense>
    )
}
