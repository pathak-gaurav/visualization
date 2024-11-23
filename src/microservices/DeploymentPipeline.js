import React, { useState } from "react";
import {
    CheckCircle,
    XCircle,
    Loader,
    GitBranch,
    Package,
    Cloud,
    Server,
    Shield, // Import Shield icon
} from "lucide-react";

// Pipeline Stages with Commands
const pipelineStages = [
    {
        id: "githubActions",
        name: "GitHub Actions",
        status: "idle",
        description: "Trigger CI/CD pipeline",
        commands: ["git push origin main"],
        icon: GitBranch,
    },
    {
        id: "test",
        name: "Run Tests",
        status: "idle",
        description: "Running unit and integration tests",
        commands: ["npm install", "npm test"],
        icon: CheckCircle,
    },
    {
        id: "build",
        name: "Build & Install",
        status: "idle",
        description: "Building the application",
        commands: ["npm run build"],
        icon: Package,
    },
    {
        id: "codeQuality",
        name: "Code Quality Check",
        status: "idle",
        description: "Performing static code analysis",
        commands: ["npm run lint", "npm run type-check"],
        icon: CheckCircle,
    },
    {
        id: "dockerBuild",
        name: "Build Docker Image",
        status: "idle",
        description: "Creating Docker container image",
        commands: ["docker build -t myapp:latest ."],
        icon: Package,
    },
    {
        id: "snykScan",
        name: "Snyk Security Scan",
        status: "idle",
        description: "Scanning for vulnerabilities",
        commands: ["snyk test"],
        icon: Shield, // Corrected icon
    },
    {
        id: "codeCoverage",
        name: "Code Coverage",
        status: "idle",
        description: "Generating code coverage report",
        commands: ["npm run coverage"],
        icon: CheckCircle,
    },
    {
        id: "pushToECR",
        name: "Push to ECR",
        status: "idle",
        description: "Pushing Docker image to Amazon ECR",
        commands: [
            "aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY",
            "docker tag myapp:latest $ECR_REGISTRY/myapp:latest",
            "docker push $ECR_REGISTRY/myapp:latest",
        ],
        icon: Cloud,
    },
    {
        id: "deployToEKS",
        name: "Deploy to EKS",
        status: "idle",
        description: "Deploying to Amazon EKS",
        commands: [
            "aws eks update-kubeconfig --name my-cluster",
            "kubectl apply -f k8s/deployment.yaml",
            "kubectl apply -f k8s/service.yaml",
        ],
        icon: Server,
    },
    {
        id: "configureLoadBalancer",
        name: "Configure Load Balancer",
        status: "idle",
        description: "Setting up AWS Load Balancer",
        commands: ["kubectl apply -f k8s/ingress.yaml"],
        icon: Server,
    },
];

// Rest of the code remains the same

const PipelineStep = ({ stage, status, handleClick }) => {
    const Icon = stage.icon;

    const getStatusIcon = () => {
        switch (status) {
            case "success":
                return <CheckCircle className="text-green-600 w-6 h-6" />;
            case "error":
                return <XCircle className="text-red-600 w-6 h-6" />;
            case "active":
                return <Loader className="text-blue-600 w-6 h-6 animate-spin" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`p-4 rounded-lg border-2 flex items-center justify-between transition-all duration-300 ${
                status === "success"
                    ? "bg-green-50 border-green-500"
                    : status === "error"
                        ? "bg-red-50 border-red-500"
                        : status === "active"
                            ? "bg-blue-50 border-blue-500"
                            : "bg-gray-50 border-gray-300"
            }`}
            onClick={handleClick}
        >
            <div className="flex items-center">
                <Icon className="w-6 h-6 mr-3 text-gray-600" />
                <div>
                    <h3 className="font-semibold">{stage.name}</h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
            </div>
            <div className="ml-4">{getStatusIcon()}</div>
        </div>
    );
};

export default function DeploymentPipeline() {
    const [pipeline, setPipeline] = useState(pipelineStages);
    const [activeStage, setActiveStage] = useState(null);

    const handleStageUpdate = (stageIndex, status) => {
        const updatedPipeline = pipeline.map((stage, index) => {
            if (index === stageIndex) {
                setActiveStage(stage);
                return { ...stage, status };
            } else if (index < stageIndex) {
                return { ...stage, status: "success" };
            } else {
                return { ...stage, status: "idle" };
            }
        });
        setPipeline(updatedPipeline);
    };

    const handleNextStage = () => {
        const currentStageIndex = pipeline.findIndex((stage) => stage.status === "active");
        if (currentStageIndex === -1) {
            handleStageUpdate(0, "active");
        } else if (currentStageIndex < pipeline.length - 1) {
            handleStageUpdate(currentStageIndex + 1, "active");
        }
    };

    const handleResetPipeline = () => {
        setPipeline(pipelineStages);
        setActiveStage(null);
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">AWS Deployment Pipeline with GitHub Actions</h1>
            <div className="flex space-x-6">
                {/* Left Panel: Pipeline Stages */}
                <div className="flex-1 space-y-4">
                    {pipeline.map((stage, index) => (
                        <PipelineStep
                            key={stage.id}
                            stage={stage}
                            status={stage.status}
                            handleClick={() => handleStageUpdate(index, "active")}
                        />
                    ))}
                </div>

                {/* Right Panel: Commands */}
                <div className="w-1/3 p-4 bg-gray-50 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-4">Stage Commands</h2>
                    {activeStage ? (
                        <div>
                            <h3 className="font-bold text-blue-600 mb-2">{activeStage.name}</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                {activeStage.commands.map((command, index) => (
                                    <li key={index} className="font-mono bg-gray-100 p-2 rounded mb-2">
                                        {command}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">Select a stage to view its commands.</p>
                    )}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-6 flex justify-between">
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={handleNextStage}
                >
                    Next Stage
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={handleResetPipeline}
                >
                    Reset Pipeline
                </button>
            </div>
        </div>
    );
}
