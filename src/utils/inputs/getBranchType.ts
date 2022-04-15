import * as vscode from 'vscode'
import { getConfiguration } from '../configuration'

export const getBranchType = async () => {
  const { commitActionOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(commitActionOptions, {
      title: 'Branch type',
      placeHolder: 'Please select a value of branch-type',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}
