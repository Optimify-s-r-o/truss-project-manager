import { Data, Tree, TreeType } from '../../../types/_types';

export const getTreeType = (
  customerTree: Data<Tree>,
  projectTree: Data<Tree>,
  jobTree: Data<Tree>
): TreeType => {
  return customerTree
    ? TreeType.CUSTOMER
    : projectTree
    ? TreeType.PROJECT
    : jobTree
    ? TreeType.JOB
    : null;
};

export const getStep = (from: number, to: number): number => {
  const count = from + to;
  if (count < 10) {
    return 0.01;
  } else if (count < 40) {
    return 0.01;
  } else if (count < 100) {
    return 0.1;
  } else if (count > 100) {
    return 1;
  }
};
