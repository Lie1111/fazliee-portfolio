import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
});

/**
 * Live clock rendered in Malaysia time (MYT), independent of the visitor.
 */
export default function LocalClock({
    className,
    withLabel = false,
}: {
    className?: string;
    withLabel?: boolean;
}) {
    const [time, setTime] = useState(() => formatter.format(new Date()));

    useEffect(() => {
        const id = window.setInterval(() => {
            setTime(formatter.format(new Date()));
        }, 1000);

        return () => window.clearInterval(id);
    }, []);

    return (
        <span className={cn('tabular-nums', className)}>
            {withLabel ? `MYT ${time}` : time}
        </span>
    );
}
