'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams.get("capacity") ?? "all";

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="flex border border-primary-800">
            <Button
                handleFilter={handleFilter}
                activeFilter={activeFilter}
                filter={'all'}
            >
                All
            </Button>
            <Button
                handleFilter={handleFilter}
                activeFilter={activeFilter}
                filter={'small'}
            >
                Small
            </Button>
            <Button
                handleFilter={handleFilter}
                activeFilter={activeFilter}
                filter={'medium'}
            >
                Medium
            </Button>
            <Button
                handleFilter={handleFilter}
                activeFilter={activeFilter}
                filter={'large'}
            >
                Large
            </Button>
        </div>
    );
}

function Button({ handleFilter, filter, activeFilter, children }) {
    return (
        <button
            className={`border px-5 py-2 hover:bg-primary-700 ${activeFilter == filter ? 'bg-primary-700 text-primary-50' : ''}`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}
