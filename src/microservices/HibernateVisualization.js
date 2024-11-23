import React, { useState } from "react"
import { Settings, Database, Layers, Link, Zap, Shield, ChevronRight, X } from 'lucide-react'

const hibernateTopics = [
    {
        id: "configuration",
        name: "Configuration",
        icon: Settings,
        description: "Set up Hibernate with Spring Boot through application.properties.",
        details: [
            "Define database properties like URL, username, and password.",
            "Set Hibernate dialect for database compatibility.",
            "Enable logging for SQL queries.",
        ],
        codeSnippet: `
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/hibernate_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
    `,
    },
    {
        id: "entityRelationships",
        name: "Entity Relationships",
        icon: Link,
        description: "Defines relationships between entities (One-to-One, One-to-Many, etc.).",
        details: [
            "Use annotations like @OneToOne, @OneToMany, @ManyToOne, @ManyToMany.",
            "Specify fetch types (EAGER or LAZY).",
            "Bidirectional vs unidirectional relationships.",
        ],
        codeSnippet: `
@Entity
public class Author {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private List<Book> books = new ArrayList<>();
}

@Entity
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;
}
    `,
    },
    {
        id: "caching",
        name: "Caching",
        icon: Zap,
        description: "Improve performance using first-level and second-level caching.",
        details: [
            "First-level cache is session-scoped and mandatory.",
            "Second-level cache is shared across sessions.",
            "Providers include EhCache, Redis, and others.",
        ],
        codeSnippet: `
# application.properties
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.ehcache.EhCacheRegionFactory
spring.jpa.properties.hibernate.cache.provider_class=org.ehcache.jsr107.EhcacheCachingProvider
    `,
    },
    {
        id: "locking",
        name: "Locking Mechanisms",
        icon: Shield,
        description: "Manage concurrency using optimistic and pessimistic locking.",
        details: [
            "Optimistic locking uses a version field to avoid conflicts.",
            "Pessimistic locking locks rows to prevent updates.",
        ],
        codeSnippet: `
// Optimistic Locking
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    @Version
    private int version;
}

// Pessimistic Locking
Product product = entityManager.find(Product.class, id, LockModeType.PESSIMISTIC_WRITE);
    `,
    },
    {
        id: "inheritanceStrategies",
        name: "Inheritance Strategies",
        icon: Layers,
        description: "Handle inheritance in Hibernate using various strategies.",
        details: [
            "Table-per-class: Each class has its own table.",
            "Single table: One table for all classes.",
            "Joined: Tables for base and derived classes.",
        ],
        codeSnippet: `
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Vehicle {
    @Id
    @GeneratedValue
    private Long id;

    private String manufacturer;
}

@Entity
public class Car extends Vehicle {
    private int numberOfDoors;
}
    `,
    },
    {
        id: "queryOptimization",
        name: "Query Optimization",
        icon: Database,
        description: "Optimize queries using HQL, Criteria API, and join fetch.",
        details: [
            "Use HQL for object-oriented queries.",
            "Batch fetching reduces N+1 problems.",
            "Join fetch loads related entities.",
        ],
        codeSnippet: `
// HQL Query
List<Author> authors = session.createQuery(
    "SELECT a FROM Author a JOIN FETCH a.books", Author.class).getResultList();
    `,
    },
]

const TopicCard = ({ topic, onClick }) => {
    const Icon = topic.icon

    return (
        <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{topic.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
            <div className="flex items-center text-blue-600 hover:text-blue-800">
                <span className="text-sm font-medium">Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1" />
            </div>
        </div>
    )
}

const TopicDetails = ({ topic, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{topic.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-gray-700 mb-4">{topic.description}</p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Points:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-800 space-y-2 mb-4">
                        {topic.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                    {topic.codeSnippet && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Code Example:</h3>
                            <pre className="bg-gray-100 p-4 rounded-lg text-sm font-mono text-gray-700 overflow-x-auto">
                {topic.codeSnippet.trim()}
              </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function HibernateVisualization() {
    const [selectedTopic, setSelectedTopic] = useState(null)

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Hibernate with Spring Boot</h1>
            <p className="text-gray-700 mb-8">
                Explore the key components and features of Hibernate with Spring Boot integration.
                Click on a topic to learn more about its details and see code examples.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hibernateTopics.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} onClick={() => setSelectedTopic(topic)} />
                ))}
            </div>
            {selectedTopic && (
                <TopicDetails topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
            )}
        </div>
    )
}

