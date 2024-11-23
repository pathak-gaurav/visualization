"use client"

import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const steps = [
    { list: [1, 2, 3, 4, 5], curr: 0, prev: null, next: 1, code: "Node currNode = head;\nNode prevNode = null;", direction: "right" },
    { list: [1, null, 3, 4, 5], curr: 0, prev: null, next: 1, code: "Node nextNode = currNode.next;\ncurrNode.next = prevNode;", direction: "left" },
    { list: [1, null, 3, 4, 5], curr: 1, prev: 0, next: 2, code: "prevNode = currNode;\ncurrNode = nextNode;", direction: "right" },
    { list: [2, 1, null, 4, 5], curr: 1, prev: 0, next: 2, code: "Node nextNode = currNode.next;\ncurrNode.next = prevNode;", direction: "left" },
    { list: [2, 1, null, 4, 5], curr: 2, prev: 1, next: 3, code: "prevNode = currNode;\ncurrNode = nextNode;", direction: "right" },
    { list: [3, 2, 1, null, 5], curr: 2, prev: 1, next: 3, code: "Node nextNode = currNode.next;\ncurrNode.next = prevNode;", direction: "left" },
    { list: [3, 2, 1, null, 5], curr: 3, prev: 2, next: 4, code: "prevNode = currNode;\ncurrNode = nextNode;", direction: "right" },
    { list: [4, 3, 2, 1, null], curr: 3, prev: 2, next: 4, code: "Node nextNode = currNode.next;\ncurrNode.next = prevNode;", direction: "left" },
    { list: [4, 3, 2, 1, null], curr: 4, prev: 3, next: null, code: "prevNode = currNode;\ncurrNode = nextNode;", direction: "right" },
    { list: [5, 4, 3, 2, 1], curr: null, prev: 4, next: null, code: "currNode.next = prevNode;\nhead = prevNode;", direction: "left" }
]

const NodeElement = ({ value, type, showArrow = true, direction = "right" }) => {
    const getBgColor = () => {
        switch (type) {
            case 'current': return 'bg-blue-100 border-blue-500'
            case 'prev': return 'bg-green-100 border-green-500'
            case 'next': return 'bg-yellow-100 border-yellow-500'
            default: return 'bg-white border-gray-300'
        }
    }

    return (
        <div className="flex items-center">
            <div className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-medium ${getBgColor()} transition-all duration-300`}>
                {value === null ? 'null' : value}
            </div>
            {showArrow && (
                direction === "right" ?
                    <ArrowRight className="mx-2 text-gray-400 transition-transform duration-300" size={20} /> :
                    <ArrowLeft className="mx-2 text-gray-400 transition-transform duration-300" size={20} />
            )}
        </div>
    )
}

const Legend = () => (
    <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500 mr-2" />
            <span>Current Node</span>
        </div>
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500 mr-2" />
            <span>Previous Node</span>
        </div>
        <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-500 mr-2" />
            <span>Next Node</span>
        </div>
    </div>
)

export default function ReverseLinkedListVisualization() {
    const [stepIndex, setStepIndex] = useState(0)
    const handleNext = () => setStepIndex(prev => Math.min(prev + 1, steps.length - 1))
    const handlePrev = () => setStepIndex(prev => Math.max(prev - 1, 0))
    const handleReset = () => setStepIndex(0)
    const currentStep = steps[stepIndex]

    return (
        <div className="w-full max-w-3xl mx-auto border rounded-lg shadow-sm bg-white">
            <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Reverse Linked List Visualization</h2>
                <p className="text-sm text-gray-500">Step {stepIndex + 1} of {steps.length}</p>
            </div>

            <div className="p-6 space-y-6">
                <Legend />

                <div className="flex justify-center items-center py-8 overflow-x-auto min-h-[160px]">
                    {currentStep.list.map((value, index) => (
                        <NodeElement
                            key={index}
                            value={value}
                            type={
                                index === currentStep.curr ? 'current' :
                                    index === currentStep.prev ? 'prev' :
                                        index === currentStep.next ? 'next' :
                                            'default'
                            }
                            showArrow={index < currentStep.list.length - 1}
                            direction={currentStep.direction}
                        />
                    ))}
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
    )
}