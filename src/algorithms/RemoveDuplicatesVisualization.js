import React, { useState, useEffect } from "react";

const steps = [
    { input: [1, 1, 2, 3, 3, 4, 5, 5], writeIndex: 1, readIndex: 1, description: "Initial state" },
    { input: [1, 1, 2, 3, 3, 4, 5, 5], writeIndex: 1, readIndex: 2, description: "readIndex = 2, found new unique value" },
    { input: [1, 2, 2, 3, 3, 4, 5, 5], writeIndex: 2, readIndex: 3, description: "Wrote 2, incremented writeIndex" },
    { input: [1, 2, 3, 3, 3, 4, 5, 5], writeIndex: 3, readIndex: 4, description: "Wrote 3, incremented writeIndex" },
    { input: [1, 2, 3, 3, 3, 4, 5, 5], writeIndex: 3, readIndex: 5, description: "Found new unique value 4" },
    { input: [1, 2, 3, 4, 3, 4, 5, 5], writeIndex: 4, readIndex: 6, description: "Wrote 4, incremented writeIndex" },
    { input: [1, 2, 3, 4, 5, 4, 5, 5], writeIndex: 5, readIndex: 7, description: "Wrote 5, incremented writeIndex" },
    { input: [1, 2, 3, 4, 5, 4, 5, 5], writeIndex: 5, readIndex: 8, description: "Final state, duplicates removed" },
];

export default function RemoveDuplicatesVisualization() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timer;
        if (isPlaying && currentStep < steps.length - 1) {
            timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 1500);
        } else if (currentStep === steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [currentStep, isPlaying]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <h1 className="text-center text-xl font-bold">Remove Duplicates Visualization</h1>
            <p className="text-center mb-4">Step-by-step visualization of the algorithm</p>
            <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                    {steps[currentStep].input.map((num, index) => (
                        <div
                            key={index}
                            className={`w-10 h-10 flex items-center justify-center border ${
                                index < steps[currentStep].writeIndex
                                    ? "bg-green-200"
                                    : index === steps[currentStep].readIndex
                                        ? "bg-blue-200"
                                        : ""
                            }`}
                        >
                            {num}
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <p>Write Index: {steps[currentStep].writeIndex}</p>
                    <p>Read Index: {steps[currentStep].readIndex}</p>
                </div>
                <div className="text-center font-medium">{steps[currentStep].description}</div>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                >
                    Previous
                </button>
                <button
                    onClick={handlePlayPause}
                    className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400"
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                >
                    Next
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-300 rounded hover:bg-red-400"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
