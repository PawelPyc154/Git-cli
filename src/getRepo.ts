import { getGitExtension } from "./getGitExtension";
import * as vscode from "vscode";

export const getRepo = ({ uri }: { uri: any }) => {
  const git = getGitExtension();

  if (!git) {
    vscode.window.showErrorMessage("Unable to load Git Extension");
    return;
  }

  vscode.commands.executeCommand("workbench.view.scm");

  if (uri) {
    const selectedRepository = git.repositories.find((repository) => {
      return repository.rootUri.path === uri._rootUri.path;
    });

    if (selectedRepository) {
      return selectedRepository;
    }
  } else {
    for (const repo of git.repositories) {
      return repo;
    }
  }
};
