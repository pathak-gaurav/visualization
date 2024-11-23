"use client"

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
    {
        input: "abccba",
        currentPalindrome: "a",
        allPalindromes: ["a"],
        code: "Expand around center at index 0 to find palindrome: 'a'."
    },
    {
        input: "abccba",
        currentPalindrome: "b",
        allPalindromes: ["a", "b"],
        code: "Expand around center at index 1 to find palindrome: 'b'."
    },
    {
        input: "abccba",
        currentPalindrome: "bccb",
        allPalindromes: ["a", "b", "bccb"],
        code: "Expand around center at indices 2,3 to find palindrome: 'bccb'."
    },
    {
        input: "abccba",
        currentPalindrome: "abccba",
        allPalindromes: ["a", "b", "bccb", "abccba"],
        code: "Expand around center at indices 2,3 to find palindrome: 'abccba'."
    },
    {
        input: "abccba",
        currentPalindrome: "c",
        allPalindromes: ["a", "b", "bccb", "abccba", "c"],
        code: "Expand around center at index 2 to find palindrome: 'c'."
    },
];

const NodeElement = ({ value, type }) => {
    const getBgColor = () => {
        switch (type) {
            case "current": return "bg-blue-100 border-blue-500";
            case "all": return "bg-green-100 border-green-500";
            default: return "bg-white border-gray-300";
        }
    };

    return (
        <div className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-medium ${getBgColor()} transition-all duration-300`}>
            {value}
        </div>
    );
};

const Legend = () => (
    <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500 mr-2" />
            <span>Current Palindrome</span>
        </div>
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500 mr-2" />
            <span>All Palindromes</span>
        </div>
    </div>
);

export default function PalindromeVisualization() {
    const [stepIndex, setStepIndex] = useState(0);
    const handleNext = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));
    const handleReset = () => setStepIndex(0);

    const currentStep = steps[stepIndex];

    return (
        <div className="w-full max-w-3xl mx-auto border rounded-lg shadow-sm bg-white">
            <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Find Palindromic Substrings Visualization</h2>
                <p className="text-sm text-gray-500">Step {stepIndex + 1} of {steps.length}</p>
            </div>

            <div className="p-6 space-y-6">
                <Legend />

                <div className="flex justify-center items-center py-8 overflow-x-auto min-h-[160px]">
                    <div className="flex space-x-4">
                        {currentStep.input.split("").map((char, index) => (
                            <NodeElement
                                key={index}
                                value={char}
                                type={currentStep.currentPalindrome.includes(char) ? "current" : "default"}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center flex-wrap">
                    <h3 className="font-semibold mb-2">All Palindromes:</h3>
                    <div className="flex space-x-2">
                        {currentStep.allPalindromes.map((palindrome, index) => (
                            <NodeElement key={index} value={palindrome} type="all" />
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
            {currentStep.code}
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
