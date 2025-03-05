import { FC, JSX } from 'react';
import {
    useSensors,
    useSensor,
    MouseSensor,
    DragEndEvent,
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

type PropsType = {
    children: JSX.Element | JSX.Element[];
    items: Array<{ id: string; [key: string]: any }>;
    onDragEnd: (oldIndex: number, newIndex: number) => void;
};

const SortableContainer: FC<PropsType> = (props: PropsType) => {
    const { children, items, onDragEnd } = props;
    const sensor = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!active || !over) return;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            onDragEnd(oldIndex, newIndex);
        }
    }

    return (
        <DndContext sensors={sensor} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
};
export default SortableContainer;
