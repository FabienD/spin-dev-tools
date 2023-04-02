import { FC } from "react";

interface UuidListProps {
    uuids: string[];
}


const UuidList: FC<UuidListProps> = ({uuids}) => {
    return (
        <>
            <ul className="font-mono">
                {uuids.map((uuid) => (
                    <li key={uuid}>{uuid}</li>
                ))}
            </ul>
        </>
    )
}

export default UuidList;