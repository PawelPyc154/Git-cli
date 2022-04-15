import * as vscode from 'vscode'

export const getConfirmedBranchName = async (options: { branchName: string }) =>
  await vscode.window.showInputBox({
    placeHolder: 'Please confirm branch name',
    ignoreFocusOut: true,
    title: 'Confirm branch name',
    value: options?.branchName,
  })
