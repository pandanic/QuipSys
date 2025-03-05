import { useSortable } from '@dnd-kit/sortable';
import { FC, JSX } from 'react';
import { CSS } from '@dnd-kit/utilities';

type PropsType = {
    id: string;
    children: JSX.Element;
};

const SortableItem: FC<PropsType> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const styles = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={styles} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default SortableItem;
