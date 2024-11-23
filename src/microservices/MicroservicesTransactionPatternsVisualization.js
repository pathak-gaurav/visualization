import React, {useState} from "react";
import {AlertCircle, RefreshCw} from "lucide-react";

const patterns = {
    CHOREOGRAPHY: "Choreography",
    ORCHESTRATION: "Orchestration",
    DISTRIBUTED: "Distributed Transaction (2PC)"
};

// Extended steps array to include error scenarios
const steps = {
    [patterns.CHOREOGRAPHY]: [
        {
            type: "success",
            services: [
                {id: "order", status: "active", data: "Create Order"},
                {id: "payment", status: "idle", data: ""},
                {id: "inventory", status: "idle", data: ""},
                {id: "shipping", status: "idle", data: ""}
            ],
            action: "Order Service initiates the transaction by creating an order and publishing an event.",
            events: ["OrderCreated"],
            currentStep: 1
        },
        {
            type: "success",
            services: [
                {id: "order", status: "success", data: "Order Created"},
                {id: "payment", status: "active", data: "Process Payment"},
                {id: "inventory", status: "idle", data: ""},
                {id: "shipping", status: "idle", data: ""}
            ],
            action: "Payment Service receives OrderCreated event and processes payment.",
            events: ["OrderCreated", "PaymentProcessed"],
            currentStep: 2
        },
        {
            type: "success",
            services: [
                {id: "order", status: "success", data: "Order Created"},
                {id: "payment", status: "success", data: "Payment Processed"},
                {id: "inventory", status: "active", data: "Reserve Items"},
                {id: "shipping", status: "idle", data: ""}
            ],
            action: "Inventory Service receives PaymentProcessed event and reserves items.",
            events: ["PaymentProcessed", "ItemsReserved"],
            currentStep: 3
        },
        {
            type: "success",
            services: [
                {id: "order", status: "success", data: "Order Created"},
                {id: "payment", status: "success", data: "Payment Processed"},
                {id: "inventory", status: "success", data: "Items Reserved"},
                {id: "shipping", status: "active", data: "Create Shipment"}
            ],
            action: "Shipping Service receives ItemsReserved event and creates shipment.",
            events: ["ItemsReserved", "ShipmentCreated"],
            currentStep: 4
        }
    ],
    [patterns.ORCHESTRATION]: [
        {
            type: "success",
            services: [
                {id: "orchestrator", status: "active", data: "Start Process"},
                {id: "order", status: "idle", data: ""},
                {id: "payment", status: "idle", data: ""},
                {id: "inventory", status: "idle", data: ""}
            ],
            action: "Orchestrator initiates the transaction process.",
            events: [],
            currentStep: 1
        },
        {
            type: "success",
            services: [
                {id: "orchestrator", status: "active", data: "Monitoring"},
                {id: "order", status: "active", data: "Create Order"},
                {id: "payment", status: "idle", data: ""},
                {id: "inventory", status: "idle", data: ""}
            ],
            action: "Orchestrator calls Order Service to create order.",
            events: [],
            currentStep: 2
        },
        {
            type: "success",
            services: [
                {id: "orchestrator", status: "active", data: "Monitoring"},
                {id: "order", status: "success", data: "Order Created"},
                {id: "payment", status: "active", data: "Process Payment"},
                {id: "inventory", status: "idle", data: ""}
            ],
            action: "Orchestrator receives success from Order Service, calls Payment Service.",
            events: [],
            currentStep: 3
        }
    ],
    [patterns.DISTRIBUTED]: [
        {
            type: "success",
            services: [
                {id: "coordinator", status: "active", data: "Prepare Phase"},
                {id: "order", status: "idle", data: ""},
                {id: "payment", status: "idle", data: ""},
                {id: "inventory", status: "idle", data: ""}
            ],
            action: "Transaction Coordinator starts the prepare phase.",
            events: [],
            currentStep: 1
        },
        {
            type: "success",
            services: [
                {id: "coordinator", status: "active", data: "Prepare Phase"},
                {id: "order", status: "active", data: "Prepared"},
                {id: "payment", status: "active", data: "Prepared"},
                {id: "inventory", status: "active", data: "Prepared"}
            ],
            action: "All services prepare their local transactions and vote.",
            events: [],
            currentStep: 2
        },
        {
            type: "success",
            services: [
                {id: "coordinator", status: "active", data: "Commit Phase"},
                {id: "order", status: "success", data: "Committed"},
                {id: "payment", status: "success", data: "Committed"},
                {id: "inventory", status: "success", data: "Committed"}
            ],
            action: "Coordinator receives all votes and initiates commit phase.",
            events: [],
            currentStep: 3
        }
    ]
};

// Error scenarios for each pattern
const errorScenarios = {
    [patterns.CHOREOGRAPHY]: [
        {
            type: "error",
            services: [
                {id: "order", status: "success", data: "Order Created"},
                {id: "payment", status: "error", data: "Payment Failed"},
                {id: "inventory", status: "idle", data: ""},
                {id: "shipping", status: "idle", data: ""}
            ],
            action: "Payment Service fails to process payment. Publishes PaymentFailed event.",
            events: ["OrderCreated", "PaymentFailed"],
            currentStep: "Error"
        },
        {
            type: "error",
            services: [
                {id: "order", status: "active", data: "Cancelling Order"},
                {id: "payment", status: "error", data: "Payment Failed"},
                {id: "inventory", status: "idle", data: ""},
                {id: "shipping", status: "idle", data: ""}
            ],
            action: "Order Service receives PaymentFailed event and initiates compensating transaction.",
            events: ["PaymentFailed", "OrderCancelled"],
            currentStep: "Rollback"
        }
    ],
    [patterns.ORCHESTRATION]: [
        {
            type: "error",
            services: [
                {id: "orchestrator", status: "active", data: "Error Detected"},
                {id: "order", status: "success", data: "Order Created"},
                {id: "payment", status: "error", data: "Payment Failed"},
                {id: "inventory", status: "idle", data: ""}
            ],
            action: "Payment Service fails. Orchestrator detects failure and initiates rollback.",
            events: [],
            currentStep: "Error"
        },
        {
            type: "error",
            services: [
                {id: "orchestrator", status: "active", data: "Rolling Back"},
                {id: "order", status: "active", data: "Cancelling Order"},
                {id: "payment", status: "error", data: "Payment Failed"},
                {id: "inventory", status: "idle", data: ""}
            ],
            action: "Orchestrator executes compensation workflow to cancel order.",
            events: [],
            currentStep: "Rollback"
        }
    ],
    [patterns.DISTRIBUTED]: [
        {
            type: "error",
            services: [
                {id: "coordinator", status: "active", data: "Prepare Phase"},
                {id: "order", status: "success", data: "Prepared"},
                {id: "payment", status: "error", data: "Prepare Failed"},
                {id: "inventory", status: "success", data: "Prepared"}
            ],
            action: "Payment Service votes NO during prepare phase.",
            events: [],
            currentStep: "Error"
        },
        {
            type: "error",
            services: [
                {id: "coordinator", status: "active", data: "Abort Phase"},
                {id: "order", status: "active", data: "Rolling Back"},
                {id: "payment", status: "error", data: "Aborted"},
                {id: "inventory", status: "active", data: "Rolling Back"}
            ],
            action: "Coordinator initiates global abort, all services roll back their local transactions.",
            events: [],
            currentStep: "Rollback"
        }
    ]
};

const ServiceBox = ({service}) => {
    const getStatusColor = () => {
        switch (service.status) {
            case "active":
                return "bg-blue-100 border-blue-500";
            case "success":
                return "bg-green-100 border-green-500";
            case "error":
                return "bg-red-100 border-red-500";
            case "idle":
                return "bg-gray-50 border-gray-300";
            default:
                return "bg-white border-gray-300";
        }
    };

    return (
        <div className={`w-48 p-4 rounded-lg border-2 ${getStatusColor()} transition-all duration-300`}>
            <div className="font-medium mb-2">{service.id.charAt(0).toUpperCase() + service.id.slice(1)}</div>
            <div className="text-sm text-gray-600">{service.data}</div>
        </div>
    );
};

const EventBus = ({events}) => (
    <div className="w-full bg-yellow-50 p-2 rounded-lg border border-yellow-200 mt-4">
        <div className="text-sm font-medium mb-1">Event Bus</div>
        <div className="text-xs text-gray-600">
            {events.map((event, index) => (
                <span key={index}
                      className={`inline-block rounded px-2 py-1 mr-2 mb-1 ${
                          event.includes("Failed") || event.includes("Cancelled")
                              ? "bg-red-100"
                              : "bg-yellow-100"
                      }`}>
                    {event}
                </span>
            ))}
        </div>
    </div>
);

const PatternTab = ({pattern, selectedPattern, onClick}) => (
    <button
        className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            selectedPattern === pattern
                ? "bg-white border-b-white border border-gray-300"
                : "bg-gray-50 text-gray-600 border-transparent"
        }`}
        onClick={() => onClick(pattern)}
    >
        {pattern}
    </button>
);

export default function MicroservicesTransactionVisualization() {
    const [selectedPattern, setSelectedPattern] = useState(patterns.CHOREOGRAPHY);
    const [showError, setShowError] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    const currentSteps = showError
        ? errorScenarios[selectedPattern]
        : steps[selectedPattern];

    const handleNext = () => setStepIndex((prev) => Math.min(prev + 1, currentSteps.length - 1));
    const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));
    const handleReset = () => {
        setStepIndex(0);
        setShowError(false);
    };

    const toggleScenario = () => {
        setShowError(!showError);
        setStepIndex(0);
    };

    const handlePatternChange = (pattern) => {
        setSelectedPattern(pattern);
        setStepIndex(0);
        setShowError(false);
    };

    const currentStep = currentSteps[stepIndex];

    return (
        <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-sm bg-white">
            <div className="flex border-b">
                {Object.values(patterns).map((pattern) => (
                    <PatternTab
                        key={pattern}
                        pattern={pattern}
                        selectedPattern={selectedPattern}
                        onClick={handlePatternChange}
                    />
                ))}
            </div>

            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {selectedPattern}: {showError ? "Error Scenario" : "Success Scenario"}
                        </h2>
                        <p className="text-sm text-gray-500">Step {currentStep.currentStep}</p>
                    </div>
                    <button
                        onClick={toggleScenario}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                            showError
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                    >
                        {showError ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2"/>
                                Show Success Path
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-4 h-4 mr-2"/>
                                Show Error Scenario
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentStep.services.map((service) => (
                        <ServiceBox key={service.id} service={service}/>
                    ))}
                </div>

                {currentStep.events.length > 0 && <EventBus events={currentStep.events}/>}

                <div className={`rounded-lg p-4 ${
                    showError ? "bg-red-50" : "bg-gray-50"
                }`}>
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                        {currentStep.action}
                    </pre>
                </div>
            </div>

            <div className="p-6 border-t flex justify-center space-x-2">
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePrev}
                    disabled={stepIndex === 0}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNext}
                    disabled={stepIndex === currentSteps.length - 1}>
                    Next
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
