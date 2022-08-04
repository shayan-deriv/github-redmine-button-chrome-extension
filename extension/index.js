"use strict";

(function () {
  const container = document.querySelector(".gh-header-actions");
  const title = document.querySelector(".js-issue-title");
  const issue = title?.firstChild.nodeValue.split("/")[1];
  const issue_number = issue
    .toLocaleLowerCase()
    .replace("rm", "")
    .replace("#", "")
    .trim();

  // Return if the button container or if the issue number is not found.
  if (!container || isNaN(issue_number)) return;

  const button = `
    <a
      href="https://redmine.deriv.cloud/issues/${issue}"
      title="Open Redmine issue"
      target="_blank"
    >
      <button
        class="btn btn-sm"
        style="background-color:#B0110F;color:#FFFFFF"
      >
        Redmine
      </button>
    </a>
  `;

  container.innerHTML = `${container.innerHTML}${button}`;
})();
