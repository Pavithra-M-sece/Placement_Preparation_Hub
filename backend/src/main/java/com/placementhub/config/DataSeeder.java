package com.placementhub.config;

import com.placementhub.model.*;
import com.placementhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoadmapItemRepository roadmapItemRepository;
    private final CompanyRepository companyRepository;
    private final InterviewScheduleRepository scheduleRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final ProblemRepository problemRepository;
    private final MockTestRepository mockTestRepository;
    private final TestResultRepository testResultRepository;
    private final SubmissionRepository submissionRepository;

    @Override
    public void run(String... args) {
        seedRoadmap();
        seedCompanies();
        seedSchedules();
        seedJobs();
        seedProblemsAndTests();
    }

    private void seedRoadmap() {
        if (roadmapItemRepository.count() > 0) return;

        List<RoadmapItem> items = List.of(
            item("Arrays & Strings", "DSA", 1, "Basic array operations, sliding window, two pointers"),
            item("Linked Lists", "DSA", 2, "Singly, doubly linked lists, fast/slow pointers"),
            item("Stacks & Queues", "DSA", 3, "Stack using arrays, monotonic stack, queue variants"),
            item("Recursion & Backtracking", "DSA", 4, "Base cases, tree recursion, N-Queens, subsets"),
            item("Binary Search", "DSA", 5, "Search in sorted array, rotated array, answer space"),
            item("Sorting Algorithms", "DSA", 6, "Merge sort, quick sort, counting sort"),
            item("Trees & BST", "DSA", 7, "Traversals, height, LCA, BST operations"),
            item("Heaps & Priority Queue", "DSA", 8, "Min/max heap, top-K problems"),
            item("Graphs - BFS/DFS", "DSA", 9, "Adjacency list, BFS, DFS, connected components"),
            item("Dynamic Programming", "DSA", 10, "Memoization, tabulation, knapsack, LCS"),
            item("Hashing", "DSA", 11, "HashMap, HashSet, frequency counting"),
            item("Tries", "DSA", 12, "Insert, search, prefix matching"),
            item("Processes & Threads", "OS", 1, "Process lifecycle, context switching, threads"),
            item("CPU Scheduling", "OS", 2, "FCFS, SJF, Round Robin, Priority scheduling"),
            item("Memory Management", "OS", 3, "Paging, segmentation, virtual memory"),
            item("Deadlocks", "OS", 4, "Conditions, prevention, banker's algorithm"),
            item("File Systems", "OS", 5, "Inodes, file allocation, disk scheduling"),
            item("OSI Model", "CN", 1, "7 layers, protocols at each layer"),
            item("TCP vs UDP", "CN", 2, "Connection-oriented vs connectionless"),
            item("HTTP & HTTPS", "CN", 3, "Request/response, status codes, SSL/TLS"),
            item("DNS & DHCP", "CN", 4, "Name resolution, IP assignment"),
            item("Subnetting", "CN", 5, "CIDR, subnet masks, IP classes"),
            item("SQL Basics", "DBMS", 1, "SELECT, INSERT, UPDATE, DELETE, WHERE"),
            item("Joins", "DBMS", 2, "INNER, LEFT, RIGHT, FULL OUTER joins"),
            item("Normalization", "DBMS", 3, "1NF, 2NF, 3NF, BCNF"),
            item("Indexing & Transactions", "DBMS", 4, "B-tree index, ACID properties"),
            item("ER Diagrams", "DBMS", 5, "Entities, relationships, cardinality")
        );
        roadmapItemRepository.saveAll(items);
    }

    private void seedCompanies() {
        companyRepository.deleteAll();

        List<Company> companies = List.of(
            company("TCS",
                "TCS conducts a National Qualifier Test (NQT) for mass hiring. Focus is on aptitude, verbal, coding, and logical reasoning. The process is highly structured and volume-based.",
                "Easy",
                List.of("Online NQT (Aptitude + Verbal + Reasoning + Coding)", "Technical Interview", "Managerial Interview", "HR Interview"),
                List.of("Aptitude", "Verbal Reasoning", "Logical Reasoning", "DSA", "SQL", "Java Basics", "OOPs")
            ),
            company("Infosys",
                "Infosys hires through InfyTQ platform and campus drives. Tests cover reasoning, mathematical ability, and verbal. Technical rounds focus on fundamentals and project discussion.",
                "Easy",
                List.of("Online Test (Reasoning + Maths + Verbal)", "Technical Interview (DSA + OOPs + DBMS)", "HR Interview"),
                List.of("Aptitude", "OOPs", "DBMS", "OS", "DSA Basics", "Java/Python", "SQL")
            ),
            company("Wipro",
                "Wipro's NLTH (National Level Talent Hunt) tests aptitude, written communication, and coding. Technical interview covers CS fundamentals and project work.",
                "Easy",
                List.of("Online Aptitude Test", "Written Communication Test", "Coding Test", "Technical Interview", "HR Interview"),
                List.of("Aptitude", "Communication", "DSA", "OOPs", "DBMS", "OS", "CN")
            ),
            company("Cognizant",
                "Cognizant GenC and GenC Elevate programs. Tests include aptitude, coding, and communication. Technical rounds focus on programming fundamentals and problem solving.",
                "Easy",
                List.of("Aptitude + Reasoning Test", "Coding Test (2 problems)", "Technical Interview", "HR Interview"),
                List.of("DSA", "OOPs", "SQL", "Aptitude", "Java/Python/C++", "OS Basics")
            ),
            company("Accenture",
                "Accenture hires through a 3-round process. Cognitive and technical assessment followed by communication test. No elimination in early rounds for most roles.",
                "Easy",
                List.of("Cognitive & Technical Assessment", "Communication Assessment", "HR Interview"),
                List.of("Aptitude", "Logical Reasoning", "Verbal", "DSA Basics", "OOPs", "SQL")
            ),
            company("Amazon",
                "Amazon follows a rigorous bar-raiser interview process. Heavy focus on DSA, system design, and Leadership Principles (LPs). Expect 4-6 rounds with coding + behavioral questions in every round.",
                "Hard",
                List.of("Online Assessment (2 DSA problems + Work Simulation)", "Technical Phone Screen", "Virtual Onsite Round 1 (DSA)", "Virtual Onsite Round 2 (DSA + LP)", "System Design Round", "Bar Raiser Round (DSA + LP)"),
                List.of("DSA", "Dynamic Programming", "Graphs", "Trees", "System Design", "OOPs", "Leadership Principles", "SQL")
            ),
            company("Microsoft",
                "Microsoft interviews focus on problem solving, coding, and behavioral questions. Expect 4-5 rounds covering DSA, system design, and culture fit. Strong emphasis on clean code and thought process.",
                "Hard",
                List.of("Online Coding Test (2-3 problems)", "Technical Round 1 (DSA)", "Technical Round 2 (DSA + OOPs)", "System Design Round", "Hiring Manager Round (Behavioral)"),
                List.of("DSA", "Trees & Graphs", "Dynamic Programming", "System Design", "OOPs", "OS", "CN", "Behavioral")
            ),
            company("Google",
                "Google has one of the most competitive hiring processes. Focuses heavily on algorithms, data structures, and system design. Expect 5-6 rounds. Coding must be optimal with clear explanation.",
                "Hard",
                List.of("Resume Shortlisting", "Phone Screen (1 DSA problem)", "Onsite Round 1 (DSA)", "Onsite Round 2 (DSA)", "Onsite Round 3 (System Design)", "Onsite Round 4 (Googleyness + Leadership)", "Hiring Committee Review"),
                List.of("DSA", "Graphs", "Dynamic Programming", "Binary Search", "System Design", "Distributed Systems", "OOPs", "Problem Solving")
            ),
            company("Flipkart",
                "Flipkart focuses on strong DSA and system design skills. Machine coding rounds test real-world coding ability. Behavioral rounds assess ownership and impact.",
                "Hard",
                List.of("Online Coding Test (2-3 DSA problems)", "Machine Coding Round (1-2 hrs)", "Technical Round 1 (DSA)", "Technical Round 2 (System Design)", "Hiring Manager Round"),
                List.of("DSA", "Trees", "Graphs", "Dynamic Programming", "System Design", "Machine Coding", "OOPs", "LLD")
            ),
            company("Zoho",
                "Zoho has a unique multi-stage hiring process with no shortlisting based on college. Tests programming logic, advanced programming, and technical knowledge. Strong focus on coding from scratch.",
                "Medium",
                List.of("General Aptitude Test", "Advanced Aptitude Test", "Technical Test (Programming Logic)", "Advanced Programming Round", "Technical Interview", "HR Interview"),
                List.of("DSA", "C/C++/Java", "OOPs", "DBMS", "OS", "Aptitude", "Problem Solving", "Data Structures")
            ),
            company("HCL",
                "HCL Technologies hires through campus drives and HCL TechBee program. Tests cover aptitude, technical knowledge, and communication skills.",
                "Easy",
                List.of("Online Aptitude Test", "Technical Interview (CS Fundamentals)", "HR Interview"),
                List.of("Aptitude", "OOPs", "DSA Basics", "DBMS", "OS", "CN", "Java/C++")
            ),
            company("Capgemini",
                "Capgemini uses a game-based assessment and pseudo code test. Focus on logical thinking, behavioral traits, and technical fundamentals.",
                "Easy",
                List.of("Game-Based Aptitude Assessment", "Pseudo Code Test", "Technical Interview", "HR Interview"),
                List.of("Aptitude", "Logical Reasoning", "Pseudo Code", "OOPs", "DSA Basics", "SQL")
            )
        );

        companyRepository.saveAll(companies);
    }

    private void seedSchedules() {
        if (scheduleRepository.count() > 0) return;

        InterviewSchedule s1 = new InterviewSchedule();
        s1.setCompanyName("TCS");
        s1.setRoundName("Online Aptitude Test (NQT)");
        s1.setType(InterviewSchedule.ScheduleType.ONLINE);
        s1.setVenue("https://www.tcs.com/careers/tcs-nqt");
        s1.setScheduledAt(LocalDateTime.now().plusDays(3).withHour(10).withMinute(0).withSecond(0));
        s1.setInstructions("Carry your hall ticket and a valid government ID. Ensure stable internet connection. The test covers Aptitude, Verbal, Reasoning, and 2 Coding problems. Duration: 3 hours.");
        s1.setInvitedUserIds(List.of()); // open to all

        InterviewSchedule s2 = new InterviewSchedule();
        s2.setCompanyName("Infosys");
        s2.setRoundName("Technical Interview Round 1");
        s2.setType(InterviewSchedule.ScheduleType.OFFLINE);
        s2.setVenue("Seminar Hall B, Main Campus");
        s2.setScheduledAt(LocalDateTime.now().plusDays(7).withHour(9).withMinute(30).withSecond(0));
        s2.setInstructions("Bring 3 copies of your resume, original marksheets, and a passport-size photo. Dress code: formal. Topics: DSA, OOPs, DBMS, OS. Be prepared to write code on paper.");
        s2.setInvitedUserIds(List.of()); // open to all

        scheduleRepository.saveAll(List.of(s1, s2));
    }

    private void seedJobs() {
        jobApplicationRepository.deleteAll();
        jobRepository.deleteAll();

        List<Job> jobs = List.of(
            job("Software Engineer", "Google", "Bangalore", "Full-time",
                "Join Google's core engineering team to build scalable systems. Work on products used by billions of users worldwide.",
                "B.Tech/B.E. in CS/IT, CGPA >= 7.5", "18-25 LPA",
                LocalDate.now().plusDays(30),
                List.of("DSA", "System Design", "Java", "Python", "Distributed Systems")),

            job("SDE Intern", "Amazon", "Hyderabad", "Internship",
                "6-month internship with Amazon's AWS team. Work on real cloud infrastructure problems with mentorship from senior engineers.",
                "Pre-final year, CGPA >= 7.0, CSE/IT/ECE", "80,000/month",
                LocalDate.now().plusDays(15),
                List.of("DSA", "OOPs", "Java", "Problem Solving", "SQL")),

            job("Associate Software Engineer", "TCS", "Chennai", "Full-time",
                "TCS NQT-based hiring for fresh graduates. Training provided in Java, .NET, and cloud technologies. Rotational assignments across projects.",
                "Any branch, CGPA >= 6.0, No active backlogs", "3.5 LPA",
                LocalDate.now().plusDays(20),
                List.of("Aptitude", "Java Basics", "SQL", "OOPs", "Verbal Reasoning")),

            job("Systems Engineer", "Infosys", "Pune", "Full-time",
                "Infosys Systems Engineer role for fresh graduates. Work on enterprise application development and maintenance across global clients.",
                "Any branch, CGPA >= 6.5, No active backlogs", "3.6 LPA",
                LocalDate.now().plusDays(25),
                List.of("OOPs", "DBMS", "OS", "DSA Basics", "SQL")),

            job("Frontend Developer Intern", "Flipkart", "Bangalore", "Internship",
                "3-month internship on Flipkart's consumer web team. Build and optimize React-based UI components for millions of users.",
                "Pre-final/Final year, CGPA >= 7.0", "60,000/month",
                LocalDate.now().plusDays(10),
                List.of("React", "JavaScript", "HTML/CSS", "DSA", "System Design")),

            job("Backend Developer", "Zoho", "Chennai", "Full-time",
                "Zoho hires developers who can build products from scratch. Strong focus on coding ability and problem solving. No prior experience required.",
                "Any branch, Strong programming skills", "5-8 LPA",
                LocalDate.now().plusDays(45),
                List.of("DSA", "C/C++/Java", "OOPs", "DBMS", "Problem Solving")),

            job("Software Development Engineer", "Microsoft", "Hyderabad", "Full-time",
                "Microsoft SDE role focusing on building developer tools and cloud services. Collaborative team culture with strong emphasis on code quality.",
                "B.Tech/M.Tech in CS/IT, CGPA >= 8.0", "20-30 LPA",
                LocalDate.now().plusDays(35),
                List.of("DSA", "System Design", "C++", "OOPs", "OS", "CN")),

            job("Programmer Analyst Trainee", "Cognizant", "Mumbai", "Full-time",
                "Cognizant GenC program for fresh graduates. Comprehensive training in full-stack development followed by client project assignments.",
                "Any branch, CGPA >= 6.0, 2024/2025 batch", "4 LPA",
                LocalDate.now().plusDays(18),
                List.of("DSA Basics", "OOPs", "SQL", "Aptitude", "Java/Python/C++"))
        );
        jobRepository.saveAll(jobs);
    }

    private void seedProblemsAndTests() {
        testResultRepository.deleteAll();
        mockTestRepository.deleteAll();
        submissionRepository.deleteAll();
        problemRepository.deleteAll();

        List<Problem> problems = List.of(
            problem("Two Sum", "DSA",
                "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
                "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
                "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9",
                "Use a HashMap to store each number and its index as you iterate.",
                Problem.Difficulty.EASY),

            problem("Reverse a Linked List", "DSA",
                "Given the head of a singly linked list, reverse the list and return the reversed list.",
                "0 <= Number of nodes <= 5000\n-5000 <= Node.val <= 5000",
                "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
                "Use three pointers: prev, curr, next. Iterate and reverse links one by one.",
                Problem.Difficulty.EASY),

            problem("Longest Substring Without Repeating Characters", "DSA",
                "Given a string s, find the length of the longest substring without repeating characters.",
                "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
                "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
                "Use sliding window with a HashSet to track characters in the current window.",
                Problem.Difficulty.MEDIUM),

            problem("Binary Search", "DSA",
                "Given an array of integers nums sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
                "1 <= nums.length <= 10^4\n-10^4 <= nums[i], target <= 10^4\nAll integers in nums are unique and sorted in ascending order.",
                "Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4",
                "Use low and high pointers. Check mid each time and halve the search space.",
                Problem.Difficulty.EASY),

            problem("Maximum Subarray (Kadane's Algorithm)", "DSA",
                "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
                "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
                "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.",
                "Track current sum and max sum. Reset current sum to 0 when it goes negative.",
                Problem.Difficulty.MEDIUM),

            problem("Valid Parentheses", "DSA",
                "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.",
                "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
                "Input: s = \"()[]{}\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false",
                "Use a stack. Push opening brackets, pop and match for closing brackets.",
                Problem.Difficulty.EASY),

            problem("Number of Islands", "DSA",
                "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
                "1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
                "Input: grid = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]\nOutput: 2",
                "Use DFS/BFS. When you find a '1', do DFS to mark all connected land as visited.",
                Problem.Difficulty.MEDIUM),

            problem("Climbing Stairs", "DSA",
                "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
                "1 <= n <= 45",
                "Input: n = 3\nOutput: 3\nExplanation: 1+1+1, 1+2, 2+1",
                "This is essentially Fibonacci. dp[i] = dp[i-1] + dp[i-2].",
                Problem.Difficulty.EASY),

            problem("LRU Cache", "DSA",
                "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put operations in O(1) time.",
                "1 <= capacity <= 3000\n0 <= key <= 10^4\n0 <= value <= 10^5\nAt most 2 * 10^5 calls will be made to get and put.",
                "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1",
                "Use a HashMap + Doubly Linked List. HashMap for O(1) access, DLL for O(1) eviction.",
                Problem.Difficulty.HARD),

            problem("Find Missing Number", "Aptitude",
                "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
                "n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll the numbers of nums are unique.",
                "Input: nums = [3,0,1]\nOutput: 2\n\nInput: nums = [0,1]\nOutput: 2",
                "Expected sum of 0 to n is n*(n+1)/2. Subtract actual sum to find missing number.",
                Problem.Difficulty.EASY),

            problem("Train Speed Problem", "Aptitude",
                "A train travels from city A to city B at 60 km/h and returns at 40 km/h. What is the average speed for the entire journey?",
                "Use the harmonic mean formula for average speed when distance is equal.",
                "Distance A to B = D km\nTime A→B = D/60, Time B→A = D/40\nTotal time = D/60 + D/40 = D(2+3)/120 = D/24\nAverage speed = 2D / (D/24) = 48 km/h\nOutput: 48 km/h",
                "Average speed = 2*v1*v2 / (v1+v2) when distances are equal.",
                Problem.Difficulty.EASY),

            problem("What is a Deadlock?", "OS",
                "Explain the four necessary conditions for a deadlock to occur in an operating system. Also describe one method to prevent deadlocks.",
                "Answer should cover all 4 Coffman conditions and at least one prevention strategy.",
                "Conditions: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, (4) Circular Wait.\nPrevention: Break circular wait by imposing a total ordering on resource types.",
                "Remember the acronym MHNC: Mutual exclusion, Hold & wait, No preemption, Circular wait.",
                Problem.Difficulty.MEDIUM),

            problem("TCP vs UDP", "CN",
                "Compare TCP and UDP protocols. When would you choose UDP over TCP? Give a real-world example for each.",
                "Answer should cover connection type, reliability, ordering, speed, and use cases.",
                "TCP: Connection-oriented, reliable, ordered delivery, slower. Use case: HTTP, email, file transfer.\nUDP: Connectionless, unreliable, no ordering, faster. Use case: Video streaming, DNS, online gaming.",
                "Think about what matters more: reliability (TCP) or speed (UDP).",
                Problem.Difficulty.EASY),

            problem("SQL Joins", "DBMS",
                "Given two tables: Employees(id, name, dept_id) and Departments(id, dept_name), write SQL queries to:\n1. Get all employees with their department names (including employees with no department)\n2. Get only employees who have a department assigned",
                "Tables may have NULL values in dept_id.",
                "Query 1 (LEFT JOIN): SELECT e.name, d.dept_name FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.id;\nQuery 2 (INNER JOIN): SELECT e.name, d.dept_name FROM Employees e INNER JOIN Departments d ON e.dept_id = d.id;",
                "LEFT JOIN returns all rows from left table. INNER JOIN returns only matching rows.",
                Problem.Difficulty.MEDIUM),

            problem("Merge Two Sorted Arrays", "DSA",
                "Given two sorted arrays nums1 and nums2, merge them into a single sorted array. Do not use extra space — merge nums1 in-place. nums1 has enough space at the end.",
                "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9",
                "Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]",
                "Start filling from the end of nums1. Compare from the back of both arrays.",
                Problem.Difficulty.EASY)
        );

        List<Problem> saved = problemRepository.saveAll(problems);

        // Assign problems to mock tests
        List<Long> dsaEasyIds = saved.stream()
                .filter(p -> p.getTopic().equals("DSA") && p.getDifficulty() == Problem.Difficulty.EASY)
                .map(Problem::getId).toList();

            List<Long> dsaMediumIds = saved.stream()
                .filter(p -> p.getTopic().equals("DSA") && p.getDifficulty() == Problem.Difficulty.MEDIUM)
                .map(Problem::getId).toList();

            List<Long> aptitudeIds = saved.stream()
                .filter(p -> p.getTopic().equals("Aptitude"))
                .map(Problem::getId).toList();

            List<Long> csIds = saved.stream()
                .filter(p -> List.of("OS", "CN", "DBMS").contains(p.getTopic()))
                .map(Problem::getId).toList();

            List<Long> allIds = saved.stream().map(Problem::getId).toList();

        List<MockTest> tests = List.of(
                mockTest("TCS NQT Mock Test", "TCS", 90, concat(aptitudeIds, dsaEasyIds.subList(0, Math.min(2, dsaEasyIds.size())))),
                mockTest("Infosys Aptitude + Technical", "Infosys", 60, concat(aptitudeIds, csIds.subList(0, Math.min(2, csIds.size())))),
                mockTest("DSA Beginner Test", null, 45, dsaEasyIds),
                mockTest("DSA Intermediate Test", null, 60, concat(dsaEasyIds.subList(0, Math.min(2, dsaEasyIds.size())), dsaMediumIds)),
                mockTest("CS Fundamentals Test", null, 45, csIds),
                mockTest("Amazon SDE Mock Test", "Amazon", 90, concat(dsaMediumIds, List.of(saved.get(saved.size() - 1).getId()))),
                mockTest("Full Placement Mock", null, 120, allIds.subList(0, Math.min(10, allIds.size())))
            );
            mockTestRepository.saveAll(tests);
    }

    private List<Long> concat(List<Long> a, List<Long> b) {
        return java.util.stream.Stream.concat(a.stream(), b.stream()).toList();
    }

    private Job job(String title, String company, String location, String type,
                    String description, String eligibility, String pkg,
                    LocalDate deadline, List<String> skills) {
        Job j = new Job();
        j.setTitle(title);
        j.setCompanyName(company);
        j.setLocation(location);
        j.setType(type);
        j.setDescription(description);
        j.setEligibility(eligibility);
        j.setPackage_(pkg);
        j.setDeadline(deadline);
        j.setRequiredSkills(skills);
        return j;
    }

    private Problem problem(String title, String topic, String description,
                             String constraints, String examples, String hints,
                             Problem.Difficulty difficulty) {
        Problem p = new Problem();
        p.setTitle(title);
        p.setTopic(topic);
        p.setDescription(description);
        p.setConstraints(constraints);
        p.setExamples(examples);
        p.setHints(hints);
        p.setDifficulty(difficulty);
        return p;
    }

    private MockTest mockTest(String title, String company, int duration, List<Long> problemIds) {
        MockTest t = new MockTest();
        t.setTitle(title);
        t.setCompany(company);
        t.setDurationMinutes(duration);
        t.setProblemIds(problemIds);
        return t;
    }

    private RoadmapItem item(String topic, String category, int order, String desc) {
        RoadmapItem i = new RoadmapItem();
        i.setTopic(topic);
        i.setCategory(category);
        i.setOrderIndex(order);
        i.setDescription(desc);
        return i;
    }

    private Company company(String name, String pattern, String difficulty,
                             List<String> rounds, List<String> topics) {
        Company c = new Company();
        c.setName(name);
        c.setPattern(pattern);
        c.setDifficulty(difficulty);
        c.setRounds(rounds);
        c.setSuggestedTopics(topics);
        return c;
    }
}
