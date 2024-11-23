import React, { useState } from "react";
import { ArrowRight, Server, Code, Database, CheckCircle } from "lucide-react";

// Spring Boot Workflow Stages
const springBootStages = [
    {
        id: "startup",
        name: "Application Startup",
        icon: Code,
        description: "Spring Boot application starts up.",
        commands: [
            "java -jar my-application.jar",
            "Log: Starting Spring Boot application with main()",
            "Initialize logging framework and system properties",
        ],
    },
    {
        id: "dependencyInjection",
        name: "Dependency Injection",
        icon: Server,
        description: "Spring Boot performs dependency injection.",
        commands: [
            "Scan for @Component, @Service, and @Repository annotations",
            "Inject dependencies using @Autowired",
            "Log: Resolving bean dependencies",
        ],
    },
    {
        id: "contextInitialization",
        name: "Context Initialization",
        icon: Database,
        description: "Spring Boot initializes the application context.",
        commands: [
            "ApplicationContext is initialized",
            "Load @Configuration and @PropertySource annotations",
            "Initialize BeanFactory and other contexts",
            "Log: ApplicationContext initialized successfully",
        ],
    },
    {
        id: "beanCreation",
        name: "Bean Creation",
        icon: Server,
        description: "Beans are created and configured.",
        commands: [
            "Instantiate @Bean methods and create singletons",
            "Log: Initializing beans and post-processors",
            "Run any BeanPostProcessor hooks, such as @PostConstruct",
        ],
    },
    {
        id: "applicationReady",
        name: "Application Ready",
        icon: CheckCircle,
        description: "Application is ready to serve requests.",
        commands: [
            "Log: Application started successfully",
            "Run CommandLineRunner or ApplicationRunner beans",
            "Start listening for HTTP or other protocol requests",
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
                        ? "bg-green-50 border-green-500 shadow-lg"
                        : "bg-gray-50 border-gray-300"
                }`}
            >
                <div className="flex items-start space-x-4">
                    <div
                        className={`p-3 rounded-lg ${
                            stage.active ? "bg-green-100" : "bg-gray-200"
                        }`}
                    >
                        <IconComponent
                            className={`w-8 h-8 ${
                                stage.active
                                    ? "text-green-600 animate-pulse"
                                    : "text-gray-600"
                            }`}
                        />
                    </div>
                    <div className="flex-1">
                        <h3
                            className={`font-semibold text-lg ${
                                stage.active ? "text-green-600" : "text-gray-800"
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
                            stage.active ? "text-green-500" : "text-gray-300"
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
                    <activeStage.icon className="w-6 h-6 text-green-600" />
                    <h3 className="font-bold text-green-600">{activeStage.name}</h3>
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


export default function SpringBootFlow() {
    const [flow, setFlow] = useState(springBootStages);
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
        setFlow(springBootStages.map((stage) => ({ ...stage, active: false })));
        setActiveStage(null);
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-8">Spring Boot Workflow</h1>
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
                    className="px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
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
