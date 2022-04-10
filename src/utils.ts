import { GitExtension, Repository } from './api/git'
import * as vscode from 'vscode'

export const getBranch = (repository: Repository) => (repository.state.HEAD && repository.state.HEAD.name) || ''

export const getGitExtension = () => {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git')
  const gitExtension = vscodeGit && vscodeGit.exports
  return gitExtension && gitExtension.getAPI(1)
}

export const getRepositorie = async () => {
  const git123 = getGitExtension()
  if (!git123) {
    await vscode.window.showErrorMessage('Unable to load Git Extension')
    return
  }

  if (!git123.repositories.length) {
    await vscode.window.showErrorMessage('No repositories')
    return
  }
  if (git123.repositories.length > 1) {
    const repositorie = await vscode.window
      .showQuickPick(
        git123.repositories.map((repositorie) => ({
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
    return git123.repositories[0]
  }
}

export const getScope = async () =>
  await vscode.window
    .showQuickPick([{ label: 'local-app' }, { label: 'common' }, { label: 'components' }], {
      placeHolder: 'Please select a value of package-name',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))

export const getCommitAction = async () =>
  await vscode.window
    .showQuickPick([{ label: 'added' }, { label: 'fixed' }, { label: 'removed' }], {
      placeHolder: 'Please select a value of commin action',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))

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

export const getBranchType = async () =>
  await vscode.window
    .showQuickPick(
      [
        { label: 'feature' },
        { label: 'bugfix' },
        { label: 'hotfix' },
        {
          label: 'internal',
          details: 'interan change in monorepo, script, library updates etc.',
        },
      ],
      {
        placeHolder: 'Please select a value of branch-type',
        ignoreFocusOut: true,
      },
    )
    .then((item) => (item ? item.label : undefined))

export const getConfirmedBranchName = async (options: { branchName: string }) =>
  await vscode.window.showInputBox({
    placeHolder: 'Please confirm branch name',
    ignoreFocusOut: true,
    value: options?.branchName,
  })
