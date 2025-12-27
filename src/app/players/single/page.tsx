'use client'

import PlayerModal from '@/components/Modals/PlayerModal';
import React from 'react';

// Server page: accepts query param `id` (searchParams.id) with fallback to params.id
const singlePlayerView = ({ params, searchParams }: { params: { id?: string }, searchParams: { [key: string]: any } }) => {
    const idFromQuery = typeof searchParams?.id === 'string' ? searchParams.id : undefined;
    const id = idFromQuery ?? params?.id ?? '';
    return (
        <main className='p-6'>
            <PlayerModal player={id} />
        </main>
    );
};

export default singlePlayerView;
