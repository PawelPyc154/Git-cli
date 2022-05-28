import * as vscode from 'vscode'
import { getConfiguration } from '../configuration'

export const getBranchType = async () => {
  const { branchTypeOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(branchTypeOptions, {
      title: 'Branch type',
      placeHolder: 'Please select a value of branch-type',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}

