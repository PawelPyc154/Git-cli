import { GitExtension } from '../../types/git'
import * as vscode from 'vscode'

export const getGitExtension = () => {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git')
  const gitExtension = vscodeGit && vscodeGit.exports
  return gitExtension && gitExtension.getAPI(1)
}
