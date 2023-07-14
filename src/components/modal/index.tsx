'use client'

import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useRef } from "react"

export default function Modal({ children }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()
    const onDismiss = useCallback(() => {
        router.back();
    }, [router])
    const onClick = () => console.log('ss');
    useCallback((e) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss()
        }
    }, [onDismiss, overlay, wrapper]);

    const onKeyDown = useCallback((e) => {
        if (e.key === "Escape") onDismiss()
    }, [onDismiss])

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown])

    return (
        <div ref={overlay} className="fixed z-10" onClick={onClick}>
            <div ref={wrapper} className="absolute top-1/2">
                {children}
            </div>
        </div>
    )
}