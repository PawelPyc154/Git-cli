import { Repository } from '../types/git'

export const getBranch = (repository: Repository) => (repository.state.HEAD && repository.state.HEAD.name) || ''
