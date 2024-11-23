import React, { useState } from 'react'
import { Tag, TestTube, Server, Cog, Layers, Shield, Database, Zap, GitBranch, CheckCircle, XCircle, Loader } from 'lucide-react'

const springBootTopics = [
    {
        id: "coreAnnotations",
        name: "Core Annotations",
        status: "idle",
        description: "Essential Spring Boot annotations",
        icon: Tag,
        details: [
            "@SpringBootApplication",
            "@Configuration",
            "@Bean",
            "@Component, @Service, @Repository",
            "@Autowired",
            "@Value",
            "@Profile",
        ],
        codeSnippet: `
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

@Service
public class MyService {
    @Autowired
    private MyRepository repository;

    @Value("\${my.property}")
    private String myProperty;
}
    `,
    },
    {
        id: "testing",
        name: "Testing",
        status: "idle",
        description: "Unit and integration testing in Spring Boot",
        icon: TestTube,
        details: [
            "@SpringBootTest",
            "@WebMvcTest",
            "@DataJpaTest",
            "@MockBean",
            "TestRestTemplate",
            "MockMvc",
        ],
        codeSnippet: `
@SpringBootTest
class MyServiceTest {
    @Autowired
    private MyService service;

    @MockBean
    private MyRepository repository;

    @Test
    void testMyService() {
        when(repository.findById(1L)).thenReturn(Optional.of(new MyEntity()));
        MyDto result = service.getById(1L);
        assertNotNull(result);
    }
}
    `,
    },
    {
        id: "restApi",
        name: "REST API",
        status: "idle",
        description: "Building RESTful APIs with Spring Boot",
        icon: Server,
        details: [
            "@RestController",
            "@RequestMapping",
            "@GetMapping, @PostMapping, etc.",
            "@PathVariable, @RequestParam",
            "@RequestBody",
            "ResponseEntity",
        ],
        codeSnippet: `
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto created = userService.createUser(userDto);
        return ResponseEntity.created(URI.create("/api/users/" + created.getId())).body(created);
    }
}
    `,
    },
    {
        id: "dataAccess",
        name: "Data Access",
        status: "idle",
        description: "Working with databases in Spring Boot",
        icon: Database,
        details: [
            "Spring Data JPA",
            "@Entity",
            "@Repository",
            "CrudRepository, JpaRepository",
            "@Transactional",
            "Query methods",
        ],
        codeSnippet: `
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    // getters and setters
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
}

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
    `,
    },
    {
        id: "security",
        name: "Security",
        status: "idle",
        description: "Implementing security in Spring Boot applications",
        icon: Shield,
        details: [
            "Spring Security",
            "@EnableWebSecurity",
            "@PreAuthorize, @PostAuthorize",
            "UserDetailsService",
            "JWT authentication",
            "OAuth2",
        ],
        codeSnippet: `
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin()
            .and()
            .oauth2Login();
    }
}

@RestController
public class SecuredController {
    @GetMapping("/api/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminOnly() {
        return "You are an admin!";
    }
}
    `,
    },
    {
        id: "aop",
        name: "AOP",
        status: "idle",
        description: "Aspect-Oriented Programming in Spring Boot",
        icon: Layers,
        details: [
            "@Aspect",
            "@Before, @After, @Around",
            "@Pointcut",
            "JoinPoint",
            "ProceedingJoinPoint",
        ],
        codeSnippet: `
@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("execution(* com.example.service.*.*(..))")
    private void serviceMethods() {}

    @Around("serviceMethods()")
    public Object logMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("Entering method: {}", joinPoint.getSignature().getName());
        Object result = joinPoint.proceed();
        logger.info("Exiting method: {}", joinPoint.getSignature().getName());
        return result;
    }
}
    `,
    },
    {
        id: "actuator",
        name: "Actuator",
        status: "idle",
        description: "Monitoring and managing Spring Boot applications",
        icon: Zap,
        details: [
            "Health checks",
            "Metrics",
            "Environment info",
            "Custom endpoints",
            "Security for actuator endpoints",
        ],
        codeSnippet: `
# application.properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always

@Component
@Endpoint(id = "custom")
public class CustomEndpoint {
    @ReadOperation
    public Map<String, String> customInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("app", "My Spring Boot App");
        info.put("version", "1.0.0");
        return info;
    }
}
    `,
    },
]

const TopicStep = ({ topic, status, handleClick }) => {
    const Icon = topic.icon

    const getStatusIcon = () => {
        switch (status) {
            case "success":
                return <CheckCircle className="text-green-600 w-6 h-6" />
            case "error":
                return <XCircle className="text-red-600 w-6 h-6" />
            case "active":
                return <Loader className="text-blue-600 w-6 h-6 animate-spin" />
            default:
                return null
        }
    }

    return (
        <div
            className={`p-4 rounded-lg border-2 flex items-center justify-between transition-all duration-300 cursor-pointer ${
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
                    <h3 className="font-semibold">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                </div>
            </div>
            <div className="ml-4">{getStatusIcon()}</div>
        </div>
    )
}

export default function SpringBootVisualization() {
    const [topics, setTopics] = useState(springBootTopics)
    const [activeTopic, setActiveTopic] = useState(null)

    const handleTopicUpdate = (topicIndex, status) => {
        const updatedTopics = topics.map((topic, index) => {
            if (index === topicIndex) {
                setActiveTopic(topic)
                return { ...topic, status }
            } else if (index < topicIndex) {
                return { ...topic, status: "success" }
            } else {
                return { ...topic, status: "idle" }
            }
        })
        setTopics(updatedTopics)
    }

    const handleNextTopic = () => {
        const currentTopicIndex = topics.findIndex((topic) => topic.status === "active")
        if (currentTopicIndex === -1) {
            handleTopicUpdate(0, "active")
        } else if (currentTopicIndex < topics.length - 1) {
            handleTopicUpdate(currentTopicIndex + 1, "active")
        }
    }

    const handleResetTopics = () => {
        setTopics(springBootTopics)
        setActiveTopic(null)
    }

    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Spring Boot Concepts Visualization</h1>
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Left Panel: Spring Boot Topics */}
                <div className="flex-1 space-y-4">
                    {topics.map((topic, index) => (
                        <TopicStep
                            key={topic.id}
                            topic={topic}
                            status={topic.status}
                            handleClick={() => handleTopicUpdate(index, "active")}
                        />
                    ))}
                </div>

                {/* Right Panel: Details and Code Snippet */}
                <div className="w-full lg:w-1/2 p-4 bg-gray-50 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-4">Topic Details</h2>
                    {activeTopic ? (
                        <div>
                            <h3 className="font-bold text-blue-600 mb-2">{activeTopic.name}</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
                                {activeTopic.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                            <h4 className="font-semibold mb-2">Code Example:</h4>
                            <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm overflow-x-auto">
                <code>{activeTopic.codeSnippet.trim()}</code>
              </pre>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">Select a topic to view its details and code example.</p>
                    )}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-6 flex justify-between">
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={handleNextTopic}
                >
                    Next Topic
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={handleResetTopics}
                >
                    Reset Topics
                </button>
            </div>
        </div>
    )
}

