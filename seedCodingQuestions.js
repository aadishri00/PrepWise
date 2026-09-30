const mongoose = require("mongoose");
const dotenv = require("dotenv");

const CodingQuestion = require("./models/CodingQuestion");

dotenv.config();

const questions = [

    // =========================
    // ARRAYS
    // =========================

    {
        title: "Two Sum",
        description:
            "Find two indexes whose values add up to the target.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int target = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Maximum Element",
        description:
            "Find the maximum element in an integer array.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Minimum Element",
        description:
            "Find the minimum element in an integer array.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Reverse Array",
        description:
            "Reverse the given array.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Move Zeroes",
        description:
            "Move all zeroes to the end while maintaining the order of other elements.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Second Largest Element",
        description:
            "Find the second largest distinct element.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Remove Duplicates",
        description:
            "Remove duplicate values from a sorted array.",
        difficulty: "Easy",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Rotate Array",
        description:
            "Rotate an array to the right by k positions.",
        difficulty: "Medium",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int k = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Kadane Maximum Subarray",
        description:
            "Find the maximum sum of a contiguous subarray.",
        difficulty: "Medium",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Product Except Self",
        description:
            "Return an array where each element is the product of all other elements.",
        difficulty: "Medium",
        category: "Arrays",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // STRINGS
    // =========================

    {
        title: "Reverse String",
        description:
            "Reverse a string.",
        difficulty: "Easy",
        category: "Strings",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "Palindrome String",
        description:
            "Check whether a string is a palindrome.",
        difficulty: "Easy",
        category: "Strings",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "Count Vowels",
        description:
            "Count vowels in a string.",
        difficulty: "Easy",
        category: "Strings",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "Valid Anagram",
        description:
            "Check whether two strings are anagrams.",
        difficulty: "Easy",
        category: "Strings",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String a = sc.nextLine();
        String b = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "First Non Repeating Character",
        description:
            "Find the first character that appears only once.",
        difficulty: "Medium",
        category: "Strings",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "Longest Common Prefix",
        description:
            "Find the longest common prefix among strings.",
        difficulty: "Easy",
        category: "Strings",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();

        String[] arr = new String[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextLine();

        // Write your code here
    }
}`
    },

    // =========================
    // HASHING
    // =========================

    {
        title: "Contains Duplicate",
        description:
            "Check whether an array contains duplicate values.",
        difficulty: "Easy",
        category: "Hashing",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Frequency of Elements",
        description:
            "Print the frequency of each distinct element.",
        difficulty: "Easy",
        category: "Hashing",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Majority Element",
        description:
            "Find the element that appears more than n/2 times.",
        difficulty: "Medium",
        category: "Hashing",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // TWO POINTERS
    // =========================

    {
        title: "Two Sum Sorted Array",
        description:
            "Find two indexes in a sorted array whose values equal the target.",
        difficulty: "Easy",
        category: "Two Pointers",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int target = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Container With Most Water",
        description:
            "Find the maximum amount of water that can be contained.",
        difficulty: "Medium",
        category: "Two Pointers",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // BINARY SEARCH
    // =========================

    {
        title: "Binary Search",
        description:
            "Find the index of target in a sorted array.",
        difficulty: "Easy",
        category: "Binary Search",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int target = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "First and Last Position",
        description:
            "Find the first and last position of target in a sorted array.",
        difficulty: "Medium",
        category: "Binary Search",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int target = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Search Rotated Sorted Array",
        description:
            "Search for a target in a rotated sorted array.",
        difficulty: "Medium",
        category: "Binary Search",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int target = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // STACK
    // =========================

    {
        title: "Valid Parentheses",
        description:
            "Check whether brackets are balanced.",
        difficulty: "Easy",
        category: "Stack",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "Next Greater Element",
        description:
            "Find the next greater element for every array element.",
        difficulty: "Medium",
        category: "Stack",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Min Stack",
        description:
            "Design a stack that can return its minimum element.",
        difficulty: "Medium",
        category: "Stack",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    // =========================
    // LINKED LIST
    // =========================

    {
        title: "Reverse Linked List",
        description:
            "Reverse a singly linked list.",
        difficulty: "Easy",
        category: "Linked List",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Middle of Linked List",
        description:
            "Find the middle node of a linked list.",
        difficulty: "Easy",
        category: "Linked List",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Detect Cycle",
        description:
            "Detect whether a linked list contains a cycle.",
        difficulty: "Medium",
        category: "Linked List",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    // =========================
    // SLIDING WINDOW
    // =========================

    {
        title: "Longest Substring Without Repeating",
        description:
            "Find the length of the longest substring without repeated characters.",
        difficulty: "Medium",
        category: "Sliding Window",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your code here
    }
}`
    },

    {
        title: "Maximum Sum Subarray",
        description:
            "Find maximum sum of a contiguous subarray.",
        difficulty: "Medium",
        category: "Sliding Window",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // GREEDY
    // =========================

    {
        title: "Best Time to Buy and Sell Stock",
        description:
            "Find the maximum profit from one stock transaction.",
        difficulty: "Easy",
        category: "Greedy",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Activity Selection",
        description:
            "Select the maximum number of non-overlapping activities.",
        difficulty: "Medium",
        category: "Greedy",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "Jump Game",
        description:
            "Determine whether the last index can be reached.",
        difficulty: "Medium",
        category: "Greedy",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // DYNAMIC PROGRAMMING
    // =========================

    {
        title: "Climbing Stairs",
        description:
            "Find the number of ways to reach the nth stair.",
        difficulty: "Easy",
        category: "Dynamic Programming",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "House Robber",
        description:
            "Find maximum money without robbing adjacent houses.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Coin Change",
        description:
            "Find the minimum number of coins needed for an amount.",
        difficulty: "Medium",
        category: "Dynamic Programming",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] coins = new int[n];

        for(int i = 0; i < n; i++)
            coins[i] = sc.nextInt();

        int amount = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Longest Increasing Subsequence",
        description:
            "Find the length of the longest increasing subsequence.",
        difficulty: "Hard",
        category: "Dynamic Programming",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    // =========================
    // TREES
    // =========================

    {
        title: "Maximum Depth of Binary Tree",
        description:
            "Find the maximum depth of a binary tree.",
        difficulty: "Easy",
        category: "Trees",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "Level Order Traversal",
        description:
            "Print binary tree nodes level by level.",
        difficulty: "Medium",
        category: "Trees",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "Validate Binary Search Tree",
        description:
            "Check whether a binary tree is a valid BST.",
        difficulty: "Medium",
        category: "Trees",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    // =========================
    // GRAPHS
    // =========================

    {
        title: "BFS Traversal",
        description:
            "Perform BFS traversal of an undirected graph.",
        difficulty: "Medium",
        category: "Graphs",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "DFS Traversal",
        description:
            "Perform DFS traversal of an undirected graph.",
        difficulty: "Medium",
        category: "Graphs",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "Number of Islands",
        description:
            "Count the number of islands in a binary grid.",
        difficulty: "Medium",
        category: "Graphs",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "Detect Cycle in Graph",
        description:
            "Detect whether an undirected graph contains a cycle.",
        difficulty: "Medium",
        category: "Graphs",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    // =========================
    // HEAP
    // =========================

    {
        title: "Kth Largest Element",
        description:
            "Find the kth largest element in an array.",
        difficulty: "Medium",
        category: "Heap",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        int k = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Top K Frequent Elements",
        description:
            "Return the k most frequent elements.",
        difficulty: "Medium",
        category: "Heap",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    // =========================
    // BACKTRACKING
    // =========================

    {
        title: "Generate Permutations",
        description:
            "Generate all permutations of an array.",
        difficulty: "Medium",
        category: "Backtracking",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    {
        title: "Generate Subsets",
        description:
            "Generate all subsets of an array.",
        difficulty: "Medium",
        category: "Backtracking",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    },

    // =========================
    // HARD
    // =========================

    {
        title: "Trapping Rain Water",
        description:
            "Calculate trapped rain water between bars.",
        difficulty: "Hard",
        category: "Two Pointers",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] arr = new int[n];

        for(int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        // Write your code here
    }
}`
    },

    {
        title: "Merge K Sorted Arrays",
        description:
            "Merge multiple sorted arrays into one sorted array.",
        difficulty: "Hard",
        category: "Heap",
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your code here
    }
}`
    }

];


// =====================================================
// SAMPLE INPUT / OUTPUT
// =====================================================

const examples = {

    "Two Sum": {
        input: `4
2 7 11 15
9`,
        output: `0 1`
    },

    "Maximum Element": {
        input: `5
10 25 7 40 15`,
        output: `40`
    },

    "Minimum Element": {
        input: `5
10 25 7 40 15`,
        output: `7`
    },

    "Reverse Array": {
        input: `5
1 2 3 4 5`,
        output: `5 4 3 2 1`
    },

    "Move Zeroes": {
        input: `5
0 1 0 3 12`,
        output: `1 3 12 0 0`
    },

    "Second Largest Element": {
        input: `6
10 5 20 8 20 15`,
        output: `15`
    },

    "Remove Duplicates": {
        input: `7
1 1 2 2 3 3 4`,
        output: `1 2 3 4`
    },

    "Rotate Array": {
        input: `7
1 2 3 4 5 6 7
3`,
        output: `5 6 7 1 2 3 4`
    },

    "Kadane Maximum Subarray": {
        input: `9
-2 1 -3 4 -1 2 1 -5 4`,
        output: `6`
    },

    "Product Except Self": {
        input: `4
1 2 3 4`,
        output: `24 12 8 6`
    },

    "Reverse String": {
        input: `hello`,
        output: `olleh`
    },

    "Palindrome String": {
        input: `madam`,
        output: `true`
    },

    "Count Vowels": {
        input: `education`,
        output: `5`
    },

    "Valid Anagram": {
        input: `listen
silent`,
        output: `true`
    },

    "First Non Repeating Character": {
        input: `swiss`,
        output: `w`
    },

    "Longest Common Prefix": {
        input: `3
flower
flow
flight`,
        output: `fl`
    },

    "Contains Duplicate": {
        input: `5
1 2 3 1 5`,
        output: `true`
    },

    "Frequency of Elements": {
        input: `6
1 2 2 3 3 3`,
        output: `1:1 2:2 3:3`
    },

    "Majority Element": {
        input: `7
2 2 1 1 1 2 2`,
        output: `2`
    },

    "Two Sum Sorted Array": {
        input: `5
1 2 3 4 6
6`,
        output: `1 3`
    },

    "Container With Most Water": {
        input: `9
1 8 6 2 5 4 8 3 7`,
        output: `49`
    },

    "Binary Search": {
        input: `6
1 3 5 7 9 11
7`,
        output: `3`
    },

    "First and Last Position": {
        input: `6
5 7 7 8 8 10
8`,
        output: `3 4`
    },

    "Search Rotated Sorted Array": {
        input: `7
4 5 6 7 0 1 2
0`,
        output: `4`
    },

    "Valid Parentheses": {
        input: `()[]{}`,
        output: `true`
    },

    "Next Greater Element": {
        input: `4
4 5 2 10`,
        output: `5 10 10 -1`
    },

    "Min Stack": {
        input: `5
push 5
push 2
push 7
min
pop`,
        output: `2`
    },

    "Reverse Linked List": {
        input: `5
1 2 3 4 5`,
        output: `5 4 3 2 1`
    },

    "Middle of Linked List": {
        input: `5
1 2 3 4 5`,
        output: `3`
    },

    "Detect Cycle": {
        input: `4
1 2 3 4
2`,
        output: `true`
    },

    "Longest Substring Without Repeating": {
        input: `abcabcbb`,
        output: `3`
    },

    "Maximum Sum Subarray": {
        input: `5
-2 1 -3 4 -1`,
        output: `4`
    },

    "Best Time to Buy and Sell Stock": {
        input: `6
7 1 5 3 6 4`,
        output: `5`
    },

    "Activity Selection": {
        input: `4
1 3
2 4
3 5
0 6`,
        output: `2`
    },

    "Jump Game": {
        input: `5
2 3 1 1 4`,
        output: `true`
    },

    "Climbing Stairs": {
        input: `5`,
        output: `8`
    },

    "House Robber": {
        input: `4
2 7 9 3`,
        output: `11`
    },

    "Coin Change": {
        input: `3
1 2 5
11`,
        output: `3`
    },

    "Longest Increasing Subsequence": {
        input: `8
10 9 2 5 3 7 101 18`,
        output: `4`
    },

    "Maximum Depth of Binary Tree": {
        input: `7
1 2 3 4 5 6 7`,
        output: `3`
    },

    "Level Order Traversal": {
        input: `7
1 2 3 4 5 6 7`,
        output: `1 2 3 4 5 6 7`
    },

    "Validate Binary Search Tree": {
        input: `3
2 1 3`,
        output: `true`
    },

    "BFS Traversal": {
        input: `5 4
0 1
0 2
1 3
2 4`,
        output: `0 1 2 3 4`
    },

    "DFS Traversal": {
        input: `5 4
0 1
0 2
1 3
2 4`,
        output: `0 1 3 2 4`
    },

    "Number of Islands": {
        input: `4 5
1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1`,
        output: `3`
    },

    "Detect Cycle in Graph": {
        input: `3 3
0 1
1 2
2 0`,
        output: `true`
    },

    "Kth Largest Element": {
        input: `6
3 2 1 5 6 4
2`,
        output: `5`
    },

    "Top K Frequent Elements": {
        input: `6 2
1 1 1 2 2 3`,
        output: `1 2`
    },

    "Generate Permutations": {
        input: `3
1 2 3`,
        output: `[1 2 3] [1 3 2] [2 1 3] [2 3 1] [3 1 2] [3 2 1]`
    },

    "Generate Subsets": {
        input: `3
1 2 3`,
        output: `[] [1] [2] [1 2] [3] [1 3] [2 3] [1 2 3]`
    },

    "Trapping Rain Water": {
        input: `6
0 1 0 2 1 0`,
        output: `1`
    },

    "Merge K Sorted Arrays": {
        input: `3
3
1 4 7
3
2 5 8
3
3 6 9`,
        output: `1 2 3 4 5 6 7 8 9`
    }

};


// =====================================================
// ADD INPUT / OUTPUT TO QUESTIONS
// =====================================================

const finalQuestions = questions.map((question) => {

    const example = examples[question.title];

    return {
        ...question,
        input: example?.input || "",
        output: example?.output || ""
    };

});


// =====================================================
// SEED / UPDATE QUESTIONS
// =====================================================

async function seedQuestions() {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log("MongoDB connected");

        for (const question of finalQuestions) {

            await CodingQuestion.updateOne(
                {
                    title: question.title
                },
                {
                    $set: {
                        description: question.description,
                        difficulty: question.difficulty,
                        category: question.category,
                        starterCode: question.starterCode,
                        input: question.input,
                        output: question.output
                    },

                    $setOnInsert: {
                        title: question.title
                    }
                },
                {
                    upsert: true
                }
            );

            console.log(
                `Updated: ${question.title}`
            );
        }

        console.log("\n-------------------------");
        console.log(
            `Processed questions: ${finalQuestions.length}`
        );
        console.log("-------------------------");

        process.exit(0);

    } catch (error) {

        console.log("Seed Error:", error);

        process.exit(1);
    }
}


seedQuestions();