import * as vscode from 'vscode'

import { newBranch } from './newBranch'
import { newCommit } from './newCommit'
import { getGitExtension } from './getGitExtension'
import { getRepositorie } from './getRepositorie'

export function activate(context: vscode.ExtensionContext) {
  // context.subscriptions.push(
  //   vscode.commands.registerCommand('git-cli.testGit', async () => {
  //     await getRepositorie()
  //     console.log(await getRepositorie())
  //     // vscode.commands.executeCommand('workbench.view.scm')
  //     // repos?.forEach((repo) => repo.createBranch('test123', true))
  //   }),
  // )

  context.subscriptions.push(newBranch)
  context.subscriptions.push(newCommit)
}

export function deactivate() {}

