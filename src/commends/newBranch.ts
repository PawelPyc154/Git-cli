import * as vscode from 'vscode'
import { getBranchType, getDescription, getRepositorie, getScope, getTaskId } from '../utils'
import { getConfirmedBranchName } from './../utils'

export const newBranch = vscode.commands.registerCommand('git-cli.newBranch', async () => {
  const scope = await getScope()
  const type = await getBranchType()
  const taskId = await getTaskId()
  const description = await getDescription()
  const repositorie = await getRepositorie()
  if (!scope || !type || !taskId || !description || !repositorie) {
    return
  }
  const branchName = `${scope}/${type}/${taskId}-${description.trim().replaceAll(' ', '-')}`
  const confirmedBranchName = await getConfirmedBranchName({ branchName })

  if (!confirmedBranchName) {
    return
  }
  repositorie.createBranch(confirmedBranchName, true)
})
