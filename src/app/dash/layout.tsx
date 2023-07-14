import React from "react";

export default function DashLayout({ children }: { children: React.ReactNode }) {
    ////-----------show loading presentation
    // setTimeout(() => {
    //     console.log("dash timeout.");
    // }, 7000)

    return (
        <section>
            DashLayout: {children}
        </section>
    )
}