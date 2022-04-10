import * as vscode from "vscode";
import { GitExtension } from "./api/git";

export const getGitExtension = () => {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>("vscode.git");
  const gitExtension = vscodeGit && vscodeGit.exports;
  return gitExtension && gitExtension.getAPI(1);
};
