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
