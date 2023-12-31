const Kafka = require('kafkajs');
const os = require("os");

const kafka = new Kafka.Kafka ({
    clientId: 'my-app',
    brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: os.hostname() });
consumer.connect();
consumer.subscribe({ topic: 'product'});

consumer.run({
    eachMessage: async ({ message }) => {
        console.log("New message: "+message.value.toString());
    }
});