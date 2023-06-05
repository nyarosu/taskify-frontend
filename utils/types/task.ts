export interface Task {
  id: number;
  name: string;
  relative_priority: number;
  task_type: TaskType;
  description: string | null;
  assigned_to: OrganizationUser;
  project_id: number;
  status: TaskStatus;
  priority: TaskPriority;
}

export enum TaskType {
  Feature = "Feature",
  Bug = "Bug",
}

export enum TaskStatus {
  InProgress = "In Progress",
  Closed = "Closed",
  Blocked = "Blocked",
  UpForGrabs = "Up for grabs",
}

export enum TaskPriority {
  Critical = "P0",
  High = "P1",
  Medium = "P2",
  Low = "P3",
  Backlog = "P4",
}

export const getColorSchemeForType = (type: TaskType) => {
  switch (type) {
    case TaskType.Feature:
      return "green";
    case TaskType.Bug:
      return "red";
  }
};

export const getColorSchemeForStatus = (type: TaskStatus) => {
  switch (type) {
    case TaskStatus.InProgress:
      return "green";
    case TaskStatus.Blocked:
      return "red";
    case TaskStatus.Closed:
      return "gray";
    case TaskStatus.UpForGrabs:
      return "gray";
  }
};

export const getColorSchemeForPriority = (type: TaskPriority) => {
  switch (type) {
    case TaskPriority.Critical:
      return "red";
    case TaskPriority.High:
      return "red";
    case TaskPriority.Medium:
      return "orange";
    case TaskPriority.Low:
      return "green";
    case TaskPriority.Backlog:
      return "gray";
  }
};

export const getTextForPriorityValue = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.Critical:
      return "Critical";
    case TaskPriority.High:
      return "High";
    case TaskPriority.Medium:
      return "Medium";
    case TaskPriority.Low:
      return "Low";
    case TaskPriority.Backlog:
      return "Backlog";
  }
};
