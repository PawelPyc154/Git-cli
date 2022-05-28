import * as vscode from 'vscode'
import { getConfiguration } from '../configuration'

export const getTaskId = async (options?: { defaultTaskId?: string }) => {
  const { taskIdRegexValidation } = getConfiguration()
  return await vscode.window.showInputBox({
    title: 'Task Id',
    placeHolder: 'Please type a value of task-id',
    ignoreFocusOut: true,
    value: options?.defaultTaskId || '',
    validateInput(value) {
      if (!value.match(new RegExp(taskIdRegexValidation))) {
        return 'Invalid taskId'
      }
      return null
    },
  })
}

