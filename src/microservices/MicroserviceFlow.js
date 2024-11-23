import React, { useState } from "react";
import {
    Globe,
    Shield,
    Server,
    Database,
    MessageSquare,
    ArrowRight,
    RefreshCw,
    CheckCircle,
    XCircle,
    Loader,
    Radio,
    CloudCog,
    MessagesSquare
} from "lucide-react";

const microserviceFlowStages = [
    {
        id: "clientRequest",
        name: "Client Request",
        icon: Globe,
        status: "idle",
        description: "Client sends a request via browser or mobile app.",
        commands: [
            "User interacts with the UI and initiates a request.",
            "curl -X GET 'https://example-api.com/resource'",
            "Ensure proper authentication headers are included."
        ],
    },
    {
        id: "apiGateway",
        name: "API Gateway",
        icon: Shield,
        status: "idle",
        description: "API Gateway receives and routes the request.",
        commands: [
            "Route request to appropriate backend service.",
            "Validate request headers, tokens, and parameters.",
            "Throttle requests if necessary."
        ],
    },
    {
        id: "loadBalancer",
        name: "Load Balancer",
        icon: RefreshCw,
        status: "idle",
        description: "Distributes traffic to multiple service instances.",
        commands: [
            "Distribute traffic across service nodes.",
            "Monitor instance health checks.",
            "Ensure sticky sessions if required for stateful services."
        ],
    },
    {
        id: "serviceLogic",
        name: "Service Logic",
        icon: CloudCog,
        status: "idle",
        description: "Executes the business logic on the backend service.",
        commands: [
            "Authenticate the request using JWT or OAuth tokens.",
            "Perform business logic: validate data, execute workflows.",
            "Interact with dependencies such as other microservices or APIs."
        ],
    },
    {
        id: "databaseInteraction",
        name: "Database Interaction",
        icon: Database,
        status: "idle",
        description: "Service interacts with the database to fetch/store data.",
        commands: [
            "Run SQL query: SELECT * FROM table_name WHERE id = ?",
            "Ensure proper indexing to optimize query performance.",
            "Use transactions to ensure data consistency."
        ],
    },
    {
        id: "asyncProcessing",
        name: "Asynchronous Processing",
        icon: Radio,
        status: "idle",
        description: "Publishes messages to SQS or EventBridge for async tasks.",
        commands: [
            "Publish message to SQS with task payload.",
            "Trigger downstream services using EventBridge rules.",
            "Ensure message durability and retry policies."
        ],
    },
    {
        id: "backgroundWorker",
        name: "Background Worker",
        icon: Server,
        status: "idle",
        description: "Processes tasks from the queue or event bus.",
        commands: [
            "Consume message from SQS or EventBridge.",
            "Process the task (e.g., send emails, resize images).",
            "Acknowledge message processing success or retry failures."
        ],
    },
    {
        id: "responseToClient",
        name: "Response to Client",
        icon: MessagesSquare,
        status: "idle",
        description: "Sends the final response back to the client.",
        commands: [
            "Return HTTP response with status 200.",
            "Include result data in the response payload.",
            "Log the response for debugging and analytics."
        ],
    },
];


const FlowStep = ({ stage, status, isLast }) => {
    const IconComponent = stage.icon;

    const getStatusIcon = () => {
        switch (status) {
            case "success":
                return <CheckCircle className="text-green-600 w-5 h-5" />;
            case "error":
                return <XCircle className="text-red-600 w-5 h-5" />;
            case "active":
                return <Loader className="text-blue-600 w-5 h-5 animate-spin" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center">
            <div
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 min-w-[300px]
                    ${
                    status === "success"
                        ? "bg-green-50 border-green-500"
                        : status === "error"
                            ? "bg-red-50 border-red-500"
                            : status === "active"
                                ? "bg-blue-50 border-blue-500"
                                : "bg-gray-50 border-gray-300"
                }`}
            >
                <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                        status === "active" ? "bg-blue-100" : "bg-gray-200"
                    }`}>
                        <IconComponent className={`w-8 h-8 ${
                            status === "active" ? "text-blue-600 animate-pulse" : "text-gray-600"
                        }`} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{stage.name}</h3>
                            <div className="ml-2">{getStatusIcon()}</div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                    </div>
                </div>
            </div>
            {!isLast && (
                <div className="mx-4 flex items-center">
                    <ArrowRight className={`w-6 h-6 ${
                        status === "success" ? "text-green-500" : "text-gray-300"
                    } ${
                        status === "active" ? "animate-bounce" : ""
                    }`} />
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
                            {command}
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


export default function MicroserviceFlow() {
    const [flow, setFlow] = useState(microserviceFlowStages);
    const [activeStage, setActiveStage] = useState(null);

    const handleStageUpdate = (stageIndex, status) => {
        const updatedFlow = flow.map((stage, index) => {
            if (index === stageIndex) {
                setActiveStage(stage);
                return { ...stage, status };
            } else if (index < stageIndex) {
                return { ...stage, status: "success" };
            } else {
                return { ...stage, status: "idle" };
            }
        });
        setFlow(updatedFlow);
    };

    const handleNextStage = () => {
        const currentStageIndex = flow.findIndex((stage) => stage.status === "active");
        if (currentStageIndex === -1) {
            handleStageUpdate(0, "active");
        } else if (currentStageIndex < flow.length - 1) {
            handleStageUpdate(currentStageIndex + 1, "active");
        }
    };

    const handleResetFlow = () => {
        setFlow(microserviceFlowStages);
        setActiveStage(null);
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-8">Microservice Application Flow</h1>
            <div className="flex space-x-8">
                <div className="flex-1 space-y-6 overflow-x-auto pb-4">
                    {flow.map((stage, index) => (
                        <FlowStep
                            key={stage.id}
                            stage={stage}
                            status={stage.status}
                            isLast={index === flow.length - 1}
                        />
                    ))}
                </div>
                <CommandPanel activeStage={activeStage} />
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    onClick={handleNextStage}
                >
                    <span>Next Stage</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
                <button
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
                    onClick={handleResetFlow}
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset Flow</span>
                </button>
            </div>
        </div>
    );
}