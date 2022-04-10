import * as vscode from 'vscode'
import { getBranch, getCommitAction, getDescription, getRepositorie, getScope, getTaskId } from '../utils'

export const newCommit = vscode.commands.registerCommand('git-cli.newCommit', async () => {
  const repositorie = await getRepositorie()
  if (!repositorie) {
    return
  }
  const scope = await getScope()
  const commitAction = await getCommitAction()
  const branchName = getBranch(repositorie)
  const defaultTaskId = branchName.match(/(\d){4}/)?.[0] || ''
  const taskId = await getTaskId({ defaultTaskId })
  const description = await getDescription()

  if (!scope || !commitAction || !taskId || !description) {
    return
  }
  const commitMessage = `<change-log:${scope}:${commitAction}> ${description.trim()} #${taskId}`
  await vscode.commands.executeCommand('workbench.view.scm')
  repositorie.inputBox.value = commitMessage
})
