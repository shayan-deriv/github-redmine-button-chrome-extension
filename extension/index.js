"use strict";

// Find the actions container.
function findActionsContainer() {
  const containerClassName = ".gh-header-actions";

  return document.querySelector(containerClassName);
}

// Find the pull request title.
function findPullRequestTitle() {
  const titleClassName = ".js-issue-title";
  const title = document.querySelector(titleClassName);

  return title?.firstChild.nodeValue;
}

// Find the issue number from the pull request title.
function findIssueNumber(input) {
  const five_digit_number_regex = /(\d{5})/g;
  const numbers = input?.match(five_digit_number_regex);

  return numbers ? Number(numbers[0]) : null;
}

// Creates a button that links to the issue.
function createActionButton(issue) {
  const a = document.createElement("a");
  a.href = `https://redmine.deriv.cloud/issues/${issue}`;
  a.title = "Open Redmine Issue";
  a.target = "_blank";

  const button = document.createElement("button");
  button.className = "btn btn-sm";
  button.style = "background-color:#B0110F;color:#FFFFFF";
  button.textContent = "Redmine";

  a.appendChild(button);

  return a;
}

// Adds the button to the actions container when the page loads.
function main() {
  const container = findActionsContainer();

  if (!container) return;

  const issue = findIssueNumber(findPullRequestTitle());

  if (!issue) return;

  const button = createActionButton(issue);

  container.appendChild(button);
}

main();
