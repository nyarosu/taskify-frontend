export interface Task {
    name: string,
    description: string
    assigned_to: OrganizationUser,
    status: TaskStatus
    priority: TaskPriority
}

export enum TaskStatus {
    InProgress = "In Progress",
    Closed = "Closed",
    Blocked = "Blocked",
    UpForGrabs = "Up for grabs"
}

export enum TaskPriority {
    Urgent = "P0",
    High = "P1",
    Medium = "P2",
    Low = "P3",
    Backlog = "P4",
}