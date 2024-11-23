import React, { useState } from "react";
import { ArrowRight, Server, MessagesSquare, Database, User } from "lucide-react";

// Kafka Flow Stages
const kafkaFlowStages = [
    {
        id: "producer",
        name: "Producer",
        icon: User,
        description: "The producer sends messages to a Kafka topic.",
        commands: [
            "Initialize KafkaTemplate in Spring Boot.",
            `Example code:
                @Autowired
                private KafkaTemplate<String, String> kafkaTemplate;
                
                public void sendMessage(String topic, String message) {
                    kafkaTemplate.send(topic, message);
                }`,
            "Run the producer: kafka-console-producer --topic my-topic --bootstrap-server localhost:9092",
        ],
    },
    {
        id: "topic",
        name: "Topic",
        icon: MessagesSquare,
        description: "Messages are sent to a topic, which is split into partitions.",
        commands: [
            "Define the topic configuration in Spring Boot.",
            `Example code:
                @Bean
                public NewTopic createTopic() {
                    return TopicBuilder.name("my-topic")
                                       .partitions(3)
                                       .replicas(2)
                                       .build();
                }`,
            "Check topic creation: kafka-topics --list --bootstrap-server localhost:9092",
        ],
    },
    {
        id: "broker",
        name: "Kafka Broker",
        icon: Server,
        description: "Kafka brokers store messages. A cluster has multiple brokers.",
        commands: [
            "Start the Kafka broker: bin/kafka-server-start.sh config/server.properties",
            "Add brokers to the cluster by starting additional Kafka instances.",
            "Verify broker cluster: kafka-topics --describe --topic my-topic --bootstrap-server localhost:9092",
        ],
    },
    {
        id: "partition",
        name: "Partition",
        icon: Database,
        description: "Partitions store subsets of messages for scalability.",
        commands: [
            "Partitions are created automatically based on the topic configuration.",
            `Example code for partition selection:
                kafkaTemplate.send(new ProducerRecord<>("my-topic", key, message));`,
            "Inspect partitions: kafka-topics --describe --topic my-topic --bootstrap-server localhost:9092",
        ],
    },
    {
        id: "consumerGroup",
        name: "Consumer Group",
        icon: User,
        description: "Consumers in a group share the workload of reading messages.",
        commands: [
            "Define the consumer in Spring Boot.",
            `Example code:
                @KafkaListener(topics = "my-topic", groupId = "my-group")
                public void listen(String message) {
                    System.out.println("Received: " + message);
                }`,
            "Run the consumer: kafka-console-consumer --topic my-topic --group my-group --bootstrap-server localhost:9092",
        ],
    },
];


const FlowStep = ({ stage, isLast }) => {
    const IconComponent = stage.icon;

    return (
        <div className="flex items-center">
            <div
                className={`relative p-6 rounded-xl border-2 min-w-[300px] transition-all duration-300 ${
                    stage.active
                        ? "bg-blue-50 border-blue-500 shadow-lg"
                        : "bg-gray-50 border-gray-300"
                }`}
            >
                <div className="flex items-start space-x-4">
                    <div
                        className={`p-3 rounded-lg ${
                            stage.active ? "bg-blue-100" : "bg-gray-200"
                        }`}
                    >
                        <IconComponent
                            className={`w-8 h-8 ${
                                stage.active
                                    ? "text-blue-600 animate-pulse"
                                    : "text-gray-600"
                            }`}
                        />
                    </div>
                    <div className="flex-1">
                        <h3
                            className={`font-semibold text-lg ${
                                stage.active ? "text-blue-600" : "text-gray-800"
                            }`}
                        >
                            {stage.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                    </div>
                </div>
            </div>
            {!isLast && (
                <div className="mx-4 flex items-center">
                    <ArrowRight
                        className={`w-6 h-6 ${
                            stage.active ? "text-blue-500" : "text-gray-300"
                        }`}
                    />
                </div>
            )}
        </div>
    );
};


const CommandPanel = ({ activeStage }) => (
    <div className="w-96 p-6 bg-gray-50 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Stage Commands</h2>
        {activeStage ? (
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <activeStage.icon className="w-6 h-6 text-blue-600" />
                    <h3 className="font-bold text-blue-600">{activeStage.name}</h3>
                </div>
                <ul className="space-y-3">
                    {activeStage.commands.map((command, index) => (
                        <li
                            key={index}
                            className="font-mono text-sm bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <pre className="whitespace-pre-wrap">{command}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <div className="text-center py-8">
                <Server className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Select a stage to view its commands.</p>
            </div>
        )}
    </div>
);


export default function KafkaFlow() {
    const [flow, setFlow] = useState(kafkaFlowStages);
    const [activeStage, setActiveStage] = useState(null);

    const handleStageUpdate = (stageIndex) => {
        const updatedFlow = flow.map((stage, index) => ({
            ...stage,
            active: index === stageIndex,
        }));
        setFlow(updatedFlow);
        setActiveStage(flow[stageIndex]);
    };

    const handleNextStage = () => {
        const currentStageIndex = flow.findIndex((stage) => stage.active);
        if (currentStageIndex === -1) {
            handleStageUpdate(0);
        } else if (currentStageIndex < flow.length - 1) {
            handleStageUpdate(currentStageIndex + 1);
        }
    };

    const handleResetFlow = () => {
        setFlow(kafkaFlowStages.map((stage) => ({ ...stage, active: false })));
        setActiveStage(null);
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-8">Kafka Workflow</h1>
            <div className="flex space-x-8">
                <div className="flex-1 space-y-6 overflow-x-auto pb-4">
                    {flow.map((stage, index) => (
                        <FlowStep
                            key={stage.id}
                            stage={stage}
                            isLast={index === flow.length - 1}
                        />
                    ))}
                </div>
                <CommandPanel activeStage={activeStage} />
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={handleNextStage}
                >
                    Next Stage
                </button>
                <button
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    onClick={handleResetFlow}
                >
                    Reset Workflow
                </button>
            </div>
        </div>
    );
}
