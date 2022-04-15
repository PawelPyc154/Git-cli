import * as vscode from 'vscode'

export const getDescription = async (options?: { defaultDescription?: string }) =>
  await vscode.window.showInputBox({
    title: 'Description',
    placeHolder: 'Please type a value of description',
    ignoreFocusOut: true,
    value: options?.defaultDescription || '',
  })
