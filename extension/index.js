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


// Find the ClickUp issue number from the given input.
function findClickUpIssue(input) {
  // const regex = /[a-zA-Z]*(\s)*-(\s)*\d+\/;
  // const regex = /\/([a-zA-Z]+(\s)*-(\s)*\d+)\/+/g;
  const regex = /([a-zA-Z0-9]+(\s)*-(\s)*\d+)+/g;

  const matches = input.match(regex);

  return matches ? String(matches).replace(/(\s)/g, "").toUpperCase() : null;
}

// Creates a button that links to the given link.
function createActionButton(link, title, color, disabled) {
  const a = document.createElement("a");
  a.className = "btn btn-sm";
  a.style = `background-color:${color};color:#FFFFFF;margin: 0;`;
  a.textContent = title;
  if (disabled) {
    a.style.opacity = 0.4;
    a.style.cursor = "not-allowed";
    a.href = '#';
  } else {
    a.href = link;
    a.target = "_blank";
  }

  return a;
}

// Creates a button that links to the ClickUp issue.
function createClickUpActionButton(issue, disabled = false) {
  return createActionButton(
    `https://app.clickup.com/t/20696747/${issue}`,
    "ClickUp",
    "#7b68ee",
    disabled
  );
}

// Adds the button to the actions container when the page loads.
function main() {
  const container = findActionsContainer();
  const title = findPullRequestTitle();
  const branch = findPullRequestBranchName();
  const clickup_issue = findClickUpIssue(title) || findClickUpIssue(branch);
  const disabled = clickup_issue === null;
  const cu_btn = createClickUpActionButton(clickup_issue, disabled);

  container.appendChild(cu_btn);
}

main();
