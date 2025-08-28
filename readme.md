1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll
getElementById("id")
Selects a single element by its unique id.
Returns one element (or null if not found).
Example:
document.getElementById("myDiv");
getElementsByClassName("class")
Selects all elements with the given class.
Returns an HTMLCollection (live collection).
Example:
document.getElementsByClassName("myClass");
querySelector("selector")
Selects the first element that matches a CSS selector.
Example:
document.querySelector(".myClass"); // first element with class="myClass"
querySelectorAll("selector")
Selects all elements matching a CSS selector.
Returns a NodeList (static).
Example:
document.querySelectorAll("div.myClass"); 
✅ Key difference:
getElementById → single element by ID
getElementsByClassName → multiple by class (live collection)
querySelector → first match by CSS selector
querySelectorAll → all matches by CSS selector (static list)
2. How do you create and insert a new element into the DOM?
Steps:
Create the element using document.createElement()
Set attributes/content (.id, .className, .textContent, etc.)
Insert it into the DOM using methods like appendChild(), prepend(), insertBefore(), append().
Example:
let newDiv = document.createElement("div"); 
newDiv.textContent = "Hello World!";
newDiv.className = "greeting";

// Append to body
document.body.appendChild(newDiv);

// Insert before another element
let ref = document.getElementById("reference");
document.body.insertBefore(newDiv, ref);
3. What is Event Bubbling and how does it work?
Event Bubbling = when an event occurs on an element, it first runs the event handler on that element, then "bubbles up" to its parent, then the parent’s parent, and so on until it reaches document.
Example:
<div id="parent">
  <button id="child">Click Me</button>
</div>
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});
document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});
👉 Clicking the button logs:
Child clicked
Parent clicked
because the event "bubbles up."
4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation = attaching an event listener to a parent element, instead of individual child elements, and using event bubbling to catch events from children.
Useful when:
You have many child elements (better performance, fewer listeners).
Dynamic elements are added/removed.
Example:
document.getElementById("parent").addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON") {
    console.log("Button clicked:", e.target.textContent);
  }
});
👉 Now, any button inside #parent will be handled, even if added later.
5. Difference between preventDefault() and stopPropagation()
preventDefault()
Stops the default behavior of an element.
Example: Prevent a link from navigating:
document.querySelector("a").addEventListener("click", function(e) {
  e.preventDefault(); // stop link navigation
});
stopPropagation()
Stops the event from bubbling up the DOM.
Example: Prevent parent event handler from firing:
document.getElementById("child").addEventListener("click", function(e) {
  e.stopPropagation(); // parent won't be triggered
});
✅ Summary:
preventDefault() → blocks the default browser action.
stopPropagation() → stops the event from moving up to parent elements.