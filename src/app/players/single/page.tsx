'use client'

import PlayerModal from '@/components/Modals/PlayerModal';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

// Client component that uses useSearchParams
const SinglePlayerView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';
    return (
        <main className='p-6'>
            <PlayerModal player={id} />
        </main>
    );
};

// Page component with Suspense boundary
const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SinglePlayerView />
        </Suspense>
    );
};

export default Page;
