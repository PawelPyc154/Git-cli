import * as vscode from 'vscode'
import { getBranch } from './getBranch'
import { getRepo } from './getRepo'

export function activate(context: vscode.ExtensionContext) {
  const newBranch = vscode.commands.registerCommand('git-cli.newBranch', async (uri) => {
    const repo = getRepo(uri)
    if (!repo) {
      return
    }

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

      const createBranchComment = `git checkout -b "${confirmedBranchName}"`
      vscode.commands.executeCommand('git.branch')
      // const terminal = await vscode.window.createTerminal("createBranch");

      // terminal.show();
      // terminal.sendText(createBranchComment);
    }
  })

  const newCommit = vscode.commands.registerCommand('git-cli.newCommit', async () => {
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
    const taskId = await vscode.window.showInputBox({
      placeHolder: 'Please type a value of task-id',
      ignoreFocusOut: true,
      value: '1234',
      validateInput(value) {
        if (!value.match(/^((\d){4})$/)) {
          return 'Invalid taskId'
        }
        return null
      },
    })

    if (scope && action && taskId && description) {
      const commitMessage = `<change-log:${scope}:${action}> ${description.trim()} #${taskId}`
      const confirm = await vscode.window.showInputBox({
        placeHolder: 'Confirm branch name!!!',
        ignoreFocusOut: true,
        value: commitMessage,
      })
      const createBranchComment = `git commit -m "${commitMessage}"`
    }
  })

  context.subscriptions.push(newBranch)
  context.subscriptions.push(newCommit)
}

export function deactivate() {}

