type Event = {
    [key: string]: any;
    event_id: string;
    creator_id: string;
    title: string;
    description?: string;
    location: string;
};

export default Event;
