"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

// Steps array simulating recursive calls
const steps = [
    {
        stack: [1, 2, 3],
        action: "Pop the top element (3) and call pushAtBottom recursively.",
        top: 3,
    },
    {
        stack: [1, 2],
        action: "Pop the top element (2) and call pushAtBottom recursively.",
        top: 2,
    },
    {
        stack: [1],
        action: "Pop the top element (1) and call pushAtBottom recursively.",
        top: 1,
    },
    {
        stack: [],
        action: "Stack is empty, push 4 at the bottom.",
        top: null,
    },
    {
        stack: [4],
        action: "Push back the previously popped element (1).",
        top: 1,
    },
    {
        stack: [4, 1],
        action: "Push back the previously popped element (2).",
        top: 2,
    },
    {
        stack: [4, 1, 2],
        action: "Push back the previously popped element (3).",
        top: 3,
    },
    {
        stack: [4, 1, 2, 3],
        action: "Element at Top (3).",
        top: 3,
    },
];

const StackElement = ({ value, type }) => {
    const getBgColor = () => {
        switch (type) {
            case "top": return "bg-blue-100 border-blue-500";
            case "bottom": return "bg-green-100 border-green-500";
            default: return "bg-white border-gray-300";
        }
    };

    return (
        <div
            className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-medium ${getBgColor()} transition-all duration-300`}
        >
            {value}
        </div>
    );
};

const Legend = () => (
    <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500 mr-2" />
            <span>Top Element</span>
        </div>
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500 mr-2" />
            <span>Bottom Element</span>
        </div>
    </div>
);

export default function PushAtBottomVisualization() {
    const [stepIndex, setStepIndex] = useState(0);
    const handleNext = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));
    const handleReset = () => setStepIndex(0);

    const currentStep = steps[stepIndex];

    return (
        <div className="w-full max-w-3xl mx-auto border rounded-lg shadow-sm bg-white">
            <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Push at Bottom Visualization</h2>
                <p className="text-sm text-gray-500">Step {stepIndex + 1} of {steps.length}</p>
            </div>

            <div className="p-6 space-y-6">
                <Legend />

                <div className="flex flex-col justify-center items-center py-8 overflow-x-auto min-h-[160px]">
                    {currentStep.stack.map((value, index) => (
                        <StackElement
                            key={index}
                            value={value}
                            type={index === currentStep.stack.length - 1 ? "top" : index === 0 ? "bottom" : "default"}
                        />
                    ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
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
                    disabled={stepIndex === steps.length - 1}
                >
                    Next
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
