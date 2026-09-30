require("dotenv").config();

const mongoose = require("mongoose");
const CodingQuestion = require("./models/CodingQuestion");

const MONGO_URI = process.env.MONGO_URI;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(n, min = -50, max = 50) {
    const a = [];

    for (let i = 0; i < n; i++) {
        a.push(random(min, max));
    }

    return a;
}

function addTest(tests, input, output) {
    input = String(input).trim();
    output = String(output).trim();

    if (!output) return;

    tests.push({
        input,
        expectedOutput: output
    });
}

/* =========================
   BASIC FUNCTIONS
========================= */

function maxElement(a) {
    return Math.max(...a);
}

function minElement(a) {
    return Math.min(...a);
}

function reverseArray(a) {
    return [...a].reverse().join(" ");
}

function moveZeroes(a) {
    const b = a.filter(x => x !== 0);

    while (b.length < a.length) {
        b.push(0);
    }

    return b.join(" ");
}

function secondLargest(a) {
    const b = [...new Set(a)].sort((x, y) => y - x);

    return b.length > 1 ? b[1] : b[0];
}

function removeDuplicates(a) {
    return [...new Set(a)].join(" ");
}

function kadane(a) {
    let current = a[0];
    let best = a[0];

    for (let i = 1; i < a.length; i++) {
        current = Math.max(a[i], current + a[i]);
        best = Math.max(best, current);
    }

    return best;
}

function countVowels(s) {
    let count = 0;

    for (const ch of s.toLowerCase()) {
        if ("aeiou".includes(ch)) {
            count++;
        }
    }

    return count;
}

function palindrome(s) {
    return s === [...s].reverse().join("")
        ? "true"
        : "false";
}

function duplicate(a) {
    return new Set(a).size < a.length
        ? "true"
        : "false";
}

function majority(a) {
    const map = new Map();

    for (const x of a) {
        map.set(x, (map.get(x) || 0) + 1);
    }

    let answer = a[0];
    let count = 0;

    for (const [x, c] of map) {
        if (c > count) {
            answer = x;
            count = c;
        }
    }

    return answer;
}

function binarySearch(a, target) {
    let left = 0;
    let right = a.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (a[mid] === target) {
            return mid;
        }

        if (a[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

function validParentheses(s) {
    const stack = [];

    const pair = {
        ")": "(",
        "]": "[",
        "}": "{"
    };

    for (const ch of s) {
        if ("([{".includes(ch)) {
            stack.push(ch);
        } else {
            if (stack.pop() !== pair[ch]) {
                return "false";
            }
        }
    }

    return stack.length === 0
        ? "true"
        : "false";
}

function stock(a) {
    let min = a[0];
    let profit = 0;

    for (const x of a) {
        min = Math.min(min, x);
        profit = Math.max(profit, x - min);
    }

    return profit;
}

function stairs(n) {
    if (n <= 1) return 1;

    let a = 1;
    let b = 1;

    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }

    return b;
}

function robber(a) {
    let prev2 = 0;
    let prev1 = 0;

    for (const x of a) {
        const current = Math.max(
            prev1,
            prev2 + x
        );

        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

function longestSubstring(s) {
    const set = new Set();

    let left = 0;
    let answer = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }

        set.add(s[right]);

        answer = Math.max(
            answer,
            right - left + 1
        );
    }

    return answer;
}

function anagram(a, b) {
    return a.split("").sort().join("") ===
        b.split("").sort().join("")
        ? "true"
        : "false";
}

function firstNonRepeating(s) {
    const map = new Map();

    for (const ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }

    for (const ch of s) {
        if (map.get(ch) === 1) {
            return ch;
        }
    }

    return "-1";
}

function prefix(words) {
    if (!words.length) return "";

    let p = words[0];

    for (const word of words) {
        while (!word.startsWith(p)) {
            p = p.slice(0, -1);

            if (!p) return "";
        }
    }

    return p;
}

function nextGreater(a) {
    const answer = Array(a.length).fill(-1);
    const stack = [];

    for (let i = a.length - 1; i >= 0; i--) {
        while (
            stack.length &&
            stack[stack.length - 1] <= a[i]
        ) {
            stack.pop();
        }

        if (stack.length) {
            answer[i] = stack[stack.length - 1];
        }

        stack.push(a[i]);
    }

    return answer.join(" ");
}

function productExceptSelf(a) {
    const answer = Array(a.length).fill(1);

    let left = 1;

    for (let i = 0; i < a.length; i++) {
        answer[i] = left;
        left *= a[i];
    }

    let right = 1;

    for (let i = a.length - 1; i >= 0; i--) {
        answer[i] *= right;
        right *= a[i];
    }

    return answer.join(" ");
}

function container(a) {
    let left = 0;
    let right = a.length - 1;
    let best = 0;

    while (left < right) {
        best = Math.max(
            best,
            Math.min(a[left], a[right]) *
            (right - left)
        );

        if (a[left] < a[right]) {
            left++;
        } else {
            right--;
        }
    }

    return best;
}

function trap(a) {
    let water = 0;

    for (let i = 1; i < a.length - 1; i++) {
        const left = Math.max(...a.slice(0, i));
        const right = Math.max(...a.slice(i + 1));

        water += Math.max(
            0,
            Math.min(left, right) - a[i]
        );
    }

    return water;
}

function twoSum(a, target) {
    const map = new Map();

    for (let i = 0; i < a.length; i++) {
        const need = target - a[i];

        if (map.has(need)) {
            return `${map.get(need)} ${i}`;
        }

        map.set(a[i], i);
    }

    return "-1 -1";
}

function twoSumSorted(a, target) {
    let left = 0;
    let right = a.length - 1;

    while (left < right) {
        const sum = a[left] + a[right];

        if (sum === target) {
            return `${left} ${right}`;
        }

        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return "-1 -1";
}

function kthLargest(a, k) {
    return [...a]
        .sort((x, y) => y - x)[k - 1];
}

function lis(a) {
    const dp = Array(a.length).fill(1);

    let answer = 1;

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                dp[i] = Math.max(
                    dp[i],
                    dp[j] + 1
                );
            }
        }

        answer = Math.max(answer, dp[i]);
    }

    return answer;
}

/* =========================
   GENERIC ARRAY TESTS
========================= */

function arrayTests(fn, count = 1000) {
    const tests = [];

    while (tests.length < count) {
        const n = random(1, 30);
        const a = randomArray(n);

        addTest(
            tests,
            `${n}\n${a.join(" ")}`,
            fn(a)
        );
    }

    return tests;
}

function stringTests(fn, count = 1000) {
    const tests = [];

    const chars = "abcdefghijklmnopqrstuvwxyz";

    while (tests.length < count) {
        const n = random(1, 30);

        let s = "";

        for (let i = 0; i < n; i++) {
            s += chars[random(0, 25)];
        }

        addTest(
            tests,
            s,
            fn(s)
        );
    }

    return tests;
}

/* =========================
   SEED
========================= */

async function seed(title, tests) {
    const question =
        await CodingQuestion.findOne({ title });

    if (!question) {
        console.log(`SKIPPED: ${title}`);
        return;
    }

    question.hiddenTestCases = tests;

    await question.save();

    console.log(
        `DONE: ${title} -> ${tests.length} hidden tests`
    );
}

/* =========================
   MAIN
========================= */

async function main() {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    const T = 1000;

    await seed(
        "Count Vowels",
        stringTests(countVowels, T)
    );

    await seed(
        "Palindrome String",
        stringTests(palindrome, T)
    );

    await seed(
        "Maximum Element",
        arrayTests(maxElement, T)
    );

    await seed(
        "Minimum Element",
        arrayTests(minElement, T)
    );

    await seed(
        "Reverse Array",
        arrayTests(reverseArray, T)
    );

    await seed(
        "Move Zeroes",
        arrayTests(moveZeroes, T)
    );

    await seed(
        "Second Largest Element",
        arrayTests(secondLargest, T)
    );

    await seed(
        "Remove Duplicates",
        arrayTests(removeDuplicates, T)
    );

    await seed(
        "Kadane Maximum Subarray",
        arrayTests(kadane, T)
    );

    await seed(
        "Maximum Sum Subarray",
        arrayTests(kadane, T)
    );

    await seed(
        "Contains Duplicate",
        arrayTests(duplicate, T)
    );

    await seed(
        "Majority Element",
        arrayTests(majority, T)
    );

    await seed(
        "Valid Parentheses",
        [
            "()",
            "()[]{}",
            "([])",
            "{[]}",
            "((()))",
            "(]",
            "([)]",
            "{",
            "}"
        ].map(x => ({
            input: x,
            expectedOutput: validParentheses(x)
        }))
    );

    await seed(
        "Best Time to Buy and Sell Stock",
        arrayTests(
            a => stock(a.map(x => Math.abs(x))),
            T
        )
    );

    await seed(
        "Climbing Stairs",
        Array.from(
            { length: 45 },
            (_, i) => ({
                input: String(i + 1),
                expectedOutput: String(
                    stairs(i + 1)
                )
            })
        )
    );

    await seed(
        "House Robber",
        arrayTests(
            a => robber(a.map(x => Math.abs(x))),
            T
        )
    );

    await seed(
        "Longest Substring Without Repeating",
        stringTests(longestSubstring, T)
    );

    await seed(
        "Valid Anagram",
        Array.from(
            { length: T },
            () => {
                const a = "abcde";

                return {
                    input: `${a}\nedcba`,
                    expectedOutput: "true"
                };
            }
        )
    );

    await seed(
        "Longest Common Prefix",
        Array.from(
            { length: T },
            () => ({
                input: "3\nflower\nflow\nflight",
                expectedOutput: "fl"
            })
        )
    );

    await seed(
        "First Non Repeating Character",
        stringTests(
            firstNonRepeating,
            T
        )
    );

    await seed(
        "Next Greater Element",
        arrayTests(nextGreater, T)
    );

    await seed(
        "Product Except Self",
        arrayTests(
            productExceptSelf,
            T
        )
    );

    await seed(
        "Container With Most Water",
        arrayTests(
            a => container(
                a.map(x => Math.abs(x))
            ),
            T
        )
    );

    await seed(
        "Trapping Rain Water",
        arrayTests(
            a => trap(
                a.map(x => Math.abs(x))
            ),
            T
        )
    );

    await seed(
        "Jump Game",
        arrayTests(
            a => {
                a = a.map(x => Math.abs(x) % 10);

                let farthest = 0;

                for (let i = 0; i < a.length; i++) {
                    if (i > farthest) {
                        return "false";
                    }

                    farthest =
                        Math.max(
                            farthest,
                            i + a[i]
                        );
                }

                return "true";
            },
            T
        )
    );

    await seed(
        "Coin Change",
        Array.from(
            { length: T },
            () => {
                const coins = [1, 2, 5];
                const amount = random(0, 50);

                const dp = Array(
                    amount + 1
                ).fill(Infinity);

                dp[0] = 0;

                for (let i = 1; i <= amount; i++) {
                    for (const c of coins) {
                        if (c <= i) {
                            dp[i] = Math.min(
                                dp[i],
                                dp[i - c] + 1
                            );
                        }
                    }
                }

                return {
                    input:
                        `${coins.length}\n` +
                        `${coins.join(" ")}\n` +
                        amount,
                    expectedOutput:
                        String(dp[amount])
                };
            }
        )
    );

    await seed(
        "Two Sum",
        Array.from(
            { length: T },
            () => {
                const a = [2, 7, 11, 15];
                const target = 9;

                return {
                    input:
                        `4\n${a.join(" ")}\n${target}`,
                    expectedOutput: "0 1"
                };
            }
        )
    );

    await seed(
        "Binary Search",
        Array.from(
            { length: T },
            () => {
                const a = [
                    10,
                    20,
                    30,
                    40,
                    50
                ];

                return {
                    input:
                        `5\n${a.join(" ")}\n30`,
                    expectedOutput: "2"
                };
            }
        )
    );

    await seed(
        "Top K Frequent Elements",
        Array.from(
            { length: T },
            () => ({
                input:
                    "6 2\n1 1 1 2 2 3",
                expectedOutput: "1 2"
            })
        )
    );

    /* =========================
       REMAINING 20
    ========================= */

    await seed(
        "Reverse String",
        stringTests(
            s => [...s].reverse().join(" "),
            T
        )
    );

    await seed(
        "Frequency of Elements",
        arrayTests(
            a => {
                const map = {};

                for (const x of a) {
                    map[x] =
                        (map[x] || 0) + 1;
                }

                return Object.entries(map)
                    .sort((a, b) =>
                        Number(a[0]) -
                        Number(b[0])
                    )
                    .map(
                        x => `${x[0]} ${x[1]}`
                    )
                    .join(" ");
            },
            T
        )
    );

    await seed(
        "Two Sum Sorted Array",
        Array.from(
            { length: T },
            () => ({
                input:
                    "5\n1 2 3 4 5\n7",
                expectedOutput: "1 4"
            })
        )
    );

    await seed(
        "Reverse Linked List",
        arrayTests(reverseArray, T)
    );

    await seed(
        "Middle of Linked List",
        arrayTests(
            a => a[
                Math.floor(a.length / 2)
            ],
            T
        )
    );

    await seed(
        "Detect Cycle",
        Array.from(
            { length: T },
            () => ({
                input:
                    "5\n1 2 3 4 5\n-1",
                expectedOutput: "false"
            })
        )
    );

    await seed(
        "Activity Selection",
        Array.from(
            { length: T },
            () => ({
                input:
                    "4\n1 2\n3 4\n0 6\n5 7",
                expectedOutput: "3"
            })
        )
    );

    await seed(
        "Longest Increasing Subsequence",
        arrayTests(lis, T)
    );

    await seed(
        "Maximum Depth of Binary Tree",
        Array.from(
            { length: T },
            () => ({
                input:
                    "7\n1 2 3 4 5 6 7",
                expectedOutput: "3"
            })
        )
    );

    await seed(
        "Level Order Traversal",
        Array.from(
            { length: T },
            () => ({
                input:
                    "7\n1 2 3 4 5 6 7",
                expectedOutput:
                    "1 2 3 4 5 6 7"
            })
        )
    );

    await seed(
        "Validate Binary Search Tree",
        Array.from(
            { length: T },
            () => ({
                input:
                    "7\n4 2 6 1 3 5 7",
                expectedOutput: "true"
            })
        )
    );

    await seed(
        "BFS Traversal",
        Array.from(
            { length: T },
            () => ({
                input:
                    "4 3\n0 1\n1 2\n2 3\n0",
                expectedOutput:
                    "0 1 2 3"
            })
        )
    );

    await seed(
        "DFS Traversal",
        Array.from(
            { length: T },
            () => ({
                input:
                    "4 3\n0 1\n1 2\n2 3\n0",
                expectedOutput:
                    "0 1 2 3"
            })
        )
    );

    await seed(
        "Number of Islands",
        Array.from(
            { length: T },
            () => ({
                input:
                    "3 3\n1 1 0\n0 1 0\n0 0 1",
                expectedOutput: "2"
            })
        )
    );

    await seed(
        "Detect Cycle in Graph",
        Array.from(
            { length: T },
            () => ({
                input:
                    "3 3\n0 1\n1 2\n2 0",
                expectedOutput: "true"
            })
        )
    );

    await seed(
        "Kth Largest Element",
        Array.from(
            { length: T },
            () => ({
                input:
                    "6\n3 2 1 5 6 4\n2",
                expectedOutput: "5"
            })
        )
    );

    await seed(
        "Generate Permutations",
        Array.from(
            { length: 50 },
            () => ({
                input: "3\n1 2 3",
                expectedOutput:
                    "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1"
            })
        )
    );

    await seed(
        "Generate Subsets",
        Array.from(
            { length: 50 },
            () => ({
                input: "3\n1 2 3",
                expectedOutput:
                    "\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3"
            })
        )
    );

    await seed(
        "Merge K Sorted Arrays",
        Array.from(
            { length: T },
            () => ({
                input:
                    "3\n3 1 4 7\n3 2 5 8\n3 3 6 9",
                expectedOutput:
                    "1 2 3 4 5 6 7 8 9"
            })
        )
    );

    console.log("");
    console.log("==============================");
    console.log("52 QUESTION SEEDING COMPLETED");
    console.log("==============================");

    await mongoose.disconnect();
}

main().catch(error => {
    console.error("SEED ERROR:", error);
    process.exit(1);
});