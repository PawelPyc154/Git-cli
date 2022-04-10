import * as vscode from 'vscode'
import { getBranch } from './getBranch'
import { getRepositorie } from './getRepositorie'
// import { getRepo } from './getRepo'

export const newBranch = vscode.commands.registerCommand('git-cli.newBranch', async (uri) => {
  const scope = await vscode.window
    .showQuickPick([{ label: 'local-app' }, { label: 'common' }, { label: 'components' }], {
      placeHolder: 'Please select a value of package-name',
      ignoreFocusOut: true,
    })
    .then((item) => (item ? item.label : undefined))

  const type = await vscode.window
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
  const taskId = await vscode.window.showInputBox({
    placeHolder: 'Please type a value of task-id',
    ignoreFocusOut: true,
    validateInput(value) {
      if (!value.match(/^((\d){4})$/)) {
        return 'Invalid taskId!!!'
      }
      return null
    },
  })
  const description = await vscode.window.showInputBox({
    placeHolder: 'Please type a value of description',
    ignoreFocusOut: true,
  })

  if (scope && type && taskId && description) {
    const branchName = `${scope}/${type}/${taskId}-${description.trim().replaceAll(' ', '-')}`
    const confirmedBranchName = await vscode.window.showInputBox({
      placeHolder: 'Confirm branch name!!!',
      ignoreFocusOut: true,
      value: branchName,
    })
    if (!confirmedBranchName) {
      return
    }
    const repositorie = await getRepositorie()
    repositorie?.createBranch(confirmedBranchName, true)
  }
})
