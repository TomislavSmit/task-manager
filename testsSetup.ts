import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
    cleanup()
})

export const emptyContext = {
    tasksInitial: null,
    tasks: null,
    columns: [],
    columnOrder: [],
    searchTerm: '',
    setSearchTerm: () => {},
    setTasksInitial: () => {},
    setColumns: () => {},
    setColumnOrder: () => {},
}

export const tasks = [
    {
        id: '25a2dfbc-a7fe-411b-b0e1-25d2f8f83a97',
        content: 'Clean up the mess',
    },
    {
        id: '438b7516-a1ab-46c3-b6c8-011a0817bab9',
        content: 'Fix the bugs',
    },
    {
        id: 'd5476e77-f48d-4688-80e5-8a74d3034504',
        content: 'Add more features..',
    },
    {
        id: '81e3fab3-6c7f-4c2a-bc50-043208972563',
        content: 'Fix the UI.',
    },
]

export const fullContext = {
    tasksInitial: tasks,
    tasks: tasks,
    columns: [
        {
            id: '5e3e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f',
            title: 'To do',
            taskIds: [
                '25a2dfbc-a7fe-411b-b0e1-25d2f8f83a97',
                '438b7516-a1ab-46c3-b6c8-011a0817bab9',
            ],
            color: '#448fd5',
        },
        {
            id: '7c7e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f',
            title: 'In progress',
            taskIds: ['d5476e77-f48d-4688-80e5-8a74d3034504'],
            color: '#448fd5',
        },
        {
            id: '0c73bd9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f',
            title: 'Done',
            taskIds: ['81e3fab3-6c7f-4c2a-bc50-043208972563'],
            color: '#448fd5',
        },
    ],
    columnOrder: [
        '5e3e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f',
        '7c7e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f',
        '0c73bd9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f',
    ],
    searchTerm: '',
    setSearchTerm: () => {},
    setTasksInitial: () => {},
    setColumns: () => {},
    setColumnOrder: () => {},
}
