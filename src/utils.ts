import { GitExtension, Repository } from './api/git'
import * as vscode from 'vscode'

export const getBranch = (repository: Repository) => (repository.state.HEAD && repository.state.HEAD.name) || ''

interface ConfigurationItem {
  label: string
  details: string
}
interface Configuration {
  scopeOptions: ConfigurationItem[]
  branchTypeOptions: ConfigurationItem[]
  commitActionOptions: ConfigurationItem[]
}
const getConfiguration = () => vscode.workspace.getConfiguration('git-cli') as unknown as Configuration

export const getGitExtension = () => {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git')
  const gitExtension = vscodeGit && vscodeGit.exports
  return gitExtension && gitExtension.getAPI(1)
}

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

export const getScope = async () => {
  const { scopeOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(scopeOptions, {
      placeHolder: 'Please select a value of package-name',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}

export const getCommitAction = async () => {
  const { commitActionOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(commitActionOptions, {
      placeHolder: 'Please select a value of commin action',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}

export const getDescription = async () =>
  await vscode.window.showInputBox({
    placeHolder: 'Please type a value of description',
    ignoreFocusOut: true,
  })

export const getTaskId = async (options?: { defaultTaskId?: string }) =>
  await vscode.window.showInputBox({
    placeHolder: 'Please type a value of task-id',
    ignoreFocusOut: true,
    value: options?.defaultTaskId || '',
    validateInput(value) {
      if (!value.match(/^((\d){4})$/)) {
        return 'Invalid taskId'
      }
      return null
    },
  })

export const getBranchType = async () => {
  const { commitActionOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(commitActionOptions, {
      placeHolder: 'Please select a value of branch-type',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}

export const getConfirmedBranchName = async (options: { branchName: string }) =>
  await vscode.window.showInputBox({
    placeHolder: 'Please confirm branch name',
    ignoreFocusOut: true,
    value: options?.branchName,
  })
