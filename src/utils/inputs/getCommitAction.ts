import * as vscode from 'vscode'
import { getConfiguration } from '../configuration'

export const getCommitAction = async () => {
  const { commitActionOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(commitActionOptions, {
      title: 'Action',
      placeHolder: 'Please select a value of commin action',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}
