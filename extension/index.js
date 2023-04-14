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

// Find the pull request branch.
function findPullRequestBranchName() {
  const titleClassName = ".head-ref";
  const title = document.querySelector(titleClassName);

  return title?.attributes["title"].value;
}

// Find the Redmine issue number from the given input.
function findRedmineIssue(input) {
  const regex = /(\d{5})/g;
  const matches = input?.match(regex);

  return matches ? Number(matches[0]) : null;
}

// Find the ClickUp issue number from the given input.
function findClickUpIssue(input) {
  const regex = /\b(?:[a-zA-Z]-)?\d{3}\b/g;
  const matches = input?.match(regex);

  return matches ? Number(matches[0]) : null;
}

// Creates a button that links to the given link.
function createActionButton(link, title, color) {
  const a = document.createElement("a");
  a.href = link;
  a.target = "_blank";

  const button = document.createElement("button");
  button.className = "btn btn-sm";
  button.style = `background-color:${color};color:#FFFFFF;margin: 0;`;
  button.textContent = title;

  a.appendChild(button);

  return a;
}

// Creates a button that links to the Redmine issue.
function createRedmineActionButton(issue) {
  return createActionButton(
    `https://redmine.deriv.cloud/issues/${issue}`,
    "Redmine",
    "#B0110F"
  );
}

// Creates a button that links to the ClickUp issue.
function createClickUpActionButton(issue) {
  return createActionButton(
    `https://app.clickup.com/t/20696747/WALL-${issue}`,
    "ClickUp",
    "#7b68ee"
  );
}

// Adds the button to the actions container when the page loads.
function main() {
  const container = findActionsContainer();

  if (!container) return;

  const title = findPullRequestTitle();
  const branch = findPullRequestBranchName();
  const redmine_issue = findRedmineIssue(title) || findRedmineIssue(branch);
  const clickup_issue = findClickUpIssue(title) || findClickUpIssue(branch);

  // If there is no issue number in the title or branch, return.
  if (!redmine_issue && !clickup_issue) return;

  if (redmine_issue) {
    container.appendChild(createRedmineActionButton(redmine_issue));
  }

  if (clickup_issue) {
    container.appendChild(createClickUpActionButton(clickup_issue));
  }
}

main();
