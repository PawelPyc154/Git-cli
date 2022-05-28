import * as vscode from 'vscode'
import { getBranch } from '../utils/branch'
import { getCommitAction, getDescription, getRepositorie, getScope, getTaskId } from '../utils/inputs'
import { getConfiguration } from './../utils/configuration'

export const newCommit = vscode.commands.registerCommand('git-cli.newCommit', async () => {
  const repositorie = await getRepositorie()
  if (!repositorie) {
    return
  }
  const { commitDescriptionFromBranchRegex, commitTaskIdFromBranchRegex } = getConfiguration()

  const scope = await getScope()
  const commitAction = await getCommitAction()
  const branchName = getBranch(repositorie)

  const defaultTaskId = branchName.match(new RegExp(commitTaskIdFromBranchRegex))?.[0] || ''
  const taskId = await getTaskId({ defaultTaskId })

  const defaultDescription = branchName.match(new RegExp(commitDescriptionFromBranchRegex))?.[0].replaceAll('-', ' ').trim() || ''
  const description = await getDescription({ defaultDescription })

  if (!scope || !commitAction || !taskId || !description) {
    return
  }
  const commitMessage = `<change-log:${scope}:${commitAction}> ${description.trim()} #${taskId}`
  await vscode.commands.executeCommand('workbench.view.scm')
  repositorie.inputBox.value = commitMessage
})

