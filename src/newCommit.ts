import * as vscode from 'vscode'
import { getBranch } from './getBranch'
import { getRepositorie } from './getRepositorie'

export const newCommit = vscode.commands.registerCommand('git-cli.newCommit', async () => {
  const repositorie = await getRepositorie()
  if (!repositorie) {
    return
  }
  const scope = await vscode.window
    .showQuickPick([{ label: 'local-app' }, { label: 'common' }, { label: 'components' }], {
      placeHolder: 'Please select a value of package-name',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
  const action = await vscode.window
    .showQuickPick([{ label: 'added' }, { label: 'fixed' }, { label: 'removed' }], {
      placeHolder: 'Please select a value of action',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))
  const description = await vscode.window.showInputBox({
    placeHolder: 'Please type a value of description',
    ignoreFocusOut: true,
  })

  const branchName = getBranch(repositorie)
  const defaultTaskId = branchName.match(/(\d){4}/)?.[0] || ''
  const taskId = await vscode.window.showInputBox({
    placeHolder: 'Please type a value of task-id',
    ignoreFocusOut: true,
    value: defaultTaskId,
    validateInput(value) {
      if (!value.match(/^((\d){4})$/)) {
        return 'Invalid taskId'
      }
      return null
    },
  })

  if (scope && action && taskId && description) {
    const commitMessage = `<change-log:${scope}:${action}> ${description.trim()} #${taskId}`
    await vscode.commands.executeCommand('workbench.view.scm')
    repositorie.inputBox.value = commitMessage
  }
})
