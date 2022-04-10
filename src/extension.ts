import * as vscode from 'vscode'
import { newBranch, newCommit } from './commends'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(newBranch)
  context.subscriptions.push(newCommit)
}

export function deactivate() {}

