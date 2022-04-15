import * as vscode from 'vscode'
import { getGitExtension } from './getGitExtension'

export const getRepositorie = async () => {
  const gitExtension = getGitExtension()
  if (!gitExtension) {
    await vscode.window.showErrorMessage('Unable to load Git Extension')
    return
  }

  if (!gitExtension.repositories.length) {
    await vscode.window.showErrorMessage('No repositories')
    return
  }
  if (gitExtension.repositories.length > 1) {
    const repositorie = await vscode.window
      .showQuickPick(
        gitExtension.repositories.map((repositorie) => ({
          label: repositorie.rootUri.path,
          repositorie: repositorie,
        })),
        {
          title: 'Repositorie',
          placeHolder: 'Please select a value of branch-type',
          ignoreFocusOut: true,
        },
      )
      .then((item) => (item ? item.repositorie : undefined))
    return repositorie
  } else {
    return gitExtension.repositories[0]
  }
}
