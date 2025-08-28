১. getElementById, getElementsByClassName, এবং querySelector / querySelectorAll এর পার্থক্য
 getElementById → একটি নির্দিষ্ট id দিয়ে কেবলমাত্র একটিমাত্র element বেছে নেয়।
getElementsByClassName → একটি নির্দিষ্ট class নামের সবগুলো element একসাথে বেছে নেয়।
querySelector → CSS selector ব্যবহার করে প্রথম যে element মেলে সেটি বেছে নেয়।
querySelectorAll → CSS selector ব্যবহার করে সবগুলো মিল থাকা element একসাথে বেছে নেয়।

২. DOM-এ নতুন element তৈরি ও বসানোর নিয়ম
প্রথমে নতুন element তৈরি করতে হয়।
তারপর সেটির নাম, class, লেখা বা অন্য attribute ঠিক করতে হয়।
শেষে সেটি parent element এর মধ্যে বসিয়ে দিতে হয়, যেমন body এর ভেতরে বা অন্য কোনো element এর ভেতরে।
৩. Event Bubbling কীভাবে কাজ করে
যখন কোনো element-এ event ঘটে (যেমন ক্লিক করা), তখন সেটা শুধু ওই element এ থেমে থাকে না।
সেটা উপরের parent element এ যায়, তারপর তার parent এর parent এ যায়—এভাবে একেবারে document পর্যন্ত চলে যায়।
মানে event নিচ থেকে শুরু হয়ে উপরের দিকে বুদবুদের মতো ভেসে ওঠে, তাই একে bubbling বলে।
৪. Event Delegation কী ও কেন দরকার
Event Delegation হলো parent element এ একবার event listener বসানো, যাতে ভেতরের ছোট ছোট element-এ আলাদা করে বসাতে না হয়।
এর ফলে অনেক element থাকলেও এক জায়গায় event নিয়ন্ত্রণ করা যায়।
আবার, নতুন element যোগ হলেও parent এর event listener সেগুলোকেও ধরতে পারবে।
তাই এটি memory এবং performance দুই দিক থেকেই উপকারী।
৫. preventDefault() এবং stopPropagation() এর পার্থক্য
preventDefault() → কোনো element এর স্বাভাবিক কাজ বন্ধ করে দেয়। যেমন, link ক্লিক করলে সাধারণত নতুন পেজ খোলে, কিন্তু preventDefault ব্যবহার করলে সেই কাজটি বন্ধ হয়ে যাবে।
stopPropagation() → Event যাতে parent element এ না যায় সেটি বন্ধ করে দেয়। অর্থাৎ event কেবল যেই element এ ঘটেছে সেখানেই থেমে যাবে।
