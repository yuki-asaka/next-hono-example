"use client";

import { client } from "@/lib/api/client";
import { Button } from "@/components/ui/button";

export function HonoButton() {
    const handleClick = async () => {
        const res = await client.index.$get()
        const data = await res.json()
        alert(data.message)
    }
    return <div><Button onClick={handleClick}>Click me</Button></div>
}