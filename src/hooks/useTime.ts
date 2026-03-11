/**
 * @fileoverview Custom hook for real-time clock management.
 * Handles interval cleanup automatically to prevent memory leaks.
 */

import { useState, useEffect } from 'react';

export const useTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return time;
};