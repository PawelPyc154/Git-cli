import { Repository } from "./api/git";

export const getBranch = (repository: Repository) =>
  (repository.state.HEAD && repository.state.HEAD.name) || "";
