import { getGitExtension } from './getGitExtension'
import * as vscode from 'vscode'

export const getRepositorie = async () => {
  const git = getGitExtension()
  if (!git) {
    await vscode.window.showErrorMessage('Unable to load Git Extension')
    return
  }

  if (!git.repositories.length) {
    await vscode.window.showErrorMessage('No repositories')
    return
  }
  if (git.repositories.length > 1) {
    const repositorie = await vscode.window
      .showQuickPick(
        git.repositories.map((repositorie) => ({
          label: repositorie.rootUri.path,
          repositorie: repositorie,
        })),
        {
          placeHolder: 'Please select a value of branch-type',
          ignoreFocusOut: true,
        },
      )
      .then((item) => (item ? item.repositorie : undefined))
    return repositorie
  } else {
    return git.repositories[0]
  }
}
