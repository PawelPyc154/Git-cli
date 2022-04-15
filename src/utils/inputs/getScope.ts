import * as vscode from 'vscode'
import { getConfiguration } from '../configuration'

export const getScope = async () => {
  const { scopeOptions } = getConfiguration()
  return await vscode.window
    .showQuickPick(scopeOptions, {
      title: 'Scope',
      placeHolder: 'Please select a value of package-name',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
}
