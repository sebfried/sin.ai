# GitHub Build Action Workflow Trigger

This repository also serves as a live online *content management system*! Added or edited markdown files in the **markdown** directory will be used as content for the website.

## How to Trigger a Website (Re)build

To start a rebuild of the website, simply **edit this file**. For example, you can add a trigger log date.

Rebuilds could, of course, also be triggered by changes to the markdown files in the markdown directory. The reason for this extra step is to avoid unnecessary builds, such as those from pushes where the site was already built locally, thereby saving energy and resources.

## Trigger Log Dates

* 20231127