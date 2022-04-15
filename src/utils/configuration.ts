import * as vscode from 'vscode'

interface ConfigurationItem {
  label: string
  details: string
}

interface Configuration {
  scopeOptions: ConfigurationItem[]
  branchTypeOptions: ConfigurationItem[]
  commitActionOptions: ConfigurationItem[]
  taskIdRegexValidation: string
  commitDescriptionFromBranchRegex: string
  commitTaskIdFromBranchRegex: string
}

export const getConfiguration = () => vscode.workspace.getConfiguration('git-cli') as unknown as Configuration
