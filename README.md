# Visualization Explorer

Visualization Explorer is a React-based web application that provides interactive visualizations for core programming concepts, microservices patterns, Spring Boot principles, Kafka workflows, and more. It is designed to help developers understand complex topics through clear and intuitive interfaces.

## Features

- **Algorithm Visualizations**
    - Explore algorithms like reversing linked lists, removing duplicates, and stack manipulations.
- **Microservice Patterns**
    - Visualize transaction patterns, CI/CD pipelines, service flows, and Kafka workflows.
- **Spring Boot Concepts**
    - Learn about Spring Boot annotations, REST APIs, testing, security, AOP, and more.
- **Java Memory Management**
    - Understand how classes, objects, and variables are stored in memory.
- **Hibernate Visualization**
    - Explore concepts like caching, locking, and relationships (One-to-One, One-to-Many, etc.).

---

## Tech Stack

- **Frontend:** React.js
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js >= 16.0
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/visualization-explorer.git
   cd visualization-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

The project is structured as follows:

```
src/
├── algorithms/                 # Algorithm visualizations
│   ├── RemoveDuplicatesVisualization.js
│   ├── ReverseLinkedListVisualization.js
│   ├── PalindromeVisualization.js
├── microservices/              # Microservice visualizations
│   ├── KafkaFlow.js
│   ├── SpringBootFlow.js
│   ├── DeploymentPipeline.js
│   ├── MicroserviceFlow.js
│   ├── HibernateVisualization.js
├── java/                       # Java-specific visualizations
│   ├── JavaMemoryVisualization.js
├── App.js                      # Main application
├── index.js                    # Application entry point
├── styles.css                  # Global styles
```

---

## Available Visualizations

### Algorithm Visualizations
- **Remove Duplicates**
- **Reverse Linked List**
- **Palindrome Check**
- **Stack Push at Bottom**
- **Reverse Stack**

### Microservice Patterns
- **Transaction Patterns**
- **CI/CD Pipeline**
- **Kafka Workflow**
- **Spring Boot Workflow**
- **Service Interactions**

### Java Visualizations
- **Java Memory Management**
- **Hibernate Concepts**
    - Caching, locking, table strategies, and relationship mappings.

---

## Usage

1. Navigate through the categories displayed on the home screen.
2. Click on a category to see available visualizations.
3. Explore individual visualizations with interactive steps, commands, and code snippets.
4. Use the **Next** and **Reset** buttons for guided or resettable flows.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Screenshots

### Home Screen

Displays all available categories and visualizations:
![Home Screen]![HomeScreen](https://github.com/user-attachments/assets/318712b9-12e9-4e49-8226-57e60181125e)


### Kafka Workflow Visualization

Interactive Java Memory Management flow:
![JMM Workflow]![JMM](https://github.com/user-attachments/assets/2819e774-e796-4e04-9e65-8b4e63341ac5)


---

## Contact

If you have any questions, suggestions, or issues, please feel free to reach out.

- **Author:** Gaurav Pathak
- **GitHub:** [pathak-gaurav](https://github.com/pathak-gaurav)
