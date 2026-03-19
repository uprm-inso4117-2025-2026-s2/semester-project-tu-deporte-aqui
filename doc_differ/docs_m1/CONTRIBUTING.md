# Documentation Contribution Instructions

This documentation is a single final semester deliverable. Even though we work in separate sections and sub-sections, everything is compiled into one final document automatically.

From now on, ALL documentation work must follow this process.

Every documentation task must start with a new GitHub Issue. The issue must clearly state which subsection it covers (for example: 1.2.1 Current Situation). Inside the issue description you must include the line:

Parent Issue: #53

All documentation issues must reference #53 so that all work remains grouped under the master documentation issue.

You are not allowed to push directly to the `documentation` branch. All changes must go through a Pull Request.

To work on a subsection, first update your local branch:

git checkout documentation  
git pull  

Then create a feature branch using this naming format:

docs/<section-number>-short-description  

Example:

git checkout -b docs/1.2.1-current-situation  

Next, edit ONLY your assigned subsection file. For example, if you are assigned 1.2.1 Current Situation, edit:

docs/01-informative/01-02-current-situation-needs-ideas/01-02-01-current-situation.adoc  

Do not modify `docs/index.adoc` and do not edit other sections unless assigned.

After writing your content, commit your changes:

git add <your-file>  
git commit -m "Docs 1.2.1 — Current Situation"  

Push your branch:

git push -u origin docs/1.2.1-current-situation  

Then open a Pull Request into the `documentation` branch.

The PR title must follow this format:

Docs 1.2.1 — Current Situation  

The PR description must include:

Closes #<issue-number>  
Parent Issue: #53  

At least one approval is required before merging, and the documentation build must pass.

Once merged, your content will automatically appear in the generated HTML and PDF, since all subsection files are already wired into `docs/index.adoc`.

Do not commit generated files (.html, .pdf, _build/). Do not bypass the PR process. All documentation work must go through Issues and Pull Requests.
