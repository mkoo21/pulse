declare global {
    type MyEvent = [ string, string, number, Date ];
    enum MyEventRows { id, topic, amount, timestamp }
}

export {};