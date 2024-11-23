import React, { useState } from "react"
import { HardDrive, Cpu, Grid, Layout, ArrowRight, Info } from 'lucide-react'

// Memory Sections
const memorySections = [
    {
        id: "heap",
        name: "Heap Memory",
        icon: HardDrive,
        description:
            "The heap is used to store objects and JRE classes. It is divided into Young Generation, Old Generation, and Permanent Generation (Metaspace in Java 8+).",
        details: [
            "Young Generation: For short-lived objects.",
            "Old Generation: For long-lived objects.",
            "Metaspace: Stores class metadata.",
        ],
    },
    {
        id: "stack",
        name: "Stack Memory",
        icon: Grid,
        description:
            "Each thread has its own stack memory, which stores local variables, method calls, and references to objects in the heap.",
        details: [
            "Stores method calls and their local variables.",
            "Does not contain objects directly, only references to objects in the heap.",
        ],
    },
    {
        id: "methodArea",
        name: "Method Area (MetaSpace)",
        icon: HardDrive,
        description:
            "Stores class-related information like bytecode, static variables, and methods.",
        details: [
            "Contains class bytecode loaded by the classloader.",
            "Holds static variables and method metadata.",
        ],
    },
    {
        id: "pcRegister",
        name: "Program Counter (PC) Register",
        icon: Cpu,
        description:
            "A small memory section that stores the address of the currently executing JVM instruction.",
        details: ["Tracks the current program instruction."],
    },
    {
        id: "nativeMethodStack",
        name: "Native Method Stack",
        icon: Layout,
        description:
            "Holds the state for native methods written in C or C++ that interact with Java code.",
        details: ["Used by JVM to execute native methods."],
    },
]

const memoryFlowStages = [
    {
        id: "classLoader",
        name: "Class Loading",
        description:
            "The ClassLoader loads bytecode into the Method Area. Static variables and metadata are prepared.",
        commands: [
            "ClassLoader loads 'MyClass.class'.",
            "Static fields initialized: int counter = 0;",
        ],
        activeSections: ["methodArea"],
    },
    {
        id: "objectCreation",
        name: "Object Creation",
        description: "A new object is created in the Heap memory.",
        commands: [
            "MyClass obj = new MyClass();",
            "Heap memory allocates space for 'obj'.",
        ],
        activeSections: ["heap"],
    },
    {
        id: "methodInvocation",
        name: "Method Invocation",
        description:
            "The method is invoked, and a stack frame is created in Stack memory.",
        commands: [
            "obj.methodA();",
            "Local variables stored in the stack frame.",
        ],
        activeSections: ["stack", "pcRegister"],
    },
]

const MemoryBlock = ({ section, isActive, onClick }) => {
    const IconComponent = section.icon
    return (
        <div
            className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                isActive ? "bg-blue-50 border-blue-500" : "bg-gray-50 border-gray-300"
            }`}
            onClick={onClick}
        >
            <div className="flex items-start space-x-4">
                <div
                    className={`p-3 rounded-lg ${
                        isActive ? "bg-blue-100" : "bg-gray-200"
                    }`}
                >
                    <IconComponent
                        className={`w-8 h-8 ${
                            isActive ? "text-blue-600" : "text-gray-600"
                        }`}
                    />
                </div>
                <div className="flex-1">
                    <h3
                        className={`font-semibold text-lg ${
                            isActive ? "text-blue-600" : "text-gray-800"
                        }`}
                    >
                        {section.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                </div>
            </div>
        </div>
    )
}

const CommandPanel = ({ activeStage, activeSection }) => (
    <div className="w-full lg:w-96 p-6 bg-gray-50 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Stage Details</h2>
        {activeStage ? (
            <div>
                <h3 className="font-bold text-blue-600 mb-4">{activeStage.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{activeStage.description}</p>
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
        ) : activeSection ? (
            <div>
                <h3 className="font-bold text-blue-600 mb-4">{activeSection.name}</h3>
                <ul className="space-y-3">
                    {activeSection.details.map((detail, index) => (
                        <li
                            key={index}
                            className="flex items-start space-x-2"
                        >
                            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <div className="text-center py-8">
                <Cpu className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Select a stage or memory section to view its details.</p>
            </div>
        )}
    </div>
)

export default function JavaMemoryVisualization() {
    const [activeSection, setActiveSection] = useState(null)
    const [activeStage, setActiveStage] = useState(null)

    const handleSectionClick = (section) => {
        setActiveSection(section)
        setActiveStage(null)
    }

    const handleStageClick = (stage) => {
        setActiveStage(stage)
        setActiveSection(null)
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">
            <h1 className="text-2xl font-bold mb-8">Java Memory Management</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {memorySections.map((section) => (
                        <MemoryBlock
                            key={section.id}
                            section={section}
                            isActive={activeStage?.activeSections.includes(section.id) || activeSection === section}
                            onClick={() => handleSectionClick(section)}
                        />
                    ))}
                </div>
                <CommandPanel activeStage={activeStage} activeSection={activeSection} />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
                {memoryFlowStages.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => handleStageClick(stage)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                            activeStage === stage
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {stage.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

