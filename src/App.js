import React from "react";
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from "react-router-dom";
import {
    ArrowDownUp,
    ArrowRight,
    Binary,
    Code2,
    Cpu,
    Database,
    FileText,
    GitBranch,
    GitPullRequest,
    Home,
    Layers,
    Link as LinkIcon,
    Network,
    Server,
    Zap,
} from "lucide-react";

// Import your visualization components
import RemoveDuplicatesVisualization from "./algorithms/RemoveDuplicatesVisualization";
import ReverseLinkedListVisualization from "./algorithms/ReverseLinkedListVisualization";
import PalindromeVisualization from "./algorithms/PalindromeVisualization";
import PushAtBottomVisualization from "./algorithms/PushAtBottomStack";
import ReverseStackVisualization from "./algorithms/ReversingStack";
import MicroservicesTransactionVisualization from "./microservices/MicroservicesTransactionPatternsVisualization";
import DeploymentPipeline from "./microservices/DeploymentPipeline";
import MicroserviceFlow from "./microservices/MicroserviceFlow";
import KafkaFlow from "./microservices/KafkaFlow";
import SpringBootFlow from "./microservices/SpringBootFlow";
import JavaMemoryVisualization from "./java/JavaMemoryVisualization";
import HibernateVisualization from "./microservices/HibernateVisualization";
import SpringBootVisualization from "./microservices/SpringBootVisualization"; // New Java Memory Visualization

const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
        >
            <Home className="inline-block w-5 h-5 mr-2"/>
            Home
        </button>
    );
};

const CategoryCard = ({title, description, icon: Icon, items}) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600"/>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <p className="text-gray-600 mb-6 text-sm">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                    <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                        <item.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600"/>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                            {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <ArrowRight
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
                </Link>
            ))}
        </div>
    </div>
);

const visualizations = {
    algorithms: {
        title: "Algorithm Visualizations",
        description: "Interactive visualizations of common data structures and algorithms",
        icon: Binary,
        items: [
            {
                name: "Remove Duplicates",
                description: "Visualize duplicate removal from arrays",
                path: "/remove-duplicate",
                icon: Code2,
            },
            {
                name: "Reverse Linked List",
                description: "See linked list reversal in action",
                path: "/reverse-linked-list",
                icon: LinkIcon,
            },
            {
                name: "Palindrome Check",
                description: "Visualize palindrome verification",
                path: "/palindrome",
                icon: FileText,
            },
            {
                name: "Stack Push at Bottom",
                description: "Learn bottom pushing in stacks",
                path: "/stack-pustatbottom",
                icon: Layers,
            },
            {
                name: "Reverse Stack",
                description: "Visualize stack reversal process",
                path: "/stack-reversing",
                icon: ArrowDownUp,
            },
        ],
    },
    microservices: {
        title: "Microservice Patterns",
        description: "Explore common microservice architecture patterns and deployments",
        icon: Database,
        items: [
            {
                name: "Transaction Patterns",
                description: "Understand distributed transactions",
                path: "/microservice-transaction-patterns",
                icon: Network,
            },
            {
                name: "Deployment Pipeline",
                description: "See CI/CD pipeline workflow",
                path: "/aws-pipeline",
                icon: GitPullRequest,
            },
            {
                name: "Service Flow",
                description: "Visualize microservice interactions",
                path: "/microservice-flow",
                icon: Zap,
            },
            {
                name: "Kafka Workflow",
                description: "Visualize Kafka producer and consumer interactions",
                path: "/kafka-flow",
                icon: GitBranch,
            },
            {
                name: "Spring Boot Workflow",
                description: "Visualize the lifecycle of a Spring Boot application",
                path: "/spring-boot-flow",
                icon: Server,
            },
            {
                name: "Spring Boot Annotation",
                description: "Visualize Spring Boot annotation",
                path: "/spring-boot-annotation",
                icon: Server,
            },
            {
                name: "Hibernate Workflow",
                description: "Visualize the lifecycle of a Spring Boot with Hibernate application",
                path: "/hibernate",
                icon: Server,
            },
        ],
    },
    coreJava: {
        title: "Core Java Visualizations",
        description: "Understand Java internals and memory management",
        icon: Cpu,
        items: [
            {
                name: "Java Memory Management",
                description: "Visualize heap, stack, and class loading",
                path: "/java-memory",
                icon: Database,
            },
        ],
    },
};

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Visualization Explorer
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Interactive visualizations to help you understand algorithms and microservice patterns
                        </p>
                        <div className="flex justify-center mt-6">
                            <HomeButton/>
                        </div>
                    </div>

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="space-y-8">
                                    {Object.values(visualizations).map((category) => (
                                        <CategoryCard key={category.title} {...category} />
                                    ))}
                                </div>
                            }
                        />
                        <Route path="/remove-duplicate" element={<RemoveDuplicatesVisualization/>}/>
                        <Route path="/reverse-linked-list" element={<ReverseLinkedListVisualization/>}/>
                        <Route path="/palindrome" element={<PalindromeVisualization/>}/>
                        <Route path="/stack-pustatbottom" element={<PushAtBottomVisualization/>}/>
                        <Route path="/stack-reversing" element={<ReverseStackVisualization/>}/>
                        <Route path="/microservice-transaction-patterns"
                               element={<MicroservicesTransactionVisualization/>}/>
                        <Route path="/aws-pipeline" element={<DeploymentPipeline/>}/>
                        <Route path="/microservice-flow" element={<MicroserviceFlow/>}/>
                        <Route path="/kafka-flow" element={<KafkaFlow/>}/>
                        <Route path="/spring-boot-flow" element={<SpringBootFlow/>}/>
                        <Route path="/java-memory" element={<JavaMemoryVisualization/>}/>
                        <Route path="/hibernate" element={<HibernateVisualization/>}/>
                        <Route path="/spring-boot-annotation" element={<SpringBootVisualization/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
